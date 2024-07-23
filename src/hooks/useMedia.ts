import { useEffect, useState } from 'react';

const getInitialState = (query: string, defaultState?: boolean) => {
	// Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
	if (defaultState !== undefined) {
		return defaultState;
	}

	if (typeof window !== 'undefined') {
		return window.matchMedia(query).matches;
	}

	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			'`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches',
		);
	}

	return false;
};

export const useMedia = (query: string, defaultState?: boolean) => {
	const [state, setState] = useState(getInitialState(query, defaultState));

	useEffect(() => {
		let mounted = true;
		const mediaQueryList = window.matchMedia(query);

		const onChange = () => {
			if (!mounted) return;

			setState(!!mediaQueryList.matches);
		};

		mediaQueryList.addEventListener('change', onChange);
		setState(mediaQueryList.matches);

		return () => {
			mounted = false;
			mediaQueryList.removeEventListener('change', onChange);
		};
	}, [query]);

	return state;
};
