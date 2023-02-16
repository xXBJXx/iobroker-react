import React from "react";
import { useTimeout } from "./useTimeout";

//TODO: Attention: useDebounce requires the useTimeout hook to work properly.

/**
 * import { Button, Stack } from '@mui/material';
 * import React, { useState } from 'react';
 * import useDebounce from './useDebounce';
 *
 * export default function TestComponent() {
 * 	const [count, setCount] = React.useState(0);
 * 	const [confirms, setConfirms] = React.useState(0);
 * 	useDebounce(
 * 		() => {
 * 			setConfirms(count);
 * 			alert(count);
 * 		},
 * 		1000,
 * 		[count],
 * 	);
 *
 * 	return (
 * 		<>
 * 			count: {count}
 * 			<br />
 * 			confirms: {confirms}
 * 			<Stack spacing={2} direction="row">
 * 				<Button
 * 					variant={"contained"}
 * 					onClick={() => setCount((c) => c + 1)}
 * 				>
 * 					Increment
 * 				</Button>
 * 			</Stack>
 * 		</>
 * 	);
 * }
 */

export const useDebounce = (
	callback: () => void,
	delay: number | undefined,
	dependencies: any,
) => {
	const { reset, clear } = useTimeout(callback, delay);
	React.useEffect(reset, [...dependencies, reset]);
	React.useEffect(clear, []);
};
