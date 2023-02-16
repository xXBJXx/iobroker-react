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
interface TimeoutReturn {
	/**
	 * Clears the timeout.
	 */
	clear: () => void;
	/**
	 * Resets the timeout.
	 */
	reset: () => void;
}
```

## Example

```tsx
import { useTimeout } from "iobroker-react/hooks";

const MyComponent = () => {
	const [count, setCount] = React.useState(20);
	const [finished, setFinished] = React.useState(false);

	// timeout
	const { clear, reset } = useTimeout(() => {
		if (count !== 0) {
			setCount((c) => c - 1);
			setFinished(false);
			reset();
		} else {
			clear();
			setFinished(true);
		}
	}, 1000);

	// reset timeout
	const handleReset = () => {
		reset();
		setFinished(false);
		setCount(20);
	};

	// clear timeout
	const handleClear = () => {
		clear();
		setFinished(true);
	};

	return (
		<>
			count:{count}
			<br />
			finished:{finished.toString()}
			<Stack direction="row">
				<Button variant={"contained"} onClick={handleClear}>
					Clear Timeout
				</Button>
				<Button variant={"contained"} onClick={handleReset}>
					Reset Timeout
				</Button>
			</Stack>
		</>
	);
};
```
