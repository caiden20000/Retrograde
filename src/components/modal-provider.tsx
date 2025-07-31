import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Modal, ModalButton } from "./modal";

type ModalState = {
  children: ReactNode;
  buttons: ModalButton[];
  resolve: ((value: number | PromiseLike<number>) => void) | null;
};

const defaultYesNoButtons: ModalButton[] = [
  { text: "No", color: "#f002" },
  { text: "Yes", color: "#0f02" },
];

type ModalContextType = {
  queryModalYesNo: (children: ReactNode) => Promise<number>;
  queryModal: (children: ReactNode, buttons: ModalButton[]) => Promise<number>;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const queryModal = useCallback(
    (chldrn: ReactNode, buttons: ModalButton[]) => {
      const newPromise = new Promise<number>((resolve) => {
        setModalState({
          children: chldrn,
          buttons: buttons,
          resolve,
        });
      });
      return newPromise;
    },
    [setModalState]
  );

  const queryModalYesNo = (chldrn: ReactNode) =>
    queryModal(chldrn, defaultYesNoButtons);

  const modalResponse = useCallback(
    (value: number) => {
      if (!modalState || !modalState.resolve) return;
      modalState.resolve(value);
      setModalState(null);
    },
    [modalState, setModalState]
  );

  return (
    <ModalContext.Provider value={{ queryModalYesNo, queryModal }}>
      {children}
      {modalState !== null && (
        <Modal
          onSelect={(value: number) => modalResponse(value)}
          buttons={modalState.buttons}
        >
          {modalState.children}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

/** Returns a promise with the index of the button pressed. */
export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (ctx === null) throw new Error("Empty context");
  return ctx;
};
