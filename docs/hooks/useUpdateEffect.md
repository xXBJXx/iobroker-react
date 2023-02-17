# `useUpdateEffect` hook

This hook is similar to `useEffect`, but it will only run on updates. It will not run on the initial render.

```ts
import { useUpdateEffect } from "iobroker-react/hooks";
```

The hook takes two parameters:

```ts
interface UseUpdateEffectOptions {
	/**
	 * The effect to run on updates.
	 */
	effect: () => void;

	/**
	 * The dependencies of the effect.
	 */
	dependencies: unknown[];
}
``` 

## Example

```tsx
import React, { useState } from "react";
import { useUpdateEffect } from "iobroker-react/hooks";
import { Button } from "@mui/material";

const Counter: React.FC = () => {
	const [count, setCount] = useState(0);
	const [useEffectCount, setUseEffectCount] = useState(0);

	useUpdateEffect(() => {
		console.log("Count changed to", count);
	}, [count]);

	React.useEffect(() => {
		console.log("useEffect Count changed to", useEffectCount);
		setUseEffectCount(useEffectCount + 1);
	}, [count]);

	return (
		<>
			<p>Count: {count}</p>
			<p>useEffect Count: {useEffectCount}</p>
			<Button onClick={() => setCount(count + 1)}>Increment</Button>
		</>
	);
};
```

