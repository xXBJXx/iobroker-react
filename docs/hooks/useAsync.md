# `useAsync` hook

This hook is used to handle asynchronous operations in React components.

```ts
import { useAsync } from "iobroker-react/hooks";
```
The function takes a callback function and dependencies as a parameter. The callback function is called when the dependencies change. 
The hook returns an object with the following properties: `loading`, `error` and `result`.
```ts
function useAsync<T>(
	callback: () => Promise<T>,
	deps?: DependencyList,
): {
	loading: boolean;
	error: Error | null;
	result: T | null;
};
```

## Example Single usage

```tsx
import React from "react";
import { useAsync } from "iobroker-react/hooks";
import { Button, Typography } from "@mui/material";

const ExampleComponent: React.FC = () => {
	const [success, setSuccess] = React.useState(false);
	const { loading, error, value } = useAsync(async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/posts/1",
		);
		return response.json();
	}, [success]);

	return (
		<>
			<Button onClick={() => setSuccess(!success)}>refresh</Button>
			<br />
			{loading ? (
				"Loading..."
			) : error ? (
				`Error: ${error.message}`
			) : (
				<>
					<Typography>{value?.title}</Typography>
					<Typography>{value?.content}</Typography>
				</>
			)}
		</>
	);
};
```

## Example Multiple usage

```tsx
import React from "react";
import { useAsync } from "iobroker-react/hooks";
import { Button, Typography } from "@mui/material";

const ExampleComponent: React.FC = () => {
	const [success, setSuccess] = React.useState(false);
	const {
		loading: myLoading1,
		error: myError1,
		value: myValue1,
	} = useAsync(async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/posts/1",
		);
		return response.json();
	}, [success]);
	const [success2, setSuccess2] = React.useState(false);
	const {
		loading: myLoading2,
		error: myError2,
		value: myValue2,
	} = useAsync(async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/posts/2",
		);
		return response.json();
	}, [success2]);

	return (
		<>
			<Button onClick={() => setSuccess(!success)}>refresh</Button>
			<Button onClick={() => setSuccess2(!success2)}>refresh 2</Button>
			<br />
			{myLoading1 ? (
				"Loading..."
			) : myError1 ? (
				`Error: ${myError1.message}`
			) : (
				<>
					<Typography>{myValue1?.title}</Typography>
					<Typography>{myValue1?.content}</Typography>
				</>
			)}

			<br />
			{myLoading2 ? (
				"Loading..."
			) : myError2 ? (
				`Error: ${myError2.message}`
			) : (
				<>
					<Typography>{myValue2?.title}</Typography>
					<Typography>{myValue2?.content}</Typography>
				</>
			)}
		</>
	);
};
```



