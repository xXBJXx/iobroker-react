import { useCallback, useEffect, useState } from "react";

export interface UseLocalStorage {
	(key: string, defaultValue: unknown): [
		string | null,
		(v: unknown) => void,
		() => void,
	];
}

export interface UseSessionStorage {
	(key: string, defaultValue: unknown): [
		string | null,
		(value: unknown) => void,
		() => void,
	];
}

export interface UseStorage {
	(key: string, defaultValue: unknown, storageObject: Storage): [
		string | null,
		(value: unknown) => void,
		() => void,
	];
}

const useStorage: UseStorage = (key, defaultValue, storageObject) => {
	const [value, setValue] = useState(() => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);

		if (typeof defaultValue === "function") {
			return defaultValue();
		} else {
			return defaultValue;
		}
	});

	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];
};

export const useLocalStorage: UseLocalStorage = (key, defaultValue) => {
	return useStorage(key, defaultValue, window.localStorage);
};

export const useSessionStorage: UseSessionStorage = (key, defaultValue) => {
	return useStorage(key, defaultValue, window.sessionStorage);
};
