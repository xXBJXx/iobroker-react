# `usePrevious` Hook

The `usePrevious` hook returns the previous value of a given value.

```ts
import { usePrevious } from "iobroker-react/hooks";
```

## Usage

```ts
const [previousValue] = usePrevious(value);
```

## Example

```tsx
import React from "react";
import { usePrevious } from "iobroker-react/hooks";
import { Button } from "@mui/material";

const ExampleComponent: React.FC = React.memo(() => {
	const [count, setCount] = React.useState(0);
	const previousCount = usePrevious(count);

	return (
		<>
			<p>Current count: {count}</p>
			<p>Previous count: {previousCount}</p>
			<Button onClick={() => setCount(count + 1)}>Increment</Button>
		</>
	);
});
```
