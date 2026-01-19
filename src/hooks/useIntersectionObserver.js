import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = {}) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Optional: stop observing once visible (good for lazy loading images)
                if (elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            }
        }, {
            root: null,
            rootMargin: '50px', // Preload slightly before view
            threshold: 0.1,
            ...options
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [options]);

    return { elementRef, isVisible };
};

export default useIntersectionObserver;
