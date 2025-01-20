import {RefObject, useEffect} from "react";

const useClickOutside = (
    containerRef: RefObject<HTMLDivElement>,
    action: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                action();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [action, containerRef]);
}

export default useClickOutside;