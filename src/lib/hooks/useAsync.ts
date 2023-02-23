import React from "react";

interface AsyncHookResult<T, E extends Error = Error> {
	loading: boolean;
	error?: E;
	value?: T;
}

type AsyncCallback<T> = () => Promise<T>;

export function useAsync<T, E extends Error = Error>(
	callback: AsyncCallback<T>,
	dependencies: React.DependencyList = [],
): AsyncHookResult<T, E> {
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<E>();
	const [value, setValue] = React.useState<T>();

	const callbackMemoized = React.useCallback(async () => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		try {
			const result = await callback();
			setValue(result);
		} catch (error: unknown) {
			setError(error as E);
		} finally {
			setLoading(false);
		}
	}, dependencies);

	React.useEffect(() => {
		let isMounted = true;
		const cleanup = async () => {
			if (isMounted) {
				await callbackMemoized();
			}
		};
		cleanup().then(() => {
			isMounted = false;
		});
		return () => {
			isMounted = false;
		};
	}, [callbackMemoized]);

	return { loading, error, value };
}
