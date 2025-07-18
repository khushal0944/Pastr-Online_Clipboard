interface TextTransformSelectProps {
	onChange: (option: string) => void;
	className?: string;
}

export function TextTransformSelect({
	onChange,
	className = "",
}: TextTransformSelectProps) {
	return (
		<select
			onChange={(e) => onChange(e.target.value)}
			className={`outline-none min-h-10 border border-gray-400 cursor-pointer m-1 text-center bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md ${className}`}
		>
			<option value="original">Original</option>
			<option value="uppercase">Uppercase</option>
			<option value="lowercase">Lowercase</option>
			<option value="capitalize">Capitalize</option>
		</select>
	);
}