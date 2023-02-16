# `useDebounce` hook

The `useDebounce` is a custom React hook that allows a component to delay the execution of a callback function for a specified amount of time.

```ts
import { useDebounce } from "iobroker-react/hooks";
```
The hook takes in three arguments:

```ts
interface UseDebounce {
	/**
	 * The callback is the function that should be debounced.
	 */
	callback: () => void;
	/**
	 * The delay is the time in milliseconds that should pass before the callback is invoked.
	 */
	delay: number;
	/**
	 * The dependencies is an array of values that the hook should listen to for changes and re-run the callback if any of the changes.
	 */
	dependencies: any[];
}
```

## Example

```tsx
import React, { useState } from "react";
import { useDebounce } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	const [count, setCount] = React.useState(0);
	const [confirms, setConfirms] = React.useState(0);
	useDebounce(
		() => {
			setConfirms(count);
			alert(count);
		},
		1000,
		[count],
	);

	return (
		<>
			count: {count}
			<br />
			confirms: {confirms}
			<Stack spacing={2} direction="row">
				<Button
					variant={"contained"}
					onClick={() => setCount((c) => c + 1)}
				>
					Increment
				</Button>
			</Stack>
		</>
	);
};
```
