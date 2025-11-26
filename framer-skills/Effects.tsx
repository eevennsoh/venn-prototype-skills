import { ComponentType } from "react";
import { useSearchStore } from "./Store.jsx";

/**
 * Changes the variant of a layer based on whether the Search input has text.
 * Apply this override to the layer you want to switch variants.
 */
export function changeGreetingsOnInput(Component): ComponentType {
	return (props) => {
		// Subscribe to the same store used by Composer.tsx
		const [store] = useSearchStore();

		// Check if there is any text in the query
		const hasText = store.query.length > 0;

		return (
			<Component
				{...props}
				// Switch variant based on input
				variant={hasText ? "noGreeting" : "defaultGreeting"}
			/>
		);
	};
}

export function changeCircleButtonOnInput(Component): ComponentType {
	return (props) => {
		// Subscribe to the same store used by Composer.tsx
		const [store] = useSearchStore();

		// Check if there is any text in the query OR if there are any tags selected
		const hasText = store.query.length > 0 || (store.tags && store.tags.length > 0);

		return (
			<Component
				{...props}
				// Switch variant based on input
				variant={hasText ? "enabled" : "disabled"}
			/>
		);
	};
}
