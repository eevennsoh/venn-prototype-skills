"use client";

import React from "react";
import { SkillCard } from "../components/SkillCard";
import { token } from "@atlaskit/tokens";

export default function SkillCardDemo() {
	return (
		<div
			style={{
				padding: token("space.600"),
				backgroundColor: token("color.background.neutral"),
				minHeight: "100vh",
			}}
		>
			<h1 style={{ marginBottom: token("space.400"), fontSize: "24px", fontWeight: "bold" }}>SkillCard Demo</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: token("space.400") }}>
				{/* Interactive Demo */}
				<div>
					<h2 style={{ marginBottom: token("space.200"), fontSize: "18px", fontWeight: "bold" }}>Interactive Demo</h2>
					<SkillCard />
				</div>

				{/* 1. Loading State */}
				<div>
					<h2 style={{ marginBottom: token("space.200"), fontSize: "18px", fontWeight: "bold" }}>1. Loading State</h2>
					<SkillCard loading={true} disableSimulation={true} />
				</div>

				{/* 2. First Loaded State */}
				<div>
					<h2 style={{ marginBottom: token("space.200"), fontSize: "18px", fontWeight: "bold" }}>2. First Loaded State</h2>
					<SkillCard loading={false} activeStep={0} disableSimulation={true} />
				</div>

				{/* 3. Second Step */}
				<div>
					<h2 style={{ marginBottom: token("space.200"), fontSize: "18px", fontWeight: "bold" }}>3. Second Step</h2>
					<SkillCard loading={false} activeStep={1} disableSimulation={true} />
				</div>

				{/* 4. Third Step */}
				<div>
					<h2 style={{ marginBottom: token("space.200"), fontSize: "18px", fontWeight: "bold" }}>4. Third Step</h2>
					<SkillCard loading={false} activeStep={2} disableSimulation={true} />
				</div>

				{/* 5. Plan Completion */}
				<div>
					<h2 style={{ marginBottom: token("space.200"), fontSize: "18px", fontWeight: "bold" }}>5. Plan Completion</h2>
					<SkillCard isCompleted={true} disableSimulation={true} />
				</div>
			</div>
		</div>
	);
}
