import { useCallback, useEffect, useRef } from "react";

/**
 * Hook to create a timeout. Example:
 * ```tsx
 * import { Button, Typography } from "@mui/material";
 * import { useState } from "react";
 * import { useTimeout } from "iobroker-react/hooks";
 *
 * const MyComponent = () => {
 * 	const [count, setCount] = useState(0);
 * 	const [isRunning, setIsRunning] = useState(true);
 * 	const { clear, reset } = useTimeout(() => {
 * 		setCount((prevCount) => prevCount + 1);
 * 		reset();
 * 	}, 1000);
 *
 * 	const handleStart = () => {
 * 		setIsRunning(true);
 * 		reset();
 * 	};
 *
 * 	const handleStop = () => {
 * 		setIsRunning(false);
 * 		clear();
 * 	};
 *
 * 	const handleClear = () => {
 * 		setCount(0);
 * 		setIsRunning(false);
 * 		clear();
 * 	};
 *
 * 	return (
 * 		<div>
 * 			<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
 * 				Countdown: {count}
 * 			</Typography>
 * 			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
 * 				{isRunning ? "Running" : "Stopped"}
 * 			</Typography>
 * 			{!isRunning && <Button onClick={handleStart}>Start</Button>}
 * 			{isRunning && <Button onClick={handleStop}>Stop</Button>}
 * 			<Button onClick={handleClear}>Clear</Button>
 * 		</div>
 * 	);
 * };
 * ```
 */

type TimeoutHandle = ReturnType<typeof setTimeout>;

// Type definitions for the return objects of the hook
export interface TimeoutFunctions {
	reset: () => void; // The reset function that starts a new timeout
	clear: () => void; // The clear function that terminates the current timeout
}

// The actual hook definition
export const useTimeout = (
	callback: () => void, // The function that will be called after the timeout expires.
	delay: number, // The delay in milliseconds.
): TimeoutFunctions => {
	const savedCallback = useRef(callback); // The reference to the original callback function.
	const timeoutHandle = useRef<TimeoutHandle>(); // The reference to the timeout handle.

	// The clear function that terminates the current timeout
	const clear = useCallback(() => {
		clearTimeout(timeoutHandle.current as TimeoutHandle);
	}, []);

	// The reset function that starts a new timeout
	const reset = useCallback(() => {
		clear();
		timeoutHandle.current = setTimeout(() => {
			savedCallback.current();
		}, delay);
	}, [delay, clear]);

	// useEffect to start the timeout when mounting the component
	useEffect(() => {
		reset();
		return clear;
	}, [delay, reset, clear]);

	// useEffect to update the callback function on changes
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// return the reset and clear functions as an object
	return { reset, clear };
};
