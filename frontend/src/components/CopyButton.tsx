interface CopyButtonProps {
	text: string;
	onCopy: () => void;
	label?: string;
	className?: string;
}

export function CopyButton({
	onCopy,
	label = "Copy",
	className = "",
}: CopyButtonProps) {
	return (
		<button
			onClick={onCopy}
			className={`px-5 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors flex items-center ${className}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 mr-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
				/>
			</svg>
			{label}
		</button>
	);
}
