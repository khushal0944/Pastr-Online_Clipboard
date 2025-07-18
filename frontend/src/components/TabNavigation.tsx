import { TabType } from "../types";

interface TabNavigationProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
	const getTabClasses = (tab: TabType) => {
		const baseClasses =
			"flex-1 py-3 border-b-2 font-medium text-center transition-colors hover:bg-white dark:hover:bg-gray-800";
		const activeClasses =
			"border-black text-gray-800 dark:border-white dark:text-white";
		const inactiveClasses =
			"dark:border-gray-800 dark:text-gray-400 text-gray-500";

		return `${baseClasses} ${
			activeTab === tab ? activeClasses : inactiveClasses
		}`;
	};

	return (
		<div className="flex w-full max-w-2xl mb-6">
			<button
				className={getTabClasses("save")}
				onClick={() => onTabChange("save")}
			>
				Save Text
			</button>
			<button
				className={getTabClasses("retrieve")}
				onClick={() => onTabChange("retrieve")}
			>
				Retrieve Text
			</button>
		</div>
	);
}
