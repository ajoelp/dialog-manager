import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

export function Portal(props: PortalProps) {
  const { children } = props;
  const node = useRef<HTMLDivElement>();

  if (!node.current) {
    node.current = document.createElement('div');
    document.body.appendChild(node.current);
  }

  useEffect(() => {
    return () => {
      if (node.current) {
        document.body.removeChild(node.current);
      }
      node.current = undefined;
    };
  }, []);

  return createPortal(children, node.current);
}
