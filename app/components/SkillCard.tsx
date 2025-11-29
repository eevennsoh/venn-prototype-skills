import React, { useState, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import ClipboardIcon from "@atlaskit/icon/core/clipboard";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import { mockSkillPlan, SkillPlan, SkillStepData } from "../../lib/mockSkillPlan";
import { SkillStep } from "./SkillStep";

export interface SkillCardProps {
	loading?: boolean;
	activeStep?: number;
	isCompleted?: boolean;
	disableSimulation?: boolean;
}

export const SkillCard = ({ loading: propsLoading, activeStep: propsActiveStep, isCompleted: propsIsCompleted, disableSimulation = false }: SkillCardProps = {}) => {
	const [internalLoading, setInternalLoading] = useState(true);
	const [plan, setPlan] = useState<SkillPlan | null>(null);
	const [internalActiveStepIndex, setInternalActiveStepIndex] = useState(0);
	const [internalIsPlanCompleted, setInternalIsPlanCompleted] = useState(false);
	const [dotStep, setDotStep] = useState(0);
	const [isExpanded, setIsExpanded] = useState(true);
	const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

	// Derive state from props or internal state
	const loading = propsLoading !== undefined ? propsLoading : internalLoading;
	const activeStepIndex = propsActiveStep !== undefined ? propsActiveStep : internalActiveStepIndex;
	const isPlanCompleted = propsIsCompleted !== undefined ? propsIsCompleted : internalIsPlanCompleted;

	useEffect(() => {
		if (disableSimulation) {
			setPlan(mockSkillPlan);
			setInternalLoading(false);
			return;
		}

		// Simulate loading
		const timer = setTimeout(() => {
			setPlan(mockSkillPlan);
			setInternalLoading(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, [disableSimulation]);

	useEffect(() => {
		if (loading) {
			const interval = setInterval(() => {
				setDotStep((prev) => (prev + 1) % 4);
			}, 200);
			return () => clearInterval(interval);
		}
	}, [loading]);

	const handleApprove = () => {
		if (!plan) return;

		// Collapse current step
		const currentStepId = plan.steps[activeStepIndex].id;
		setExpandedSteps((prev) => ({ ...prev, [currentStepId]: false }));

		// Mark current step as completed (in a real app, this would update data)
		// For local state, we just move index
		if (activeStepIndex < plan.steps.length - 1) {
			const nextStepId = plan.steps[activeStepIndex + 1].id;
			setExpandedSteps((prev) => ({ ...prev, [nextStepId]: true }));
			setInternalActiveStepIndex((prev) => prev + 1);
		} else {
			// Last step completed - mark as completed and auto-collapse the card
			setInternalIsPlanCompleted(true);
			setIsExpanded(false);
		}
	};

	const handleSkip = () => {
		if (!plan) return;

		// Collapse current step
		const currentStepId = plan.steps[activeStepIndex].id;
		setExpandedSteps((prev) => ({ ...prev, [currentStepId]: false }));

		// Move to next step
		if (activeStepIndex < plan.steps.length - 1) {
			const nextStepId = plan.steps[activeStepIndex + 1].id;
			setExpandedSteps((prev) => ({ ...prev, [nextStepId]: true }));
			setInternalActiveStepIndex((prev) => prev + 1);
		} else {
			// Last step skipped - mark as completed and auto-collapse the card
			setInternalIsPlanCompleted(true);
			setIsExpanded(false);
		}
	};

	return (
		<div
			style={{
				maxWidth: "600px",
				margin: "0 auto",
				display: "flex",
				flexDirection: "column",
				backgroundColor: token("elevation.surface"),
				borderRadius: token("radius.large"),
				boxShadow: token("elevation.shadow.raised"),
				padding: token("space.200"),
				transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
			}}
		>
			{/* Header */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
					marginBottom: !loading && isExpanded ? token("space.150") : "0px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: token("space.150"), height: loading ? "40px" : "auto" }}>
					<div
						style={{
							width: 32,
							height: 32,
							borderRadius: token("radius.medium"),
							backgroundColor: token("color.background.neutral"),
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: token("color.icon"),
							flexShrink: 0,
						}}
					>
						<ClipboardIcon label="Plan" size="medium" />
					</div>
					<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: loading ? "40px" : "auto" }}>
						{/* Title */}
						<div style={{ display: "flex", alignItems: "center", height: "20px" }}>
							{loading ? (
								<>
									<h4
										style={{
											margin: 0,
											fontSize: "16px",
											fontWeight: "bold",
											color: token("color.text"),
											lineHeight: "20px",
										}}
									>
										Plan description
									</h4>
									<div style={{ display: "flex", width: "14px", height: "20px", alignItems: "center" }}>
										<span
											style={{
												color: "#1868DB",
												opacity: dotStep >= 1 ? 1 : 0,
												transition: `opacity var(--ds-duration-200) var(--ds-ease-40-in-out)`,
												fontSize: "16px",
												lineHeight: "20px",
											}}
										>
											.
										</span>
										<span
											style={{
												color: "#BF63F3",
												opacity: dotStep >= 2 ? 1 : 0,
												transition: `opacity var(--ds-duration-200) var(--ds-ease-40-in-out)`,
												fontSize: "16px",
												lineHeight: "20px",
											}}
										>
											.
										</span>
										<span
											style={{
												color: "#FCA700",
												opacity: dotStep >= 3 ? 1 : 0,
												transition: `opacity var(--ds-duration-200) var(--ds-ease-40-in-out)`,
												fontSize: "16px",
												lineHeight: "20px",
											}}
										>
											.
										</span>
									</div>
								</>
							) : (
								<h4
									style={{
										margin: 0,
										fontSize: "16px",
										fontWeight: "bold",
										color: token("color.text"),
										lineHeight: "20px",
									}}
								>
									{plan?.title}
								</h4>
							)}
						</div>

						{/* Subtitle Area - only show when not loading */}
						{!loading && (
							<div
								style={{
									height: "16px",
									display: "flex",
									alignItems: "center",
									marginTop: "2px",
								}}
							>
								<span style={{ color: token("color.text.subtle"), fontSize: "12px" }}>
									<Text as="p">{plan ? Math.round((activeStepIndex / plan.steps.length) * 100) : 0}% completion</Text>
								</span>
							</div>
						)}
					</div>
				</div>
				{!loading && (
					<div
						style={{
							animation: `fadeIn var(--ds-duration-200) var(--ds-ease-40-in-out)`,
							transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
							transition: `transform var(--ds-duration-200) var(--ds-ease-40-in-out)`,
						}}
					>
						<IconButton icon={() => <ChevronUpIcon label="" size="small" />} label={isExpanded ? "Collapse" : "Expand"} appearance="subtle" shape="circle" onClick={() => setIsExpanded(!isExpanded)} />
					</div>
				)}
			</div>

			{/* Body Content (Active Step + Upcoming) - Animated collapse */}
			{!loading && plan && (
				<div
					style={{
						maxHeight: isExpanded ? "800px" : "0px",
						opacity: isExpanded ? 1 : 0,
						overflow: "hidden",
						transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: token("space.150"),
						}}
					>
						{/* Active and Completed Steps */}
						<div style={{ display: "flex", flexDirection: "column" }}>
							{plan.steps.map((step, index) => {
								if (index <= activeStepIndex) {
									const isStepExpanded = expandedSteps[step.id] ?? index === activeStepIndex;
									const isFirst = index === 0;
									const isLast = index === activeStepIndex;
									return (
										<SkillStep
											key={step.id}
											step={step}
											isActive={index === activeStepIndex}
											isCompleted={index < activeStepIndex}
											isExpanded={isStepExpanded}
											isFirst={isFirst}
											isLast={isLast}
											onToggleExpand={() =>
												setExpandedSteps((prev) => ({
													...prev,
													[step.id]: !isStepExpanded,
												}))
											}
											onApprove={handleApprove}
											onSkip={handleSkip}
										/>
									);
								}
								return null;
							})}
						</div>

						{/* Upcoming Steps */}
						{activeStepIndex < plan.steps.length - 1 && (
							<div
								style={{
									padding: token("space.200"),
									backgroundColor: token("color.background.neutral.subtle"),
									borderRadius: token("radius.medium"),
								}}
							>
								<h5 style={{ margin: `0 0 ${token("space.200")} 0`, fontSize: "12px", fontWeight: "bold", color: token("color.text.subtle") }}>Upcoming steps</h5>
								<div style={{ display: "flex", gap: token("space.150") }}>
									{/* Timeline column (dots + lines) */}
									<div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6px" }}>
										{plan.steps.map((step, index) => {
											if (index > activeStepIndex) {
												const isLast = index === plan.steps.length - 1;
												return (
													<React.Fragment key={step.id}>
														{/* Dot */}
														<div
															style={{
																width: "8px",
																height: "8px",
																borderRadius: token("radius.full"),
																backgroundColor: token("color.border"),
																flexShrink: 0,
															}}
														/>
														{/* Line with gaps */}
														{!isLast && (
															<div
																style={{
																	width: "1px",
																	height: token("space.150"),
																	backgroundColor: token("color.border"),
																	marginTop: token("space.050"),
																	marginBottom: token("space.050"),
																}}
															/>
														)}
													</React.Fragment>
												);
											}
											return null;
										})}
									</div>
									
									{/* Labels column */}
									<div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
										{plan.steps.map((step, index) => {
											if (index > activeStepIndex) {
												const isLast = index === plan.steps.length - 1;
												return (
													<div
														key={step.id}
														style={{
															paddingBottom: isLast ? "0px" : token("space.150"),
														}}
													>
														<Text
															as="p"
															style={{
																fontWeight: 500,
																color: token("color.text"),
																fontSize: "14px",
																lineHeight: "20px",
															}}
														>
															{step.title}
														</Text>
													</div>
												);
											}
											return null;
										})}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; transform: translateY(5px); }
					to { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</div>
	);
};
