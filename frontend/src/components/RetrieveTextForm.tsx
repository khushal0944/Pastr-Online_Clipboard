interface RetrieveTextFormProps {
	retrieveId: string | null;
	onRetrieveIdChange: (id: string) => void;
	onRetrieve: () => void;
	retrieveLoading: boolean;
}

export function RetrieveTextForm({
	retrieveId,
	onRetrieveIdChange,
	onRetrieve,
	retrieveLoading,
}: RetrieveTextFormProps) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
		onRetrieveIdChange(value);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm w-full max-w-2xl dark:bg-gray-900 p-6 border border-gray-200 mb-6">
			<h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">
				Retrieve Text
			</h2>
			<p className="text-gray-600 mb-6 dark:text-gray-200">
				Enter the 4-digit ID to retrieve your saved text
			</p>

			<div className="flex mb-6 mx-auto w-11/12 fixRetrieveBtn">
				<input
					type="text"
					className="flex-1 p-3 w-full border dark:bg-gray-100 max-[500px]:rounded-lg border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-200 text-center text-xl font-mono"
					placeholder="Enter Board ID to retrieve"
					value={retrieveId || ""}
					onChange={handleInputChange}
				/>
				<button
					className="px-3 py-2 max-[500px]:mt-2 max-[500px]:rounded-lg bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors"
					onClick={onRetrieve}
				>
					{retrieveLoading ? "Retrieving.." : "Retrieve Text"}
				</button>
			</div>
		</div>
	);
}
