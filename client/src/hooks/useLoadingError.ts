import { useState } from "react";

export function useLoadingError(initLoading: boolean, initError: boolean) {
	const [loading, setLoading] = useState(initLoading);
	const [error, setError] = useState(initError);

	return {
		loading,
		setLoading,
		error,
		setError,
	};
}
