import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "typescript-toastify";
import { ToastType } from "typescript-toastify/lib/type/type";

const api = axios.create({
	baseURL: "https://pastr.vercel.app",
});

type ThemeType = "light" | "dark";

const localTheme: ThemeType = JSON.parse(localStorage.getItem("theme")!) || "light"; 

interface APIResponseType {
    shortId: string,
    content: string,
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

export default function App() {
    const [theme, setTheme] = useState<ThemeType>(localTheme);

    useEffect(() => {
        const html = document.querySelector('html')
        if (html) {
            html?.classList.remove("light", "dark")
            html?.classList.add(theme)
        }
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme])

    const [retrieveContent, setRetrieveContent] = useState<string>("");
    const [retrieveId, setRetrieveId] = useState<string | null>(null);
    const [content, setContent] = useState<string>("");
    const [boardId, setBoardId] = useState<string | null>(null);

    const handleContent = async () => {
        if (!content || content.trim() === "") {
            showToast("Invalid Content", "error");
            return;
        }
        try {
            
            const data = await api.post(('/api/v1/board'), {
                content
            })
            const filteredData: APIResponseType = data.data.uploadedDoc
            setBoardId(filteredData.shortId)
        } catch (error) {
            showToast("Data Uploding Error", "error")
        }
    }

    const handleRetrival = async () => {
        if (!retrieveId || retrieveId.length !== 4) {
            showToast("Invalid Board ID", "error")
            return;
        }
        try {
            const data = (await api.get(`/api/v1/board/${retrieveId}`)).data
            setRetrieveContent(data.content)
        } catch (error) {
            showToast("Board Not Found", "error")
        }
    }

    function copyRetrival() {
        if (!retrieveContent || retrieveContent.trim() === "") return;
        navigator.clipboard
			.writeText(retrieveContent)
			.then(() => showToast("Retrieve Text Copied Successfully", "success"));
    }

	return (
		<div className="w-full min-h-screen bg-green-300 dark:bg-green-950 transition-colors pb-4 relative">
			<div className=" text-4xl transition-colors bg-gray-600 dark:bg-gray-900  flex dark:border-white border-black border-b-2 p-5 items-center justify-between">
				<h1 className="font-semibold uppercase dark:text-white">
					Online ClipBoard
				</h1>
				<button
					onClick={() =>
						setTheme(theme === "light" ? "dark" : "light")
					}
				>
					{theme === "light" ? "☀️" : "🌑"}
				</button>
			</div>
			<div
				id="board"
				className="bg-white dark:bg-gray-800 dark:text-white shadow-xl p-4 m-6 rounded-xl"
			>
				<h1 className="mb-2">Send to Online Clipboard:</h1>
				<textarea
					className="w-full rounded-lg p-2 mb-2 focus:bg-gray-50 border-gray-500 dark:focus:bg-gray-700 outline-none dark:bg-gray-600 dark:placeholder:text-gray-200 focus:shadow focus:shadow-blue-500 border-2 shadow-md"
					style={{ minHeight: "120px" }}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Enter Content Here..."
				/>
				<button
					onClick={handleContent}
					className="bg-blue-600 hover:bg-blue-800 p-3 rounded-xl text-white"
				>
					Send above Text to Clipboard
				</button>
				{boardId && (
					<p className="mt-2 text-md">
						ID for the above Board:{" "}
						<span
							onClick={() =>
								navigator.clipboard
									.writeText(boardId)
									.then(() =>
										showToast(
											"ID Copied Successfully",
											"success"
										)
									)
							}
							className="cursor-pointer border-black text-md border-b-2"
						>
							{boardId}
						</span>
					</p>
				)}
			</div>
			<div className="bg-white shadow-xl p-4 m-6 rounded-xl dark:bg-gray-800 dark:text-white">
				<input
					type="number"
					min={1000}
					max={9999}
					onChange={(e) => setRetrieveId(e.target.value)}
					className="w-full rounded-lg p-2 mb-2 focus:bg-gray-50 outline-none dark:focus:bg-gray-700 dark:bg-gray-600 dark:placeholder:text-gray-200 border-gray-500  focus:shadow focus:shadow-blue-500 border-2 shadow-md"
					placeholder="Enter 4 Digit Board ID"
				/>
				<button
					onClick={handleRetrival}
					className="bg-blue-600 hover:bg-blue-800 p-3 rounded-xl text-white"
				>
					Retreive Clipboard
				</button>
				<button
					onClick={copyRetrival}
					className="bg-blue-600 ml-2 hover:bg-blue-800 p-3 rounded-xl text-white"
				>
					Copy Clipboard
				</button>
				<textarea
					disabled
					className="w-full rounded-lg p-2 my-2 border-gray-500 outline-none dark:bg-gray-600 dark:placeholder:text-gray-200 focus:shadow focus:shadow-blue-500 border-2 shadow-md"
					style={{ minHeight: "120px" }}
					value={retrieveContent}
					placeholder="Your Content Here..."
				/>
			</div>
			<footer className="text-center text-lg dark:text-white font-semibold">
				Made With ❤️ By Khushal Kumar
			</footer>
		</div>
	);
}
