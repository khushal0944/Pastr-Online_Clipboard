import { RefObject } from "react";

export function transformText(
	normalText: RefObject<string>,
	option: string,
	content: string,
	setContent: (e: string) => void
): void {
	switch (option) {
		case "original":
			// Reset to original retrieved text from ref
			setContent(normalText.current || "");
			break;
		case "uppercase":
			setContent(content.toUpperCase());
			break;
		case "lowercase":
			setContent(content.toLowerCase());
			break;
		case "capitalize":
			setContent(
				content.replace(
					/\w\S*/g,
					(word) =>
						word.charAt(0).toUpperCase() +
						word.slice(1).toLowerCase()
				)
			);
			break;
		default:
			break;
	}
}
