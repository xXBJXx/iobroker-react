# `useTimeout` hook

The `useTimeout` hook is used to create a timeout that is automatically cleared when the component unmounts.

```ts
import { useTimeout } from "iobroker-react/hooks";
```

It returns a function that can be used to set a timeout. The function takes the following parameters:

```ts
interface TimeoutOptions {
	/**
	 * The callback to execute after the timeout.
	 */
	callback: () => void;
	/**
	 * The timeout in milliseconds.
	 */
	timeout: number;
}
```

## Return function

The useTimeout returns two functions that can be used to clear and reset the timer.

```ts
interface TimeoutFunctions {
	clear: () => void; // The clear function that terminates the current timeout
	reset: () => void; // The reset function that starts a new timeout
}
```

## Example

```tsx
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTimeout } from "iobroker-react/hooks";

const MyComponent = () => {
	const [count, setCount] = useState(0);
	const [isRunning, setIsRunning] = useState(true);
	const { clear, reset } = useTimeout(() => {
		setCount((prevCount) => prevCount + 1);
		reset();
	}, 1000);

	const handleStart = () => {
		setIsRunning(true);
		reset();
	};

	const handleStop = () => {
		setIsRunning(false);
		clear();
	};

	const handleClear = () => {
		setCount(0);
		setIsRunning(false);
		clear();
	};

	return (
		<div>
			<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
				Countdown: {count}
			</Typography>
			<Typography
				variant="h6"
				component="div"
				sx={{ flexGrow: 1, color: isRunning ? "green" : "red" }}
			>
				{isRunning ? "Running" : "Stopped"}
			</Typography>
			{!isRunning && <Button onClick={handleStart}>Start</Button>}
			{isRunning && <Button onClick={handleStop}>Stop</Button>}
			<Button onClick={handleClear}>Clear</Button>
		</div>
	);
};
```
