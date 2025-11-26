import "./globals.css";
import "@atlaskit/css-reset";
import TokenProvider from "./components/TokenProvider";
import { SystemPromptProvider } from "./contexts/SystemPromptContext";

export const metadata = {
	title: "R—A—D: Skills",
	description: "Skills prototype",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{/* Atlassian DS-CDN Font Integration */}
				<link rel="preconnect" href="https://ds-cdn.prod-east.frontend.public.atl-paas.net" />
				<link rel="preload" href="https://ds-cdn.prod-east.frontend.public.atl-paas.net/assets/fonts/atlassian-sans/v3/AtlassianSans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
				<link rel="preload stylesheet" href="https://ds-cdn.prod-east.frontend.public.atl-paas.net/assets/font-rules/v5/atlassian-fonts.css" as="style" crossOrigin="anonymous" />
			</head>
			<body className="font-sans antialiased">
				<TokenProvider>
					<SystemPromptProvider>{children}</SystemPromptProvider>
				</TokenProvider>
			</body>
		</html>
	);
}
