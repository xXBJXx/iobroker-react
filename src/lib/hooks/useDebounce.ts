import { useEffect } from "react";
import { TimeoutFunctions, useTimeout } from "./useTimeout";

//TODO: Attention: useDebounce requires the useTimeout hook to work properly.

/**
 * import { Button, Stack, Typography } from "@mui/material";
 * import React, { useState } from 'react';
 * import useDebounce from './useDebounce';
 *
 * export default function TestComponent() {
 * 	const [count, setCount] = useState(0);
 * 	const [confirms, setConfirms] = useState(0);
 *
 * 	const handleConfirm = (count) => {
 * 		setConfirms(count);
 * 	};
 *
 * 	useDebounce(() => handleConfirm(count), 1000, [count]);
 *
 * 	const handleButtonClick = () => {
 * 		setCount((prevCount) => prevCount + 1);
 * 	};
 *
 * 	return (
 * 		<>
 * 			<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
 * 				Current count: {count}
 * 			</Typography>
 * 			<Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
 * 				Current confirms: {confirms}
 * 			</Typography>
 * 			<Stack spacing={2} direction="row">
 * 				<Button variant={'contained'} onClick={handleButtonClick}>
 * 					Increment
 * 				</Button>
 * 			</Stack>
 * 		</>
 * 	);
 * };
 */

/**
 * Custom hook to debounce a function call.
 * @param callback The function to be debounced.
 * @param delay The delay time in milliseconds.
 * @param dependencies The dependencies to watch for changes to trigger a debounced function call.
 */
export const useDebounce = (
	callback: () => void,
	delay: number,
	dependencies: any[],
): TimeoutFunctions["reset"] => {
	const { reset, clear } = useTimeout(callback, delay);

	// Reset the timer when dependencies change
	useEffect(() => {
		reset();
		// Return the clear function to clean up the timeout when the component unmounts or the dependencies change
		return clear;
	}, [dependencies, reset, clear]);
};
