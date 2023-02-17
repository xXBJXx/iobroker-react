# `useDeepCompareEffect` hook

`useDeepCompareEffect` is a custom React hook that allows a component to run an effect only when the dependencies have changed using a deep comparison instead of a shallow
comparison.

This is useful when the dependencies are objects or arrays that may change in a way that does not affect the result of the effect.

```ts
import { useDeepCompareEffect } from "iobroker-react/hooks";
```

The hook takes two arguments:

```ts
interface UseDeepCompareEffectOptions {
	/**
	 * is a function that represents the effect of being executed.
	 */
	effect: () => void | (() => void);

	/**
	 * is an array of values that the effect depends on.
	 */
	dependencies: unknown[];
}
```

## Example

```tsx
import React, { useState } from "react";
import { useDeepCompareEffect } from "iobroker-react/hooks";
import { Button, Typography } from "@mui/material";

const MyComponent: React.FC = () => {
	const [age, setAge] = React.useState(0);
	const [otherCount, setOtherCount] = React.useState(0);
	const useEffectCountRef = React.useRef<any>();
	const useDeepCompareEffectCountRef = React.useRef<any>();

	const person = {
		age: {
			age,
		},
		name: {
			first: "John",
			last: "Doe",
		},
	};

	React.useEffect(() => {
		useEffectCountRef.current.textContent =
			parseInt(useEffectCountRef.current.textContent) + 1;
	}, [person]);

	useDeepCompareEffect(() => {
		useDeepCompareEffectCountRef.current.textContent =
			parseInt(useDeepCompareEffectCountRef.current.textContent) + 1;
	}, [person]);
  
	return (
		<>
			<div>
				<div>
					useEffect:
					<Typography component={"span"} ref={useEffectCountRef}>
						0
					</Typography>
				</div>
				<div>
					useDeepCompareEffect:
					<Typography
						component={"span"}
						ref={useDeepCompareEffectCountRef}
					>
						0
					</Typography>
				</div>
				<div>Other Count: {otherCount}</div>
				<div>{JSON.stringify(person)}</div>
				<Button onClick={() => setAge((currentAge) => currentAge + 1)}>
					Increment Age
				</Button>
				<Button onClick={() => setOtherCount((count) => count + 1)}>
					Increment Other Count
				</Button>
			</div>
		</>
	);
};
```
