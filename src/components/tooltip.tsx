import { ReactNode, useEffect, useRef, useState } from "react";
import "../styles/tooltip.css";
import { createPortal } from "react-dom";

export function Tooltip({
  text,
  children,
}: {
  readonly text: string;
  readonly children: ReactNode;
}) {
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (hovering && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [hovering]);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>
      {hovering &&
        createPortal(
          <div
            className={"tooltip-text" + (hovering ? " tooltip-visible" : "")}
            style={{
              top: coords.top - 30,
              left: coords.left - 60,
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}
