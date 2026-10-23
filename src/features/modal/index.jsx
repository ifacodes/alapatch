import { useRef, useEffect } from 'react';

const Modal = ({ children, show, setShow }) => {
  const node = useRef();
  const modalDisplay = show ? 'modal modal-display' : 'modal modal-hide';

  useEffect(() => {
    const current = node.current;

    const handleOutsideClick = (event) => {
      console.log('clicking anywhere');
      if (current.contains(event.target)) {
        return;
      } else setShow();
    };

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, setShow]);

  return (
    <div ref={node} className={modalDisplay}>
      {children}
    </div>
  );
};

export default Modal;
