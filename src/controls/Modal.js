import clsx from 'clsx';
import styles from '../../styles/Modal.module.css';

const Modal = ({ className, closeButtonClassName, open, onClose, children }) => {
  return (
    <div className={clsx(styles.modal, open && styles.open)}>
      <section className={clsx(className, styles.modalMain)}>
        <div className={styles.modalBody}>
          {children}
          <button className={clsx(styles.modalClose, closeButtonClassName)} type="button" onClick={onClose}>
            &#10006; Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;