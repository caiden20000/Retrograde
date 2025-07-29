import { useAppDispatch } from "../state/hooks";
import { setScreen } from "../state/slices/currentScreenSlice";
import { ScreenType } from "../types/ScreenType";

export function ScreenNavButton({
  navScreen,
  screen,
  title,
}: {
  readonly navScreen: ScreenType;
  readonly screen: ScreenType;
  readonly title: string;
}) {
  const dispatch = useAppDispatch();
  return (
    <button
      className={screen == navScreen ? "selected" : ""}
      onClick={() => dispatch(setScreen(navScreen))}
    >
      {title}
    </button>
  );
}
