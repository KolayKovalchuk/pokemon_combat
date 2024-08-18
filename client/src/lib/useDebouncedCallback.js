import { useCallback, useRef } from 'react';

/**
 * A custom hook that debounces a callback function.
 *
 * @param callback - The function to be debounced.
 * @param delay - The debounce delay in milliseconds.
 * @returns A debounced version of the provided callback function.
 */
function useDebouncedCallback(callback, delay) {
    const timerRef = useRef(null);

    return useCallback((...args) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}

export default useDebouncedCallback;
