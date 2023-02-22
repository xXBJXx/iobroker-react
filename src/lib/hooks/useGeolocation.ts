import React from "react";

/**
 * import { useGeolocation } from "iobroker-react/hooks";
 *
 * const MyComponent = () => {
 * 	const { loading, error, coords, timestamp } = useGeolocation();
 *
 * 	if (loading) {
 * 		return <Typography>Loading...</Typography>;
 * 	}
 *
 * 	if (error) {
 * 		return <Typography>Error: {error}</Typography>;
 * 	}
 *
 * 	return (
 * 		<>
 * 			<Typography>
 * 				coords: {coords?.latitude}, {coords?.longitude}
 * 			</Typography>
 * 			<Typography>timestamp {timestamp}</Typography>
 * 			<Typography>
 * 				timestamp as Date {new Date(timestamp || 0).toLocaleString()}
 * 			</Typography>
 * 		</>
 * 	);
 * };
 */

interface PositionOptions {
	enableHighAccuracy?: boolean;
	maximumAge?: number;
	timeout?: number;
}

interface GeolocationPositionError {
	code: number;
	message: string;
}

type EpochTimeStamp = number;

interface UseGeolocationReturnType {
	loading: boolean;
	error: GeolocationPositionError | null | undefined;
	coords?: GeolocationCoordinates;
	timestamp?: EpochTimeStamp;
}

export const useGeolocation = (
	options?: PositionOptions,
): UseGeolocationReturnType => {
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<
		GeolocationPositionError | null | undefined
	>();
	const [coords, setCoords] = React.useState<GeolocationCoordinates>();
	const [timestamp, setTimestamp] = React.useState<EpochTimeStamp>();

	React.useEffect(() => {
		const successHandler = (position: GeolocationPosition): void => {
			setLoading(false);
			setError(null);
			setCoords(position.coords);
			setTimestamp(position.timestamp);
		};
		const errorHandler = (
			positionError: GeolocationPositionError,
		): void => {
			setError(positionError);
			setLoading(false);
		};
		navigator.geolocation.getCurrentPosition(
			successHandler,
			errorHandler,
			options,
		);
		const id = navigator.geolocation.watchPosition(
			successHandler,
			errorHandler,
			options,
		);
		return () => navigator.geolocation.clearWatch(id);
	}, [options]);

	return { loading, error, coords, timestamp };
};
