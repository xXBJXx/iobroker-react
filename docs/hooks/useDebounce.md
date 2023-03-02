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
import { Button, Stack, Typography } from "@mui/material";

const ExampleComponent: React.FC = () => {
	const [count, setCount] = useState(0);
	const [confirms, setConfirms] = useState(0);

	const handleConfirm = (count) => {
		setConfirms(count);
	};

	useDebounce(() => handleConfirm(count), 1000, [count]);

	const handleButtonClick = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<>
			<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
				Current count: {count}
			</Typography>
			<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
				Current confirms: {confirms}
			</Typography>
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={handleButtonClick}>
					Increment
				</Button>
			</Stack>
		</>
	);
};
```
