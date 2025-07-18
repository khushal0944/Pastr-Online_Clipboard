import { ThemeType } from "../types";

interface HeaderProps {
	theme: ThemeType;
	onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
	return (
		<div className="flex font-bold text-gray-800 w- justify-between mb-8 items-center w-full max-w-2xl">
			<div></div>
			<h1 className="text-5xl dark:text-white">Pastr</h1>
			<button className="text-4xl" onClick={onThemeToggle}>
				{theme === "light" ? "☀️" : "🌑"}
			</button>
		</div>
	);
}
