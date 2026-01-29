import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update visibility based on whether element is in view
                // This will trigger animation every time element enters/exits viewport
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return { ref, isVisible };
}

// Stagger animation for lists - resets when container leaves viewport
export function useStaggerAnimation(itemCount, baseDelay = 100) {
    const [visibleItems, setVisibleItems] = useState([]);
    const [isContainerVisible, setIsContainerVisible] = useState(false);
    const containerRef = useRef(null);
    const timeoutsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsContainerVisible(true);
                    // Clear any existing timeouts
                    timeoutsRef.current.forEach(clearTimeout);
                    timeoutsRef.current = [];

                    // Reset and stagger the appearance of items
                    setVisibleItems([]);
                    for (let i = 0; i < itemCount; i++) {
                        const timeout = setTimeout(() => {
                            setVisibleItems((prev) => [...prev, i]);
                        }, i * baseDelay);
                        timeoutsRef.current.push(timeout);
                    }
                } else {
                    // Reset when leaving viewport
                    setIsContainerVisible(false);
                    setVisibleItems([]);
                    timeoutsRef.current.forEach(clearTimeout);
                    timeoutsRef.current = [];
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, [itemCount, baseDelay]);

    return { containerRef, visibleItems, isContainerVisible };
}
