import React from "react";

/**
 * import { Button } from "@mui/material";
 * import React from 'react';
 * import {useArray} from 'iobroker-react/hooks';
 *
 *
 * const ExampleComponent: React.FC = () => {
 * 	const {array, push, pop, shift, unshift, insert, remove, update, set, clear, swap, move, filter, find, findIndex, sort} = useArray(['a', 'b', 'c']);
 *
 * 	return (
 * 		<div>
 * 			<Button onClick={() => push('d')}>Push</Button>
 * 			<Button onClick={() => pop()}>Pop</Button>
 * 			<Button onClick={() => shift()}>Shift</Button>
 * 			<Button onClick={() => unshift('d')}>Unshift</Button>
 * 			<Button onClick={() => insert(1, 'd')}>Insert</Button>
 * 			<Button onClick={() => remove(1)}>Remove</Button>
 * 			<Button onClick={() => update(1, 'd')}>Update</Button>
 * 			<Button onClick={() => set(1, 'd')}>Set</Button>
 * 			<Button onClick={() => clear()}>Clear</Button>
 * 			<Button onClick={() => swap(1, 2)}>Swap</Button>
 * 			<Button onClick={() => move(1, 2)}>Move</Button>
 * 			<Button onClick={() => filter((item) => item !== 'b')}>Filter</Button>
 * 			<Button onClick={() => find((item) => item === 'b')}>Find</Button>
 * 			<Button onClick={() => findIndex((item) => item === 'b')}>FindIndex</Button>
 * 			<Button onClick={() => sort((a, b) => a.localeCompare(b))}>Sort</Button>
 * 			<ul>
 * 				{array.map((item, index) => (
 * 					<li key={index}>{item}</li>
 * 				))}
 * 			</ul>
 * 		</div>
 * 	);
 * };
 */

interface ArrayHookReturn {
	array: any[];
	set: (value: any[]) => void;
	push: (element: any) => void;
	filter: (callback: (value: any) => void) => void;
	update: (index: number, newElement: any) => void;
	insert: (index: number, newElement: any) => void;
	remove: (index: number) => void;
	clear: () => void;
	move: (from: number, to: number) => void;
	swap: (indexA: number, indexB: number) => void;
	sort: (compareFunction: (a: any, b: any) => number) => void;
	findIndex: (callback: (value: any) => void) => number;
	pop: () => void;
	shift: () => void;
	unshift: (element: any) => void;
	find: (callback: (value: any) => void) => any;
}

export const useArray = (defaultValue: any): ArrayHookReturn => {
	const [array, setArray] = React.useState(defaultValue);

	function push(element: any): void {
		setArray((a: any) => [...a, element]);
	}

	function filter(callback: (a: any) => void): void {
		setArray((a: any[]) => {
			return a.filter(callback);
		});
	}

	const update = (index: number, newElement: any): void => {
		setArray((a: any[]) => [
			...a.slice(0, index),
			newElement,
			...a.slice(index + 1, a.length),
		]);
	};

	const insert = (index: number, newElement: any): void => {
		setArray((a: any[]) => [
			...a.slice(0, index),
			newElement,
			...a.slice(index, a.length),
		]);
	};

	const pop = (): void => {
		setArray((a: any[]) => [...a.slice(0, a.length - 1)]);
	};

	function remove(index: number): void {
		setArray((a: any[]) => [
			...a.slice(0, index),
			...a.slice(index + 1, a.length),
		]);
	}

	const shift = (): void => {
		setArray((a: any[]) => [...a.slice(1, a.length)]);
	};

	const unshift = (element: any): void => {
		setArray((a: any[]) => [element, ...a]);
	};

	const move = (from: number, to: number): void => {
		setArray((a: any[]) => {
			const element = a[from];
			const newArray = [...a];
			newArray.splice(from, 1);
			newArray.splice(to, 0, element);
			return newArray;
		});
	};
	const swap = (indexA: number, indexB: number): void => {
		setArray((a: any[]) => {
			const newArray = [...a];
			const temp = newArray[indexA];
			newArray[indexA] = newArray[indexB];
			newArray[indexB] = temp;
			return newArray;
		});
	};

	const sort = (compareFunction: (a: any, b: any) => number): void => {
		setArray((a: any[]) => [...a].sort(compareFunction));
	};

	const findIndex = (callback: (a: any) => void): number => {
		return array.findIndex(callback);
	};

	const find = (callback: (a: any) => void): any => {
		return array.find(callback);
	};

	function clear(): void {
		setArray([]);
	}

	return {
		array,
		clear,
		filter,
		find,
		findIndex,
		insert,
		move,
		pop,
		push,
		remove,
		set: setArray,
		shift,
		sort,
		swap,
		unshift,
		update,
	};
};
