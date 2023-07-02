import { useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initialValue?: T) {
	const [value, setValue] = useState<T>(() => {
		const valueFromStorage = localStorage.getItem(key);
		const parsedValue = valueFromStorage
			? JSON.parse(valueFromStorage)
			: undefined;

		if (
			typeof initialValue === "object" &&
			!Array.isArray(initialValue) &&
			initialValue !== null
		) {
			return {
				...initialValue,
				...parsedValue,
			};
		}

		return parsedValue || initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
}
