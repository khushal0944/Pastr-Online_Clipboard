import { RefObject } from "react";
import { TextTransformSelect } from "./TextTransformSelect";
import { transformText } from "../utils/textTransform";

interface SaveTextFormProps {
	content: string;
	onContentChange: (content: string) => void;
	onSave: () => void;
	onClear: () => void;
	saveLoading: boolean;
	normalText: RefObject<string>;
	onNormalTextUpdate: (text: string) => void;
}

export function SaveTextForm({
	content,
	onContentChange,
	onSave,
	onClear,
	saveLoading,
	normalText,
	onNormalTextUpdate,
}: SaveTextFormProps) {
	const handleTransform = (option: string) => {
		transformText(normalText, option, content, onContentChange);
	};

	const handleTextareaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const newValue = e.target.value;
		onContentChange(newValue);
		onNormalTextUpdate(newValue);
	};

	return (
		<div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm w-full max-w-2xl p-6 border border-gray-200 mb-6">
			<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
				Save to Clipboard
			</h2>
			<p className="text-gray-600 dark:text-gray-100 mb-6">
				Enter your text below and get a 4-digit ID to access it later
				(within 1 Hour)
			</p>

			<div className="mb-6">
				<textarea
					className="w-full h-40 p-3 border dark:bg-gray-800 dark:text-white focus:dark:bg-gray-950 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
					placeholder="Enter your text here..."
					value={content}
					style={{ minHeight: "120px" }}
					onChange={handleTextareaChange}
				/>
			</div>

			<div className="flex justify-between max-[400px]:flex-col">
				<button
					onClick={onSave}
					className="px-5 py-2 bg-black m-1 text-white border border-gray-400 rounded-md hover:bg-gray-800 transition-colors"
				>
					{saveLoading ? "Saving..." : "Save Text"}
				</button>
				<TextTransformSelect onChange={handleTransform} />
				<button
					onClick={onClear}
					className="px-5 py-2 m-1 dark:text-white border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
				>
					Clear
				</button>
			</div>
		</div>
	);
}
