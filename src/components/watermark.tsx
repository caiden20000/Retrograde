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
      <div className="version">v0.1.0</div>
    </div>
  );
}
