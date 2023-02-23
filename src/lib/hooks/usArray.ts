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
	clear: () => void;
	filter: (predicate: (value: any) => unknown) => void;
	find: (predicate: (value: any) => boolean) => any;
	findIndex: (predicate: (value: any) => unknown) => number;
	insert: (index: number, item: any) => void;
	move: (from: number, to: number) => void;
	pop: () => void | undefined;
	push: (item: any) => void;
	remove: (index: number) => void;
	set: (items: any[]) => void;
	shift: () => void | undefined;
	sort: (compareFn: (a: any, b: any) => number) => void;
	swap: (indexA: number, indexB: number) => void;
	unshift: (item: any) => void;
	update: (index: number, item: any) => void;
}

export const useArray = (defaultValue: any[]): ArrayHookReturn => {
	const [array, setArray] = React.useState<any[]>(defaultValue);

	function clear(): void {
		setArray([]);
	}

	function filter(predicate: (value: any) => unknown): void {
		setArray((a) => {
			return a.filter(predicate);
		});
	}

	const find = (predicate: (value: any) => boolean): any => {
		return array.find(predicate);
	};

	const findIndex = (predicate: (value: any) => unknown): number => {
		return array.findIndex(predicate);
	};

	const insert = (index: number, item: any): void => {
		setArray((a) => [
			...a.slice(0, index),
			item,
			...a.slice(index, a.length),
		]);
	};

	const move = (from: number, to: number): void => {
		setArray((a) => {
			const element = a[from];
			const newArray = [...a];
			newArray.splice(from, 1);
			newArray.splice(to, 0, element);
			return newArray;
		});
	};

	const pop = (): void => {
		setArray((a) => [...a.slice(0, a.length - 1)]);
	};

	function push(item: any): void {
		setArray((a) => [...a, item]);
	}

	function remove(index: number): void {
		setArray((a) => [
			...a.slice(0, index),
			...a.slice(index + 1, a.length),
		]);
	}

	const shift = (): void => {
		setArray((a) => [...a.slice(1, a.length)]);
	};

	const sort = (compareFn: (a: any, b: any) => number): void => {
		setArray((a) => [...a].sort(compareFn));
	};

	const swap = (indexA: number, indexB: number): void => {
		setArray((a) => {
			const newArray = [...a];
			const temp = newArray[indexA];
			newArray[indexA] = newArray[indexB];
			newArray[indexB] = temp;
			return newArray;
		});
	};

	const unshift = (item: any): void => {
		setArray((a) => [item, ...a]);
	};

	const update = (index: number, item: any): void => {
		setArray((a) => [
			...a.slice(0, index),
			item,
			...a.slice(index + 1, a.length),
		]);
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
