import { TextTransformSelect } from "./TextTransformSelect";
import { CopyButton } from "./CopyButton";
import { showToast } from "../utils/toast";

interface RetrievedTextDisplayProps {
	retrieveContent: string;
	retrieveId: string | null;
	onTransform: (option: string) => void;
}

export function RetrievedTextDisplay({
	retrieveContent,
	retrieveId,
	onTransform,
}: RetrievedTextDisplayProps) {
	const handleCopyText = () => {
		if (!retrieveContent || retrieveContent.trim() === "") return;
		navigator.clipboard
			.writeText(retrieveContent)
			.then(() =>
				showToast("Retrieve Text Copied Successfully", "success")
			);
	};

	return (
		<div className="bg-white rounded-lg dark:bg-gray-900 shadow-sm w-full max-w-2xl p-6 border border-gray-200">
			<h2 className="text-2xl dark:text-white font-bold text-gray-800 mb-2">
				Retrieved Text
			</h2>
			<p className="text-gray-600 mb-6 dark:text-gray-200">
				Here's the text associated with ID: {retrieveId}
			</p>

			<textarea
				disabled
				className="w-full h-40 p-3 border border-gray-300 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
				placeholder="Enter your text here..."
				value={retrieveContent}
				style={{ minHeight: "50px" }}
			/>

			<div className="flex justify-between">
				<TextTransformSelect onChange={onTransform} />
				<CopyButton
					text={retrieveContent}
					onCopy={handleCopyText}
					label="Copy Text"
				/>
			</div>
		</div>
	);
}
