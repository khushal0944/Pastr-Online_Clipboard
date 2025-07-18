import { CopyButton } from "./CopyButton";
import { showToast } from "../utils/toast";

interface ClipIdDisplayProps {
	boardId: string;
}

export function ClipIdDisplay({ boardId }: ClipIdDisplayProps) {
	const handleCopyId = () => {
		navigator.clipboard.writeText(boardId);
		showToast("ID Copied Successfully", "success");
	};

	return (
		<div className="dark:bg-gray-900 bg-white rounded-lg shadow-sm w-full max-w-2xl p-6 border border-gray-200">
			<h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">
				Your Clip ID
			</h2>
			<p className="text-gray-600 mb-6 dark:text-gray-200">
				Use this ID to retrieve your text later
			</p>

			<div className="flex justify-center mb-6">
				<div className="bg-gray-100 py-3 px-6 rounded-md">
					<span className="text-3xl font-mono tracking-widest">
						{boardId}
					</span>
				</div>
			</div>

			<div className="flex justify-center">
				<CopyButton
					text={boardId}
					onCopy={handleCopyId}
					label="Copy ID"
				/>
			</div>
		</div>
	);
}
