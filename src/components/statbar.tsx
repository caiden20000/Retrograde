export function Statbar({
  percentage,
  backgroundColor = "red",
  barColor = "black",
}: {
  readonly percentage: number;
  readonly backgroundColor: string;
  readonly barColor: string;
}) {
  return (
    <div className="statbar" style={{ backgroundColor: backgroundColor }}>
      <div
        className="statbar-fill"
        style={{ backgroundColor: barColor, width: percentage * 100 + "%" }}
      ></div>
    </div>
  );
}

// Fuel: <Statbar backgroundColor="rgb(211, 211, 211)" barColor="rgb(224, 218, 104)" percentage={} />
// Distance: <Statbar backgroundColor="rgb(51, 50, 68)" barColor="rgb(110, 115, 242)" percentage={} />
