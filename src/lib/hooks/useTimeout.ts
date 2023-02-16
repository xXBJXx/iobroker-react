import React from "react";

/**
 * Hook to create a timeout. Example:
 * ```tsx
 * import { useTimeout } from "iobroker-react/hooks";
 *
 * const MyComponent: React.FC = () => {
 *  const [count, setCount] = React.useState(20);
 * 	const { clear, reset } = useTimeout(() => setCount(5), 5000);
 *
 * 	return (
 * 		    <>
 * 		        count:{count}
 * 			    <Stack spacing={2} direction="row">
 * 			 	    <Button variant={'contained'} onClick={() => setCount((c) => c + 1)}>
 * 			 	        Increment
 * 			 	    </Button>
 * 			 	    <Button variant={'contained'} onClick={clear}>
 * 			 	        Clear Timeout
 * 			 	    </Button>
 * 			 	    <Button variant={'contained'} onClick={reset}>
 * 			 	        Reset Timeout
 * 			 	     </Button>
 * 			    </Stack>
 * 		    </>
 * 	    );
 * 	};
 * ```
 */

interface UseTimeout {
	(callback: () => void, timeout: number | undefined): {
		reset: () => void;
		clear: () => void;
	};
}

export const useTimeout: UseTimeout = (callback, timeout) => {
	const callbackRef = React.useRef(callback);
	const timeoutRef = React.useRef<NodeJS.Timeout | undefined>();

	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = React.useCallback(() => {
		if (timeout === undefined) return;
		timeoutRef.current = setTimeout(() => callbackRef.current(), timeout);
	}, [timeout]);

	const clear = React.useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	React.useEffect(() => {
		set();
		return clear;
	}, [timeout, set, clear]);

	const reset = React.useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
};
