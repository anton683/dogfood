import cn from 'classnames';
import s from './styles.module.css';
import { createPortal } from 'react-dom';
import { useRef } from 'react';

function Modal({ children, isOpen, onClose }) {
    const refModal = useRef(null)

    const renderContent = () => {
        if (!isOpen) return null
        return (<div ref={refModal} className={cn(s.modal, { [s.modal_active]: isOpen })} onMouseDown={onClose}>
            <div className={cn(s.modal__content, { [s.modal__content_active]: isOpen })} onMouseDown={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>);
    }

    return createPortal(renderContent(), document.getElementById('modal-root'));
}

export default Modal;