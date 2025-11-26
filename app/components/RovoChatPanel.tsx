"use client";

import React, { useState, useRef, useEffect } from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MenuIcon from "@atlaskit/icon/core/menu";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import EditIcon from "@atlaskit/icon/core/edit";
import GridIcon from "@atlaskit/icon/core/grid";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import CrossIcon from "@atlaskit/icon/core/cross";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import { Inline } from "@atlaskit/primitives/compiled";
import WorkItemsWidget from "./WorkItemsWidget";
import SkillSuggestions from "./SkillSuggestions";
import { useRovoChat, Message } from "../contexts/RovoChatContext";
import { useSystemPrompt } from "../contexts/SystemPromptContext";
import { API_ENDPOINTS } from "../lib/api-config";

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);
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

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [prompt]);

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
			{/* Header - Side panel */}
			<div
				style={{
					padding: token("space.150"),
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{/* Left side: Menu icon and Title */}
				<Inline space="space.050" alignBlock="center">
					<IconButton icon={MenuIcon} label="New chat" appearance="subtle" spacing="default" />
					<Inline space="space.100" alignBlock="center">
						<img src="/Rovo.svg" alt="Rovo" style={{ width: 20, height: 20, objectFit: "contain" }} />
						<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
							<span
								style={{
									fontSize: "14px",
									fontWeight: 653,
									color: token("color.text"),
									whiteSpace: "nowrap",
								}}
							>
								Rovo
							</span>
							<ChevronDownIcon label="Expand menu" size="small" />
						</div>
					</Inline>
				</Inline>

				{/* Right side: Chat actions */}
				<Inline space="space.050" alignBlock="center">
					<IconButton icon={EditIcon} label="Edit" appearance="subtle" spacing="default" />
					<IconButton icon={GridIcon} label="Switch view" appearance="subtle" spacing="default" />
					<IconButton icon={ShowMoreHorizontalIcon} label="More" appearance="subtle" spacing="default" />
					<IconButton icon={CrossIcon} label="Close" appearance="subtle" spacing="default" onClick={onClose} />
				</Inline>
			</div>

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
				<div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "calc(32px + 80px)" }}>
					{messages.length === 0 ? (
						<SkillSuggestions
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
						messages.map((message) => (
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
						))
					)}
				</div>
			</div>

			<div style={{ padding: "0 12px" }}>
				<div
					style={{
						backgroundColor: token("elevation.surface"),
						border: `1px solid ${token("color.border")}`,
						borderRadius: "12px",
						padding: "16px 16px 12px",
						boxShadow: "0px -2px 50px 8px rgba(30, 31, 33, 0.08)",
					}}
				>
					<div style={{ position: "relative", width: "100%" }}>
						<textarea
							ref={textareaRef}
							value={prompt}
							onChange={(e) => {
								setPrompt(e.target.value);
								setTimeout(adjustTextareaHeight, 0);
							}}
							onKeyDown={handleKeyDown}
							placeholder="Ask, @mention, or / for actions"
							rows={1}
							style={{
								width: "100%",
								border: "none",
								outline: "none",
								backgroundColor: "transparent",
								resize: "none",
								fontSize: "14px",
								fontFamily: "inherit",
								color: token("color.text"),
								lineHeight: "1.43",
								minHeight: "20px",
								maxHeight: "120px",
								overflowY: "auto",
							}}
						/>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginTop: token("space.150"),
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
							<IconButton icon={MicrophoneIcon} label="Voice" appearance="subtle" spacing="default" shape="circle" isDisabled />
							<IconButton icon={ArrowUpIcon} label="Submit" appearance="primary" spacing="default" shape="circle" isDisabled={!prompt.trim()} onClick={handleSubmit} />
						</div>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: "8px 0",
					}}
				>
					<span style={{ fontSize: "12px", color: token("color.text.subtlest") }}>Uses AI. Verify results.</span>
				</div>
			</div>
		</div>
	);
}
