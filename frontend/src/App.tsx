import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Toast from "typescript-toastify";
import { ToastType } from "typescript-toastify/lib/type/type";

const api = axios.create({
	baseURL: "https://online-clipboard-99xm.onrender.com",
});

type ThemeType = "light" | "dark";

const localTheme: ThemeType =
	JSON.parse(localStorage.getItem("theme")!) || "light";

interface APIResponseType {
	shortId: string;
	content: string;
}

function showToast(toastMsg: string, type: ToastType) {
	new Toast({
		position: "top-right",
		toastMsg,
		autoCloseTime: 3000,
		canClose: true,
		showProgress: true,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		type,
		theme: "dark",
	});
}

function App() {
	const [theme, setTheme] = useState<ThemeType>(localTheme);

	useEffect(() => {
		const html = document.querySelector("html");
		if (html) {
			html?.classList.remove("light", "dark");
			html?.classList.add(theme);
		}
		localStorage.setItem("theme", JSON.stringify(theme));
	}, [theme]);

	let prevContent = useRef<string>("");
	let normalText = useRef<string>("");
	const [tab, setTab] = useState<"save" | "retrieve">("save");
	const [retrieveContent, setRetrieveContent] = useState<string>("");
	const [retrieveId, setRetrieveId] = useState<string | null>(null);
	const [content, setContent] = useState<string>("");
	const [boardId, setBoardId] = useState<string | null>(null);

	const handleContent = async () => {
		if (prevContent.current === content) return;
		if (!content || content.trim() === "") {
			showToast("Content Empty or Invalid", "error");
			return;
		}
		try {
			prevContent.current = content;
			const data = await api.post("/api/v1/board", {
				content,
			});
			const filteredData: APIResponseType = data.data.uploadedDoc;
			setBoardId(filteredData.shortId);
		} catch (error) {
			showToast("Data Uploding Error", "error");
		}
	};

	const handleRetrival = async () => {
		if (!retrieveId || retrieveId.length !== 4) {
			showToast("Invalid Board ID", "error");
			return;
		}
		try {
			const data = await api.get(`/api/v1/board/${retrieveId}`);
			setRetrieveContent(data.data.content);
		} catch (error) {
			showToast("Board Not Found", "error");
		}
	};

	function copyRetrival() {
		if (!retrieveContent || retrieveContent.trim() === "") return;
		navigator.clipboard
			.writeText(retrieveContent)
			.then(() =>
				showToast("Retrieve Text Copied Successfully", "success")
			);
	}

	function handleSelect(opt: string) {
		switch (opt) {
			case "original":
				setContent(normalText.current);
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

	return (
		<div className="bg-gray-50 min-h-screen transition-all dark:bg-gray-950 flex flex-col items-center py-10 px-4">
			<div className="flex font-bold text-gray-800 w- justify-between mb-8 items-center w-full max-w-2xl">
				<div></div>
				<h1 className="text-5xl dark:text-white">Pastr</h1>
				<button
					className="text-4xl"
					onClick={() =>
						setTheme(theme === "light" ? "dark" : "light")
					}
				>
					{theme === "light" ? "☀️" : "🌑"}
				</button>
			</div>

			<div className="flex w-full max-w-2xl mb-6">
				<button
					id="saveTab"
					className={`${
						tab === "save"
							? "border-black text-gray-800 dark:border-white dark:text-white"
							: "dark:border-gray-800 dark:text-gray-400 text-gray-500"
					} flex-1 py-3 border-b-2 font-medium text-center transition-colors  hover:bg-white dark:hover:bg-gray-800`}
					onClick={() => setTab("save")}
				>
					Save Text
				</button>
				<button
					id="retrieveTab"
					className={`${
						tab === "retrieve"
							? "border-black text-gray-800 dark:border-white dark:text-white"
							: "dark:border-gray-800 dark:text-gray-400 text-gray-500"
					} flex-1 py-3 border-b-2 font-medium transition-colors  text-center hover:bg-white dark:hover:bg-gray-800 `}
					onClick={() => setTab("retrieve")}
				>
					Retrieve Text
				</button>
			</div>

			{tab === "save" && (
				<>
					<div
						id="saveForm"
						className="bg-white dark:bg-gray-900 rounded-lg shadow-sm w-full max-w-2xl p-6 border border-gray-200 mb-6"
					>
						<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
							Save to Clipboard
						</h2>
						<p className="text-gray-600 dark:text-gray-100 mb-6">
							Enter your text below and get a 4-digit ID to access
							it later (within 1 Hour)
						</p>

						<div className="mb-6">
							<textarea
								className="w-full h-40 p-3 border dark:bg-gray-800 dark:text-white focus:dark:bg-gray-950 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
								placeholder="Enter your text here..."
								value={content}
								style={{ minHeight: "120px" }}
								onChange={(e) => {setContent(e.target.value); normalText.current = content;}}
							></textarea>
						</div>

						<div className="flex justify-between">
							<button
								onClick={() => {
									setContent("");
									setBoardId(null);
									prevContent.current = "";
								}}
								className="px-5 py-2  dark:text-white  border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
							>
								Clear
							</button>
							<select
								onChange={(e) => handleSelect(e.target.value)}
                                className="outline-none"
							>
								<option value={"original"}>Original</option>
								<option value={"uppercase"}>Uppercase</option>
								<option value={"lowercase"}>Lowercase</option>
								<option value={"capitalize"}>Capitalize</option>
							</select>
							<button
								onClick={handleContent}
								className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
							>
								Save Text
							</button>
						</div>
					</div>

					{boardId && (
						<div
							id="clipIdSection"
							className="dark:bg-gray-900 bg-white rounded-lg shadow-sm w-full max-w-2xl p-6 border border-gray-200"
						>
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
								<button
									onClick={() => {
										showToast(
											"ID Copied Successfully",
											"success"
										);
										boardId
											? navigator.clipboard.writeText(
													boardId
											  )
											: "";
									}}
									className="px-5 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
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
									Copy ID
								</button>
							</div>
						</div>
					)}
				</>
			)}

			{tab === "retrieve" && (
				<>
					<div
						id="retrieveForm"
						className="bg-white rounded-lg shadow-sm w-full max-w-2xl dark:bg-gray-900 p-6 border border-gray-200 mb-6"
					>
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
								onChange={(e) => {
									setRetrieveId(
										e.target.value
											.replace(/[^0-9]/g, "")
											.slice(0, 4)
									);
									setRetrieveContent("");
								}}
							/>
							<button
								className="px-3 py-2 max-[500px]:mt-2 max-[500px]:rounded-lg bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors"
								onClick={handleRetrival}
							>
								Retrieve
							</button>
						</div>
					</div>

					{retrieveContent && (
						<div
							id="retrievedTextSection"
							className="bg-white rounded-lg dark:bg-gray-900 shadow-sm w-full max-w-2xl p-6 border border-gray-200"
						>
							<h2 className="text-2xl dark:text-white font-bold text-gray-800 mb-2">
								Retrieved Text
							</h2>
							<p className="text-gray-600 mb-6  dark:text-gray-200">
								Here's the text associated with ID: {retrieveId}
							</p>

							<textarea
								disabled
								className="w-full h-40 p-3 border border-gray-300 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
								placeholder="Enter your text here..."
								value={retrieveContent}
								style={{ minHeight: "50px" }}
							></textarea>

							<div className="flex justify-end">
								<button
									onClick={copyRetrival}
									className="px-5 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
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
									Copy Text
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default App;
