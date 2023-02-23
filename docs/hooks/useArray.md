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
	filter(predicate: (value: any) => unknown): void; // Filters the array
	find(predicate: (value: any) => boolean): any; // Finds an item in the array
	findIndex(predicate: (value: T) => unknown): number; // Finds the index of an item in the array
	insert(index: number, item: T): void; // Inserts an item at the specified index
	move(from: number, to: number): void; // Moves an item from one index to another
	pop(): T | undefined; // Removes the last item from the array
	push(item: T): void; // Adds an item to the end of the array
	remove(index: number): void; // Removes an item at the specified index
	set(items: T[]): void; // Sets the array to the specified items
	shift(): T | undefined; // Removes the first item from the array
	sort(compareFn?: (a: T, b: T) => number): void; // Sorts the array
	swap(indexA: number, indexB: number): void; // Swaps two items in the array
	unshift(item: T): number; // Adds an item to the beginning of the array
	update(index: number, item: T): void; // Updates an item at the specified index
}
```
 
## Example Single State

```tsx
import { Button } from "@mui/material";
import React from 'react';
import {useArray} from 'iobroker-react/hooks';


const ExampleComponent: React.FC = () => {
	const { array, push, remove, update, set, clear } = useArray([
		"a",
		"b",
		"c",
	]);

	return (
		<div>
			<Button onClick={() => push("d")}>Push</Button>
			<Button onClick={() => remove(1)}>Remove</Button>
			<Button onClick={() => update(1, "d")}>Update</Button>
			<Button onClick={() => set(["d", "e", "f"])}>Set</Button>
			<Button onClick={() => clear()}>Clear</Button>
			<Typography component={"ul"}>
				{array.map((item, index) => (
					<Typography component={"li"} key={index}>
						{item}
					</Typography>
				))}
			</Typography>
		</div>
	);
};
```

## Example Multiple States

```tsx
import { Button } from "@mui/material";
import React from 'react';
import {useArray} from 'iobroker-react/hooks';


const ExampleComponent: React.FC = () => {
	const { array: array1, push: push1, remove: remove1, update: update1, set: set1, clear: clear1 } = useArray([
		"a",
		"b",
		"c",
	]);
	const { array: array2, push: push2, remove: remove2, update: update2, set: set2, clear: clear2 } = useArray([
		"f",
		"w",
		"r",
	]);

	return (
		<div>
			<Button onClick={() => push1("d")}>Push 1</Button>
			<Button onClick={() => remove1(1)}>Remove 1</Button>
			<Button onClick={() => update1(1, "d")}>Update 1</Button>
			<Button onClick={() => set1(["d", "e", "f"])}>Set 1</Button>
			<Button onClick={() => clear1()}>Clear 1</Button>
			<Typography component={"ul"}>
				{array1.map((item, index) => (
					<Typography component={"li"} key={index}>
						{item}
					</Typography>
				))}
			</Typography>
			<Button onClick={() => push2("d")}>Push 2</Button>
			<Button onClick={() => remove2(1)}>Remove 2</Button>
			<Button onClick={() => update2(1, "d")}>Update 2</Button>
			<Button onClick={() => set2(["e", "r", "w"])}>Set 2</Button>
			<Button onClick={() => clear2()}>Clear 2</Button>
			<Typography component={"ul"}>
				{array2.map((item, index) => (
					<Typography component={"li"} key={index}>
						{item}
					</Typography>
				))}
			</Typography>
		</div>
	);
};
```




