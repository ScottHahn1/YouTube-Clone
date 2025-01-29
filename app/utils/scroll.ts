import { Dispatch, SetStateAction } from "react";

interface Props {
    container: HTMLDivElement | null;
    direction: string;
    index: number;
    setNextButtonPressed: Dispatch<SetStateAction<boolean>>;
}

export const handleScroll = ({ container, direction, index, setNextButtonPressed } : Props) => {
    if (container) {
        const scrollAmount = 1200; 
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth', 
        });
    }
    if (direction === 'right') {
        setNextButtonPressed(true);
    }

    if (container?.scrollLeft === 0) {
        setNextButtonPressed(false);
    }
};