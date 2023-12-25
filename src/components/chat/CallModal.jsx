import React from 'react';

const CallModal = ({ isCalling, onClose, myVideo, userVideo, handleAnswer, handleReject, ...props }) => {
  const handleClose = () => {
    // Đóng modal
    onClose();
    if (myVideo && myVideo.current) {
      myVideo.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  if (!isCalling) return null;

  return (
    <div className="call-modal-overlay">
      <div className="call-modal">
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default CallModal;
