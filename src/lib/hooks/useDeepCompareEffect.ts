import isEqual from "lodash/fp/isEqual";
import React from "react";

export const useDeepCompareEffect = (
	callback: () => void,
	dependencies: unknown[],
): void => {
	const currentDependenciesRef = React.useRef<any[] | undefined>();

	if (!isEqual(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies;
	}

	React.useEffect(callback, [currentDependenciesRef.current]);
};
