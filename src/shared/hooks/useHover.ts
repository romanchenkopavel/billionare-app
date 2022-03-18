import { useEffect, MutableRefObject, useState, useRef } from 'react';

type Hoverabele<T> = [MutableRefObject<T>, boolean];

function useHover<T>(): Hoverabele<T> {
  const [value, setValue] = useState<boolean>(false);
  const elRef: any = useRef<T | null>(null);

  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);

  function handleHover() {
    const node = elRef.current;

    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }

    return undefined;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleHover, [elRef.current]);
  return [elRef, value];
}

export default useHover;
