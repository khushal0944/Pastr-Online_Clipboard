import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ThemeType, APIResponseType, TabType } from "./types";
import { showToast } from "./utils/toast";
import { transformText } from "./utils/textTransform";
import { Header } from "./components/Header";
import { TabNavigation } from "./components/TabNavigation";
import { SaveTextForm } from "./components/SaveTextForm";
import { ClipIdDisplay } from "./components/ClipIdDisplay";
import { RetrieveTextForm } from "./components/RetrieveTextForm";
import { RetrievedTextDisplay } from "./components/RetrievedTextDisplay";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

const localTheme: ThemeType =
	JSON.parse(localStorage.getItem("theme")!) || "light";

function App() {
	const [theme, setTheme] = useState<ThemeType>(localTheme);
	const [tab, setTab] = useState<TabType>("save");
	const [content, setContent] = useState<string>("");
	const [retrieveContent, setRetrieveContent] = useState<string>("");
	const [retrieveId, setRetrieveId] = useState<string | null>(null);
	const [boardId, setBoardId] = useState<string | null>(null);
	const [saveLoading, setSaveLoading] = useState(false);
	const [retrieveLoading, setRetrieveLoading] = useState(false);

	const prevContent = useRef<string>("");
	const normalText = useRef<string>("");
	const normalRetrieveText = useRef<string>("");

	useEffect(() => {
		const html = document.querySelector("html");
		if (html) {
			html.classList.remove("light", "dark");
			html.classList.add(theme);
		}
		localStorage.setItem("theme", JSON.stringify(theme));
	}, [theme]);

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const handleNormalTextUpdate = (text: string) => {
		normalText.current = text;
        console.log(normalText.current)
	};

	const handleSave = async () => {
		if (prevContent.current === content) return;
		if (!content || content.trim() === "") {
			showToast("Content Empty or Invalid", "error");
			return;
		}

		try {
			setSaveLoading(true);
			prevContent.current = content;
			const data = await api.post("/api/v1/board", { content });

			if (data) {
				setSaveLoading(false);
				const filteredData: APIResponseType = data.data.uploadedDoc;
				setBoardId(filteredData.shortId);
			}
		} catch (error) {
			showToast("Data Uploading Error", "error");
			if (error) setSaveLoading(false);
		}
	};

	const handleClear = () => {
		setContent("");
		setBoardId(null);
		prevContent.current = "";
		normalText.current = "";
	};

	const handleRetrieve = async () => {
		if (!retrieveId || retrieveId.length !== 4) {
			showToast("Invalid Board ID", "error");
			return;
		}

		setRetrieveLoading(true);
		try {
			const data = await api.get(`/api/v1/board/${retrieveId}`);
			if (data) {
				setRetrieveLoading(false);
				setRetrieveContent(data.data.content);
				normalRetrieveText.current = data.data.content;
			}
		} catch (error) {
			showToast("Board Not Found", "error");
			if (error) setRetrieveLoading(false);
		}
	};

	const handleRetrieveIdChange = (id: string) => {
		setRetrieveId(id);
		setRetrieveContent("");
	};

	const handleRetrieveTransform = (option: string) => {
		transformText(
			normalRetrieveText,
			option,
			retrieveContent,
			setRetrieveContent
		);
	};

	return (
		<div className="bg-gray-50 min-h-screen transition-all dark:bg-gray-950 flex flex-col items-center py-10 px-4">
			<Header theme={theme} onThemeToggle={handleThemeToggle} />

			<TabNavigation activeTab={tab} onTabChange={setTab} />

			{tab === "save" && (
				<>
					<SaveTextForm
						content={content}
						onContentChange={handleContentChange}
						onSave={handleSave}
						onClear={handleClear}
						saveLoading={saveLoading}
						normalText={normalText}
						onNormalTextUpdate={handleNormalTextUpdate}
					/>

					{boardId && <ClipIdDisplay boardId={boardId} />}
				</>
			)}

			{tab === "retrieve" && (
				<>
					<RetrieveTextForm
						retrieveId={retrieveId}
						onRetrieveIdChange={handleRetrieveIdChange}
						onRetrieve={handleRetrieve}
						retrieveLoading={retrieveLoading}
					/>

					{retrieveContent && (
						<RetrievedTextDisplay
							retrieveContent={retrieveContent}
							retrieveId={retrieveId}
							onTransform={handleRetrieveTransform}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default App;
