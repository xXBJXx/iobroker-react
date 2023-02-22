import Cookies from "js-cookie";
import { useCallback, useState } from "react";

/**
 * A React hook function that provides a custom hook,
 * to access a browser cookie.
 *
 * @param {string} name - The name of the cookie.
 * @param {string|undefined} defaultValue - The default value for the cookie if it is not present.
 * @returns {array} - An array with three elements: the current value of the cookie, a function to update the cookie value, and a function to delete the cookie.
 *
 * @example
 * import { useCookie } from "iobroker-react/hooks";
 * import { Button, Typography } from "@mui/material";
 *
 * const MyComponent: React.FC = () => {
 * 	const [myCookie, setMyCookie, deleteMyCookie] = useCookie("my-cookie", "default value");
 *
 * 	return (
 * 		<div>
 * 			<Typography>The cookie's value is {myCookie}</Typography>
 * 			<Button onClick={() => setMyCookie("new value")}>Set cookie</Button>
 * 			<Button onClick={() => deleteMyCookie()}>Delete cookie</Button>
 * 		</div>
 * 	);
 * };
 */

type CookieArray = [
	string | undefined,
	(newValue: string, options?: Cookies.CookieAttributes) => void,
	() => void,
];

export const useCookie = (
	name: string,
	defaultValue: string | undefined,
): CookieArray => {
	const [value, setValue] = useState<string | undefined>(() => {
		const cookie = Cookies.get(name);
		if (cookie) return cookie;

		Cookies.set(name, defaultValue || "");

		return defaultValue;
	});

	const updateCookie = useCallback(
		(newValue, options?: Cookies.CookieAttributes) => {
			Cookies.set(name, newValue, options || {});
			setValue(newValue);
		},
		[name],
	);

	const deleteCookie = useCallback(() => {
		Cookies.remove(name);
		setValue("");
	}, [name]);

	return [value, updateCookie, deleteCookie];
};
