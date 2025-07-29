import { ReactNode } from "react";
import { createPortal } from "react-dom";
import "../styles/modal.css";

export function Modal({
  children,
  goButton,
  stopButton,
}: {
  children: ReactNode;
  goButton: string;
  stopButton: string;
}) {
  function stopPressed() {}

  function goPressed() {}

  return createPortal(
    <div className="modal-background" onClick={stopPressed}>
      <div className="modal-container">
        <div className="modal-body">{children}</div>
        <div className="modal-buttons">
          <button className="gobutton" onClick={goPressed}>
            {goButton}
          </button>
          <button className="stopbutton" onClick={stopPressed}>
            {stopButton}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
