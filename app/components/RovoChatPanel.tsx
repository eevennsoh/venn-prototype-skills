"use client";

import React, { useState, useRef, useEffect } from "react";

import { token } from "@atlaskit/tokens";
import ChatHeader from "./ChatHeader";
import ChatComposer from "./ChatComposer";
import WorkItemsWidget from "./WorkItemsWidget";
import SkillSuggestions from "./SkillSuggestions";
import { useRovoChat, Message } from "../contexts/RovoChatContext";
import { useSystemPrompt } from "../contexts/SystemPromptContext";
import { API_ENDPOINTS } from "@/lib/api-config";

// Minimal markdown-to-HTML renderer for assistant messages
function renderMarkdownToHtml(text: string): string {
	const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

	let html = escapeHtml(text);

	// Links [text](url)
	html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

	// Inline code `code`
	html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

	// Bold **text**
	html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

	// Italic *text* (simple heuristic, avoids matching **bold**)
	html = html.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");

	// Line breaks
	html = html.replace(/\n/g, "<br/>");

	return html;
}

interface RovoChatPanelProps {
	onClose: () => void;
	apiUrl?: string;
}

function LoadingWidget({ widgetType }: { widgetType?: string }) {
	const [step, setStep] = useState(0);

	const hotelMessages = ["Accessing calendar...", "Confirming travel policy...", "Searching hotels..."];

	useEffect(() => {
		if (widgetType === "hotels") {
			const interval = setInterval(() => {
				setStep((prev) => (prev + 1) % hotelMessages.length);
			}, 1200);
			return () => clearInterval(interval);
		}
	}, [widgetType]);

	const getMessage = () => {
		if (widgetType === "work-items") return "Loading work items...";
		return "Loading widget...";
	};

	return (
		<div
			style={{
				padding: token("space.200"),
				backgroundColor: token("color.background.neutral.subtle"),
				borderRadius: "8px",
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				color: token("color.text.subtlest"),
				fontSize: "14px",
				marginLeft: "12px",
				marginRight: "12px",
			}}
		>
			{getMessage()}
		</div>
	);
}

export default function RovoChatPanel({ onClose, apiUrl }: RovoChatPanelProps) {
	const [prompt, setPrompt] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);
	const { messages, setMessages } = useRovoChat();
	const { customPrompt } = useSystemPrompt();

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const handleSubmit = async () => {
		if (!prompt.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: prompt,
		};

		setMessages((prev) => [...prev, userMessage]);
		const currentPrompt = prompt;
		setPrompt("");

		const assistantMessageId = (Date.now() + 1).toString();
		const assistantMessage: Message = {
			id: assistantMessageId,
			type: "assistant",
			content: "",
		};
		setMessages((prev) => [...prev, assistantMessage]);

		try {
			// Get last 3 messages (excluding the one we just added) for context
			const recentHistory = messages.slice(-6).filter((msg) => msg.id !== userMessage.id);

			const response = await fetch(API_ENDPOINTS.CHAT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: currentPrompt,
					conversationHistory: recentHistory,
					customSystemPrompt: customPrompt,
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
										setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: true, widget: { type, data: null } } : msg)));
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
										prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: beforeWidget, widgetLoading: true, widget: widgetType ? { type: widgetType, data: null } : undefined } : msg))
									);
								} else if (widgetBufferStarted) {
									widgetTextBuffer = "WIDGET_DATA:" + fullText.split("WIDGET_DATA:")[1];

									if (!widgetType) {
										const typeMatch = widgetTextBuffer.match(/"type":"([^"]+)"/);
										if (typeMatch) {
											widgetType = typeMatch[1];
											console.log("Widget type detected:", widgetType);
											setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widget: { type: widgetType!, data: null } } : msg)));
										}
									}
								} else {
									setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: fullText } : msg)));
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
						setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, widgetLoading: false } : msg)));
					}
				} else {
					console.error("Widget match failed. Buffer:", widgetTextBuffer);
				}
			}
		} catch (error) {
			console.error("Error fetching AI response:", error);
			setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: "Sorry, I encountered an error. Please try again." } : msg)));
		}
	};

	return (
		<div
			style={{
				width: "400px",
				height: "100vh",
				maxHeight: "800px",
				backgroundColor: token("elevation.surface"),
				display: "flex",
				flexDirection: "column",
			}}
		>
			<ChatHeader onClose={onClose} />

			<div
				ref={scrollRef}
				style={{
					flex: 1,
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
					minHeight: 0,
					scrollbarGutter: "stable" as any,
				}}
			>
				{messages.length === 0 ? (
					<SkillSuggestions
						searchQuery={prompt}
						onSkillSelect={(skill) => {
							setPrompt(skill);
							// Optionally auto-submit after a short delay
							setTimeout(() => {
								const userMessage: Message = {
									id: Date.now().toString(),
									type: "user",
									content: skill,
								};
								setMessages((prev) => [...prev, userMessage]);
								setPrompt("");
								// You can trigger handleSubmit here or let the user click send
							}, 0);
						}}
					/>
				) : (
					<>
						<div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "calc(32px + 80px)" }}>
							{messages.map((message) => (
								<div
									key={message.id}
									style={{
										display: "flex",
										justifyContent: message.type === "user" ? "flex-end" : "flex-start",
										paddingLeft: message.type === "user" ? "24px" : "0",
									}}
								>
									{message.type === "user" ? (
										<div
											style={{
												backgroundColor: "#1868DB",
												borderRadius: "12px 12px 4px 12px",
												padding: "12px 16px",
												color: token("elevation.surface"),
												fontSize: "14px",
												lineHeight: "1.43",
												maxWidth: "85%",
											}}
										>
											{message.content}
										</div>
									) : (
										<div
											style={{
												width: "100%",
											}}
										>
											<div
												style={{
													fontSize: "14px",
													lineHeight: "1.43",
													color: token("color.text"),
													marginBottom: message.widget || message.widgetLoading ? token("space.100") : "0",
													paddingLeft: "12px",
													paddingRight: "12px",
												}}
												dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(message.content) }}
											/>
											{message.widgetLoading && <LoadingWidget widgetType={message.widget?.type} />}
											{message.widget && !message.widgetLoading && <>{message.widget.type === "work-items" && <WorkItemsWidget data={message.widget.data} />}</>}
										</div>
									)}
								</div>
							))}
						</div>
						{/* Show SkillSuggestions below messages */}
						<div style={{ padding: token("space.200") }}>
							<SkillSuggestions
								searchQuery={prompt}
								onSkillSelect={(skill) => {
									setPrompt(skill);
								}}
							/>
						</div>
					</>
				)}
			</div>

			<ChatComposer prompt={prompt} onPromptChange={setPrompt} onSubmit={handleSubmit} />
		</div>
	);
}
