# `useCookie` hook

The `useCookie` hook is used to read and write cookies.

```ts
import { useCookie } from "iobroker-react/hooks";
```

The `useCookie` hook allows you to read and write cookies. It takes the cookie name and optional options as parameters and returns a tuple with the cookie value and a
function to update and delete the cookie. The cookie value is always a string.

```ts
function useCookie(
	/** The name of the cookie */
	cookieName: string,
	/** Optional options */
	defaultValue: string | undefined,
): readonly [
	/** The value of the cookie */
	value: string | undefined,
	/** A function to update the cookie. If the value is `undefined`, the cookie is deleted. */
	setCookie: (newValue: string, options?: UseCookieOptions) => void,
	deleteCookie: () => void,
]

interface UseCookieOptions {
	/** The path of the cookie. Default: `/` */
	path?: string;
	/** The domain of the cookie. Default: `undefined` */
	domain?: string;
	/** The expiration date of the cookie. Default: `undefined` */
	expires?: Date;
	/** Whether the cookie is only available over HTTPS. Default: `false` */
	secure?: boolean;
	/** Whether the cookie is only available for HTTP(S) requests and not for client-side JavaScript. Default: `false` */
	httpOnly?: boolean;
}
```

## Example

```tsx
import { useCookie } from "iobroker-react/hooks";
import { Button, Typography } from "@mui/material";

const MyComponent: React.FC = () => {
	const [myCookie, setMyCookie, deleteMyCookie] = useCookie("my-cookie", "default value");

	return (
		<div>
			<Typography>The cookie's value is {myCookie}</Typography>
			<Button onClick={() => setMyCookie("new value")}>Set cookie</Button>
			<Button onClick={() => deleteMyCookie()}>Delete cookie</Button>
		</div>
	);
};
```

