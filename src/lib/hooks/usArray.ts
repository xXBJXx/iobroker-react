import React from "react";

/**
 * @example Single State
 * import { Button } from "@mui/material";
 * import React from 'react';
 * import {useArray} from 'iobroker-react/hooks';
 *
 *
 * const ExampleComponent: React.FC = () => {
 * 	const { array, push, remove, update, set, clear } = useArray([
 * 		"a",
 * 		"b",
 * 		"c",
 * 	]);
 *
 * 	return (
 * 		<div>
 * 			<Button onClick={() => push("d")}>Push</Button>
 * 			<Button onClick={() => remove(1)}>Remove</Button>
 * 			<Button onClick={() => update(1, "d")}>Update</Button>
 * 			<Button onClick={() => set(["d", "e", "f"])}>Set</Button>
 * 			<Button onClick={() => clear()}>Clear</Button>
 * 			<Typography component={"ul"}>
 * 				{array.map((item, index) => (
 * 					<Typography component={"li"} key={index}>
 * 						{item}
 * 					</Typography>
 * 				))}
 * 			</Typography>
 * 		</div>
 * 	);
 * };
 *
 * @example Multiple States
 * import { Button } from "@mui/material";
 * import React from 'react';
 * import {useArray} from 'iobroker-react/hooks';
 *
 * const ExampleComponent: React.FC = () => {
 * 	const {
 * 		array: myArray1,
 * 		push: myArrayPush1,
 * 		remove: myArrayRemove1,
 * 		update: myArrayUpdate1,
 * 		set: myArraySet1,
 * 		clear: myArrayClear1,
 * 	} = useArray(["a", "b", "c"]);
 *
 * 	const {
 * 		array: myArray2,
 * 		push: myArrayPush2,
 * 		remove: myArrayRemove2,
 * 		update: myArrayUpdate2,
 * 		set: myArraySet2,
 * 		clear: myArrayClear2,
 * 	} = useArray(["5", "3", "4"]);
 *
 * 	return (
 * 		<>
 * 			<Button onClick={() => myArrayPush1("d")}>Push</Button>
 * 			<Button onClick={() => myArrayRemove1(1)}>Remove</Button>
 * 			<Button onClick={() => myArrayUpdate1(1, "d")}>Update</Button>
 * 			<Button onClick={() => myArraySet1(["d", "e", "f"])}>Set</Button>
 * 			<Button onClick={() => myArrayClear1()}>Clear</Button>
 * 			<Typography component={"ul"}>
 * 				{myArray1.map((item, index) => (
 * 					<Typography component={"li"} key={index}>
 * 						{item}
 * 					</Typography>
 * 				))}
 * 			</Typography>
 *
 * 			<br />
 *
 * 			<Button onClick={() => myArrayPush2("1")}>my Push</Button>
 * 			<Button onClick={() => myArrayRemove2(1)}>my Remove</Button>
 * 			<Button onClick={() => myArrayUpdate2(1, "1")}>my Update</Button>
 * 			<Button onClick={() => myArraySet2(["1", "2", "3"])}>my Set</Button>
 * 			<Button onClick={() => myArrayClear2()}>my Clear</Button>
 * 			<Typography component={"ul"}>
 * 				{myArray2.map((item, index) => (
 * 					<Typography component={"li"} key={index}>
 * 						{item}
 * 					</Typography>
 * 				))}
 * 			</Typography>
 * 		</>
 * 	);
 * 	}
 */

interface ArrayHookReturn {
	array: any[];
	clear: () => any[];
	filter: (predicate: (value: any) => unknown) => any[];
	find: (predicate: (value: any) => boolean) => any[];
	findIndex: (predicate: (value: any) => unknown) => number;
	insert: (index: number, item: any) => any[];
	move: (from: number, to: number) => any[];
	pop: () => any[];
	push: (item: any) => any[];
	remove: (index: number) => any[];
	set: (items: any[]) => void;
	shift: () => any[];
	sort: (compareFn: (a: any, b: any) => number) => any[];
	swap: (indexA: number, indexB: number) => any[];
	unshift: (item: any) => any[];
	update: (index: number, item: any) => any[];
}

export const useArray = (defaultValue: any[]): ArrayHookReturn => {
	const [array, setArray] = React.useState<any[]>(defaultValue);

	function clear(): any[] {
		setArray([]);
		return [];
	}

	function filter(predicate: (value: any) => unknown): any[] {
		const newArray = array.filter(predicate);
		setArray(newArray);
		return newArray;
	}

	const find = (predicate: (value: any) => boolean): any => {
		return array.find(predicate);
	};

	const findIndex = (predicate: (value: any) => unknown): number => {
		return array.findIndex(predicate);
	};

	const insert = (index: number, item: any): any[] => {
		const newArray = [...array];
		newArray.splice(index, 0, item);
		setArray(newArray);
		return newArray;
	};

	const move = (from: number, to: number): any[] => {
		const newArray = [...array];
		const element = newArray[from];
		newArray.splice(from, 1);
		newArray.splice(to, 0, element);
		setArray(newArray);
		return newArray;
	};

	const pop = (): any[] => {
		const newArray = [...array];
		newArray.pop();
		setArray(newArray);
		return newArray;
	};

	function push(item: any): any[] {
		const newArray = [...array, item];
		setArray((a) => [...a, item]);
		return newArray;
	}

	function remove(index: number): any[] {
		const newArray = [...array];
		newArray.splice(index, 1);
		setArray(newArray);
		return newArray;
	}

	const shift = (): any[] => {
		const newArray = [...array];
		newArray.shift();
		setArray(newArray);
		return newArray;
	};

	const sort = (compareFn: (a: any, b: any) => number): any[] => {
		const newArray = [...array];
		newArray.sort(compareFn);
		setArray(newArray);
		return newArray;
	};

	const swap = (indexA: number, indexB: number): any[] => {
		const newArray = [...array];
		const temp = newArray[indexA];
		newArray[indexA] = newArray[indexB];
		newArray[indexB] = temp;
		setArray(newArray);
		return newArray;
	};

	const unshift = (item: any): any[] => {
		const newArray = [item, ...array];
		setArray(newArray);
		return newArray;
	};

	const update = (index: number, item: any): any[] => {
		const newArray = [...array];
		newArray[index] = item;
		setArray(newArray);
		return newArray;
	};

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
