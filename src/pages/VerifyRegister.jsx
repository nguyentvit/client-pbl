import React from 'react';

const VerifyEmailNotification = ({ onResendClick }) => {
  return (
    <div className="notification">
      <p>Vui lòng kiểm tra email của bạn để xác nhận địa chỉ email.</p>
      <p>Nếu bạn không nhận được email xác nhận, vui lòng kiểm tra thư mục spam hoặc nhấn vào đây để gửi lại.</p>
      <button onClick={onResendClick}>Gửi lại email xác nhận</button>
    </div>
  );
};

export default VerifyEmailNotification;
