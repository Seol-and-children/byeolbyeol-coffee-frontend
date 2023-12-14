import React from 'react';
import styles from './modal.module.css'

function Modal({ show, onClose, bio, setBio, onSave, content }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
        <div className={styles.modaloverlay} onClick={onClose}></div>
      <div className={styles.modalcontent} onClick={e => e.stopPropagation()}>
        {content}
        <span className={styles.close} onClick={onClose}>&times;</span>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
        <button onClick={onSave}>저장하기</button>
      </div>
    </div>
  );
}

export default Modal;
