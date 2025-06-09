'use client';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { handleScrollCheck } from '../utils/scroll';
import { PlaylistsItems } from '../channel/[name]/[id]/page';

const useScrollHandler = (
  containers: (HTMLDivElement | null)[],
  playlistsItems: PlaylistsItems[],
  setShowPrevButton: Dispatch<SetStateAction<boolean[]>>,
  setShowNextButton: Dispatch<SetStateAction<boolean[]>>
) => {
  useEffect(() => {
    if (!playlistsItems || !containers.length) return;

    const listeners: (() => void)[] = [];

    playlistsItems.forEach((_, index) => {
      const container = containers[index];
      
      if (!container) return;

      const handleScroll = () => {
        handleScrollCheck(container, index, setShowPrevButton, setShowNextButton);
      };

      container.addEventListener('scroll', handleScroll);

      handleScroll(); 

      listeners.push(() => container.removeEventListener('scroll', handleScroll));
    });

    return () => {
      listeners.forEach(remove => remove());
    };
  }, [containers, playlistsItems, setShowPrevButton, setShowNextButton]);
};

export default useScrollHandler;