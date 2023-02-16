# `useStorage` hook

The `useStorage` hook is used to store data in the browser's local or session storage.

```ts
import { useLocalStorage, useSessionStorage } from "iobroker-react/hooks";
```

The `useLocalStorage` and `useSessionStorage` functions are identical, except that `useLocalStorage` uses local storage and `useSessionStorage` uses session storage.
The functions expect the name of the value as the first parameter and the default value as the second parameter if the value is not already set.

```ts
interface UseLocalStorage {
  key: string;
  defaultValue: unknown;
}

interface UseSessionStorage {
	key: string;
	defaultValue: unknown;
}
```

It returns an array with the following properties:

```ts
interface useStorageReturn {
	value: string | null;
	setValue: (value: unknown) => void;
	removeValue: () => void;
}
```

## Example for useLocalStorage

```tsx
import { Button, Stack } from '@mui/material';
import React from 'react';
import { useLocalStorage } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	const [age, setAge, removeAge] = useLocalStorage('age', 26);

	return (
		<React.Fragment>
			{age}
			<br />
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={() => setAge(40)}>
					Set Age
				</Button>
				<Button variant={'contained'} onClick={removeAge}>
					Remove Age
				</Button>
			</Stack>
		</React.Fragment>
	);
}

```

## Example for useSessionStorage

```tsx
import { Button, Stack } from '@mui/material';
import React from 'react';
import { useSessionStorage } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	const [age, setAge, removeAge] = useSessionStorage('age', 26);

	return (
		<React.Fragment>
			{age}
			<br />
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={() => setAge(40)}>
					Set Age
				</Button>
				<Button variant={'contained'} onClick={removeAge}>
					Remove Age
				</Button>
			</Stack>
		</React.Fragment>
	);
}

```
