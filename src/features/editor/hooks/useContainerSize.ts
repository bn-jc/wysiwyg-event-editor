import { useState, useEffect, type RefObject } from 'react';

export type ContainerMode = 'wide' | 'compact' | 'mobile';

interface UseContainerSizeResult {
    width: number;
    height: number;
    mode: ContainerMode;
}

export const useContainerSize = (ref: RefObject<HTMLElement>): UseContainerSizeResult => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) return;

        const updateSize = () => {
            if (ref.current) {
                setSize({
                    width: ref.current.clientWidth,
                    height: ref.current.clientHeight
                });
            }
        };

        const observer = new ResizeObserver(updateSize);
        observer.observe(ref.current);

        // Initial size
        updateSize();

        return () => observer.disconnect();
    }, [ref]);

    let mode: ContainerMode = 'wide';
    if (size.width < 640) {
        mode = 'mobile';
    } else if (size.width < 1024) {
        mode = 'compact';
    }

    return { ...size, mode };
};
