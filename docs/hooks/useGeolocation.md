# `useGeolocation` hook

This hook provides the current geolocation of the user.

```ts
import { useGeolocation } from "iobroker-react/hooks";
```

The `useGeolocation` hook allows you to get the current geolocation of the user. It returns an object with the following properties:

```ts
interface PositionOptions {
	enableHighAccuracy?: boolean;
	maximumAge?: number; 
	timeout?: number;
}

function useGeolocation(options?: PositionOptions): {
	loading: boolean;
	error: string | null;
	coords?: GeolocationCoordinates;
	timestamp?: number;
}

interface GeolocationCoordinates {
	latitude: number;
	longitude: number;
	altitude?: number;
	accuracy: number;
	altitudeAccuracy?: number;
	heading?: number;
	speed?: number;
}
```

## Example

```tsx
import { useGeolocation } from "iobroker-react/hooks";

const MyComponent = () => {
	const { loading, error, coords, timestamp } = useGeolocation();

	if (loading) {
		return <Typography>Loading...</Typography>;
	}

	if (error) {
		return <Typography>Error: {error}</Typography>;
	}

	return (
		<>
			<Typography>
				coords: {coords?.latitude}, {coords?.longitude}
			</Typography>
			<Typography>timestamp {timestamp}</Typography>
			<Typography>
				timestamp as Date {new Date(timestamp || 0).toLocaleString()}
			</Typography>
		</>
	);
};
```
