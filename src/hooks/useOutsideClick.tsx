import { useEffect, RefObject } from "react";

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  onOutsideClick: () => void;
}

const useOutsideClick = ({ ref, onOutsideClick }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;
