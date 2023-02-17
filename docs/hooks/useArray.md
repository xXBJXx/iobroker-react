# `useArray` hook

`useArray` is a custom React hook that allows a component to manage an array state.

```ts
import {useArray} from 'iobroker-react/hooks';
```

It returns an object with the following properties:

```ts
interface ArrayContextData<T> {
	array: T[]; // The array itself
	clear(): void; // Clears the array
	filter(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): void; // Filters the array
	find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined; // Finds an item in the array
	findIndex(predicate: (value: T) => boolean): number; // Finds the index of an item in the array
	insert(index: number, item: T): void; // Inserts an item at the specified index
	move(from: number, to: number): void; // Moves an item from one index to another
	pop(): T | undefined; // Removes the last item from the array
	push(...items: T[]): number; // Adds one or more items to the end of the array
	remove(index: number): void; // Removes an item at the specified index
	set(index: number, item: T): void; // Sets an item at the specified index
	shift(): T | undefined; // Removes the first item from the array
	sort(compareFn?: (a: T, b: T) => number): void; // Sorts the array
	swap(indexA: number, indexB: number): void; // Swaps two items in the array
	unshift(...items: T[]): number; // Adds one or more items to the beginning of the array
	update(index: number, item: T): void; // Updates an item at the specified index
}
```

## Example

```tsx
import { Button } from "@mui/material";
import React from 'react';
import {useArray} from 'iobroker-react/hooks';


const ExampleComponent: React.FC = () => {
	const {array, push, pop, shift, unshift, insert, remove, update, set, clear, swap, move, filter, find, findIndex, sort} = useArray(['a', 'b', 'c']);

	return (
		<div>
			<Button onClick={() => push('d')}>Push</Button>
			<Button onClick={() => pop()}>Pop</Button>
			<Button onClick={() => shift()}>Shift</Button>
			<Button onClick={() => unshift('d')}>Unshift</Button>
			<Button onClick={() => insert(1, 'd')}>Insert</Button>
			<Button onClick={() => remove(1)}>Remove</Button>
			<Button onClick={() => update(1, 'd')}>Update</Button>
			<Button onClick={() => set(1, 'd')}>Set</Button>
			<Button onClick={() => clear()}>Clear</Button>
			<Button onClick={() => swap(1, 2)}>Swap</Button>
			<Button onClick={() => move(1, 2)}>Move</Button>
			<Button onClick={() => filter((item) => item !== 'b')}>Filter</Button>
			<Button onClick={() => find((item) => item === 'b')}>Find</Button>
			<Button onClick={() => findIndex((item) => item === 'b')}>FindIndex</Button>
			<Button onClick={() => sort((a, b) => a.localeCompare(b))}>Sort</Button>
			<ul>
				{array.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
};
```
