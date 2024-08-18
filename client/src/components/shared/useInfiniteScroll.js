import { useState, useEffect, useCallback, useRef } from 'react';

const useInfiniteScroll = (items, itemsPerPage = 50) => {
    const scrollRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState(items.slice(0, itemsPerPage));
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreItems = useCallback(() => {
        console.log('loadMoreItems isLoading', isLoading);
        if (isLoading) return;

        setIsLoading(true);
        setVisibleItems((prevVisibleItems) => {
            const nextItems = items.slice(prevVisibleItems.length, prevVisibleItems.length + itemsPerPage);
            return [...prevVisibleItems, ...nextItems];
        });
        setIsLoading(false);
    }, [items, isLoading, itemsPerPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

            const BUFFER = 200

            if (scrollTop + clientHeight + BUFFER >= scrollHeight) {
                loadMoreItems();
            }
        };

        const element = scrollRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loadMoreItems, scrollRef]);


    useEffect(() => {
        if (!items.length || items.length <= itemsPerPage) {
            setVisibleItems(items)
        }

        if (items.length && !visibleItems.length) {
            loadMoreItems();
        }
    }, [loadMoreItems, itemsPerPage, items, visibleItems.length]);

    return { scrollRef, visibleItems, isLoading };
};

export default useInfiniteScroll;
