import { Dispatch, SetStateAction } from 'react';

export const handleScroll = (container: HTMLDivElement, direction: 'left' | 'right') => {
  if (!container) return;

  const scrollBy = container.clientWidth * 0.6;
  const maxScroll = container.scrollWidth - container.clientWidth;

  if (direction === 'right') {
    const remainingScroll = maxScroll - container.scrollLeft;

    const scrollDistance = remainingScroll < scrollBy ? remainingScroll : scrollBy;

    container.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  }

  if (direction === 'left') {
    const scrollDistance = container.scrollLeft < scrollBy ? container.scrollLeft : scrollBy;

    container.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  }
};

export const handleScrollCheck = (container: HTMLDivElement, index: number, setShowPrevButton: Dispatch<SetStateAction<boolean[]>>, setShowNextButton: Dispatch<SetStateAction<boolean[]>>) => {
  if (!container) return;

  const atStart = container.scrollLeft <= 5;
  const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

  setShowPrevButton(prev => {
    const updated = [...prev];
    updated[index] = !atStart;
    return updated;
  });

  setShowNextButton(prev => {
    const updated = [...prev];
    updated[index] = !atEnd;
    return updated;
  });
};