import { addPropertyControls, ControlType } from "framer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

interface Message {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
}

interface ChatProps {
	apiEndpoint?: string;
	placeholder?: string;
	style?: React.CSSProperties;
	// Styling
	styleObject?: {
		backgroundColor?: string;
		textColor?: string;
		userMessageColor?: string;
		assistantMessageColor?: string;
		inputBackground?: string;
		borderRadius?: number;
		padding?: number;
		fontSize?: number;
	};
}

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 400
 * @framerIntrinsicHeight 500
 */
export default function Chat(props: ChatProps) {
	const {
		apiEndpoint = "http://localhost:3000/api/ai-gateway/stream",
		placeholder = "Type your message...",
		style,
		styleObject = {},
	} = props;

	const {
		backgroundColor = "#FFFFFF",
		textColor = "#000000",
		userMessageColor = "#007AFF",
		assistantMessageColor = "#E5E5EA",
		inputBackground = "#F2F2F7",
		borderRadius = 12,
		padding = 16,
		fontSize = 14,
	} = styleObject;

	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const sendMessage = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			role: "user",
			content: input.trim(),
			timestamp: Date.now(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);
		setError(null);

		try {
			// Call AI Gateway streaming API
			const response = await fetch(apiEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: userMessage.content }),
			});

			if (!response.ok) {
				throw new Error("Failed to connect to AI Gateway streaming API");
			}

			const reader = response.body?.getReader();
			if (!reader) {
				throw new Error("No response stream available");
			}

			const decoder = new TextDecoder();
			let fullText = "";

			// Create a placeholder message for the streaming response
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: "",
					timestamp: Date.now(),
				},
			]);

			// The streaming message index is the last message
			const streamingMessageIndex = messages.length + 1;

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				const lines = chunk.split("\n");

				for (const line of lines) {
					if (line.startsWith("data: ")) {
						const data = line.slice(6);
						if (data === "[DONE]") break;

						try {
							const parsed = JSON.parse(data);
							if (parsed.text) {
								fullText += parsed.text;
								// Update the streaming message in real-time
								setMessages((prev) => {
									const updated = [...prev];
									updated[streamingMessageIndex] = {
										role: "assistant",
										content: fullText,
										timestamp: Date.now(),
									};
									return updated;
								});
							}
						} catch (e) {
							// Skip invalid JSON
						}
					}
				}
			}

			// Ensure final message is set
			if (!fullText) {
				throw new Error("No response received from AI Gateway");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			console.error("Chat error:", err);
		} finally {
			setIsLoading(false);
			inputRef.current?.focus();
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const clearChat = () => {
		setMessages([]);
		setError(null);
	};

	return (
		<motion.div
			style={{
				...style,
				width: "100%",
				height: "100%",
				backgroundColor,
				borderRadius,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			{/* Header */}
			<div
				style={{
					padding: padding,
					borderBottom: `1px solid ${assistantMessageColor}`,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div
					style={{
						fontSize: fontSize + 2,
						fontWeight: 600,
						color: textColor,
					}}
				>
					AI Chat
				</div>
				{messages.length > 0 && (
					<button
						onClick={clearChat}
						style={{
							padding: "6px 12px",
							fontSize: fontSize - 2,
							color: userMessageColor,
							backgroundColor: "transparent",
							border: `1px solid ${userMessageColor}`,
							borderRadius: borderRadius / 2,
							cursor: "pointer",
						}}
					>
						Clear
					</button>
				)}
			</div>

			{/* Messages */}
			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: padding,
					display: "flex",
					flexDirection: "column",
					gap: 12,
				}}
			>
				<AnimatePresence initial={false}>
					{messages.map((message, index) => (
						<motion.div
							key={`${message.timestamp}-${index}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							style={{
								display: "flex",
								justifyContent: message.role === "user" ? "flex-end" : "flex-start",
							}}
						>
							<div
								style={{
									maxWidth: "75%",
									padding: "10px 14px",
									borderRadius: borderRadius,
									backgroundColor: message.role === "user" ? userMessageColor : assistantMessageColor,
									color: message.role === "user" ? "#FFFFFF" : textColor,
									fontSize: fontSize,
									lineHeight: 1.4,
									wordWrap: "break-word",
									whiteSpace: "pre-wrap",
								}}
							>
								{message.content}
							</div>
						</motion.div>
					))}
				</AnimatePresence>

				{isLoading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						style={{
							display: "flex",
							justifyContent: "flex-start",
						}}
					>
						<div
							style={{
								padding: "10px 14px",
								borderRadius: borderRadius,
								backgroundColor: assistantMessageColor,
								fontSize: fontSize,
							}}
						>
							<div
								style={{
									display: "flex",
									gap: 4,
									alignItems: "center",
								}}
							>
								<motion.div
									animate={{ opacity: [0.4, 1, 0.4] }}
									transition={{
										duration: 1,
										repeat: Infinity,
										delay: 0,
									}}
									style={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										backgroundColor: textColor,
									}}
								/>
								<motion.div
									animate={{ opacity: [0.4, 1, 0.4] }}
									transition={{
										duration: 1,
										repeat: Infinity,
										delay: 0.2,
									}}
									style={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										backgroundColor: textColor,
									}}
								/>
								<motion.div
									animate={{ opacity: [0.4, 1, 0.4] }}
									transition={{
										duration: 1,
										repeat: Infinity,
										delay: 0.4,
									}}
									style={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										backgroundColor: textColor,
									}}
								/>
							</div>
						</div>
					</motion.div>
				)}

				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						style={{
							padding: "10px 14px",
							borderRadius: borderRadius,
							backgroundColor: "#FF3B30",
							color: "#FFFFFF",
							fontSize: fontSize - 1,
							textAlign: "center",
						}}
					>
						{error}
					</motion.div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<div
				style={{
					padding: padding,
					borderTop: `1px solid ${assistantMessageColor}`,
				}}
			>
				<div
					style={{
						display: "flex",
						gap: 8,
						alignItems: "center",
					}}
				>
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder={placeholder}
						disabled={isLoading}
						style={{
							flex: 1,
							padding: "12px 16px",
							fontSize: fontSize,
							backgroundColor: inputBackground,
							color: textColor,
							border: "none",
							borderRadius: borderRadius,
							outline: "none",
							fontFamily: "inherit",
						}}
					/>
					<button
						onClick={sendMessage}
						disabled={!input.trim() || isLoading}
						style={{
							padding: "12px 20px",
							fontSize: fontSize,
							fontWeight: 600,
							color: "#FFFFFF",
							backgroundColor: input.trim() && !isLoading ? userMessageColor : "#C7C7CC",
							border: "none",
							borderRadius: borderRadius,
							cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
							transition: "background-color 0.2s",
						}}
					>
						Send
					</button>
				</div>
			</div>
		</motion.div>
	);
}

addPropertyControls(Chat, {
	apiEndpoint: {
		type: ControlType.String,
		title: "API Endpoint",
		defaultValue: "http://localhost:3000/api/ai-gateway/stream",
		placeholder: "e.g., http://localhost:3000/api/ai-gateway/stream",
		description: "URL of your AI Gateway streaming endpoint. Copy from your local app or use a deployed URL.",
	},
	placeholder: {
		type: ControlType.String,
		title: "Placeholder",
		defaultValue: "Type your message...",
	},
	styleObject: {
		type: ControlType.Object,
		title: "Styling",
		optional: true,
		controls: {
			backgroundColor: {
				type: ControlType.Color,
				title: "Background",
				defaultValue: "#FFFFFF",
			},
			textColor: {
				type: ControlType.Color,
				title: "Text Color",
				defaultValue: "#000000",
			},
			userMessageColor: {
				type: ControlType.Color,
				title: "User Message",
				defaultValue: "#007AFF",
			},
			assistantMessageColor: {
				type: ControlType.Color,
				title: "Assistant Message",
				defaultValue: "#E5E5EA",
			},
			inputBackground: {
				type: ControlType.Color,
				title: "Input Background",
				defaultValue: "#F2F2F7",
			},
			borderRadius: {
				type: ControlType.Number,
				title: "Border Radius",
				min: 0,
				max: 32,
				defaultValue: 12,
				displayStepper: true,
			},
			padding: {
				type: ControlType.Number,
				title: "Padding",
				min: 8,
				max: 32,
				defaultValue: 16,
				displayStepper: true,
			},
			fontSize: {
				type: ControlType.Number,
				title: "Font Size",
				min: 10,
				max: 24,
				defaultValue: 14,
				displayStepper: true,
				description: "A Chat component that uses AI Gateway streaming API for real-time responses. Configure styling options to match your design.",
			},
		},
	},
});
