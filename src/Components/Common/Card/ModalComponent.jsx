import React from "react";
import "./ModalComponent.css";

const ModalComponent = ({ onClose, show, children }) => {
  const Close = (e) => {
    onClose && onClose(e);
  };

  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        <img
          src="btn-close.png"
          className="closeBtn"
          alt="close"
          onClick={() => Close()}
        />
        {children}
      </section>
    </div>
  );
};
export default ModalComponent;
