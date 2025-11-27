import React from "react";
import { API_ENDPOINTS } from "@/lib/api-config";
import type { Message } from "../contexts/RovoChatContext";

interface StreamChatOptions {
	message: string;
	conversationHistory: Message[];
	customSystemPrompt: string;
	assistantMessageId: string;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

/**
 * Custom hook for streaming chat responses from the AI Gateway
 * Handles SSE stream parsing, widget detection, and incremental message updates
 */
export function useChatStream() {
	const streamChatResponse = async ({
		message,
		conversationHistory,
		customSystemPrompt,
		assistantMessageId,
		setMessages,
	}: StreamChatOptions): Promise<void> => {
		try {
			const response = await fetch(API_ENDPOINTS.CHAT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message,
					conversationHistory,
					customSystemPrompt,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (!reader) {
				throw new Error("No reader available");
			}

			let fullText = "";
			let widgetBufferStarted = false;
			let widgetTextBuffer = "";
			let widgetType: string | null = null;

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				const lines = chunk.split("\n");

				for (const line of lines) {
					if (line.startsWith("data: ")) {
						const data = line.slice(6);
						if (data === "[DONE]") {
							break;
						}
						try {
							const parsed = JSON.parse(data);
							if (parsed.text) {
								// Check for loading signal - don't add to fullText
								if (parsed.text.includes("WIDGET_LOADING:")) {
									const loadingMatch = parsed.text.match(/WIDGET_LOADING:(\w+)/);
									if (loadingMatch) {
										const type = loadingMatch[1];
										console.log("Widget loading signal detected:", type);
										setMessages((prev) =>
											prev.map((msg) =>
												msg.id === assistantMessageId
													? { ...msg, widgetLoading: true, widget: { type, data: null } }
													: msg
											)
										);
									}
									continue; // Skip adding to fullText
								}

								fullText += parsed.text;

								if (!widgetBufferStarted && fullText.includes("WIDGET_DATA:")) {
									console.log("Widget data detected in stream");
									widgetBufferStarted = true;
									const beforeWidget = fullText.split("WIDGET_DATA:")[0].trim();
									widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

									const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
									if (typeMatch) {
										widgetType = typeMatch[1];
										console.log("Widget type detected:", widgetType);
									}

									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === assistantMessageId
												? {
														...msg,
														content: beforeWidget,
														widgetLoading: true,
														widget: widgetType ? { type: widgetType, data: null } : undefined,
												  }
												: msg
										)
									);
								} else if (widgetBufferStarted) {
									widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

									if (!widgetType) {
										const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
										if (typeMatch) {
											widgetType = typeMatch[1];
											console.log("Widget type detected:", widgetType);
											setMessages((prev) =>
												prev.map((msg) =>
													msg.id === assistantMessageId ? { ...msg, widget: { type: widgetType!, data: null } } : msg
												)
											);
										}
									}
								} else {
									setMessages((prev) =>
										prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: fullText } : msg))
									);
								}
							}
						} catch (e) {
							// Skip invalid JSON
						}
					}
				}
			}

			console.log("Stream finished. Full text length:", fullText.length);
			console.log("Widget buffer started:", widgetBufferStarted);
			if (widgetBufferStarted) {
				console.log("Widget text buffer:", widgetTextBuffer);
			}

			// Parse widget data if detected
			if (widgetBufferStarted && widgetTextBuffer) {
				console.log("Attempting to parse widget buffer");
				const widgetMatch = widgetTextBuffer.match(/WIDGET_DATA:({[\s\S]*})/);
				console.log("Widget match:", widgetMatch ? "found" : "not found");
				if (widgetMatch) {
					console.log("Matched JSON string:", widgetMatch[1]);
					try {
						const widgetData = JSON.parse(widgetMatch[1]);
						console.log("Parsed widget data:", widgetData);
						const textContent = fullText.replace(/WIDGET_DATA:{[\s\S]*}/, "").trim();

						setMessages((prev) =>
							prev.map((msg) =>
								msg.id === assistantMessageId
									? {
											...msg,
											content: textContent,
											widget: widgetData,
											widgetLoading: false,
									  }
									: msg
							)
						);
					} catch (e) {
						console.error("Failed to parse widget data:", e);
						console.error("Widget text buffer:", widgetTextBuffer);
						setMessages((prev) =>
							prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: false } : msg))
						);
					}
				} else {
					console.error("Widget match failed. Buffer:", widgetTextBuffer);
				}
			}
		} catch (error) {
			console.error("Error fetching AI response:", error);
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === assistantMessageId ? { ...msg, content: "Sorry, I encountered an error. Please try again." } : msg
				)
			);
		}
	};

	return { streamChatResponse };
}

