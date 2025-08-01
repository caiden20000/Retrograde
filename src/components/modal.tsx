import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/modal.css";

export type ModalButton = { text: string; color: string };

export function Modal({
  children,
  onSelect,
  buttons,
}: {
  children: ReactNode;
  onSelect: (value: number) => void;
  buttons: ModalButton[];
}) {
  return createPortal(
    <div className="modal-background" onClick={() => onSelect(-1)}>
      <div className="modal-container">
        <div className="modal-body">{children}</div>
        <div className="modal-buttons">
          {buttons.map((btn, index) => (
            <button
              key={btn.text}
              style={{ background: btn.color }}
              onClick={() => onSelect(index)}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
