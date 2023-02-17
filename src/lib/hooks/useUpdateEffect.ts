import React from "react";

export const useUpdateEffect = (
	effect: () => void,
	dependencies: unknown[],
): void => {
	const firstRenderRef = React.useRef(true);

	React.useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		return effect();
	}, [dependencies]);
};
