import React, { useCallback } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../controls/Modal';
import { restart, reset } from '../features/main/mainSlice'
import css from '../../styles/ResultModal.module.css';

function ResultModal({open, onClose, onRestart}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const accuracy = useSelector(state => state.main.accuracy);
  const speed = useSelector(state => state.main.speed);
  const handleHomeClick = useCallback(() => {
    onClose();
    dispatch(reset());
    router.push('/');
  }, [onClose, router, dispatch]);
  return (
    <Modal className={css.modal} open={open}>
      <h1 className={css.title}>Typing Result</h1>
      <div className={css.content}>
        <div>
          <label>Accuracy: </label> {accuracy.toFixed(2)}
        </div>
        <div>
          <label>Speed (characters per second): </label> {speed.toFixed(2)}
        </div>
      </div>
      <div className={css.buttons}>
        <button className={css.continueButton} onClick={handleHomeClick}>
          Return To Home
        </button>
      </div>
    </Modal>
  );
}

export default ResultModal;
