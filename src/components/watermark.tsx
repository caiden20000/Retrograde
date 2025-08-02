import { VERSION } from "../constants/version";
import "../styles/watermark.css";

export function Watermark() {
  return (
    <div className="watermark">
      <img
        src="./Retrograde_Logo.png"
        alt="Retrograde Logo"
        className="logo"
        width={32}
      />
      <div className="title">Retrograde</div>
      <div className="version">{VERSION}</div>
    </div>
  );
}
