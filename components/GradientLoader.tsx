import { useEffect, useState } from "react";
import { useTheme } from '../components/ThemeContext';
import {useTranslation} from "react-i18next";


const TIMER = 150;
const TRANSITION = 0.5;
const DEF_SIZE = 60;
const GUTTER = 5;

const initialState = {
  positions: {
    1: "alpha",
    2: "bravo",
    3: "charlie",
    4: null,
    5: "delta",
    6: "echo",
    7: "foxtrot",
  },
  stateNumber: 0,
};

function GradientLoader({size = 100, center = true, openWallet = null}: { size?: number; center?: boolean ; openWallet: () => void;}) {
  const [positions, setPositions] = useState(initialState.positions);
  const [stateNumber, setStateNumber] = useState(initialState.stateNumber);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    const interval = setInterval(setNextState, TIMER);
    return () => clearInterval(interval);
  }, [positions, stateNumber]);

  const tileIndexToMove = () => {
    return [7, 6, 5, 4, 3, 2, 1, 4][stateNumber];
  };

  const positionForTile = (tile: string | null) => {
    return Object.keys(positions).find((pos) => positions[Number(pos)] === tile);
  };

  const setNextState = () => {
    const currentPositions = { ...positions };
    const emptyIndex = Number(positionForTile(null));
    const indexToMove = tileIndexToMove();
    const newPositions = {
      ...currentPositions,
      [indexToMove]: null,
      [emptyIndex]: currentPositions[indexToMove],
    };
    const nextState = stateNumber === 7 ? 0 : stateNumber + 1;
    setPositions(newPositions);
    setStateNumber(nextState);
  };

  const clipPathForPosition = (position: number) => {
    const SIZE = (100 - 2 * GUTTER) / 3;
    const VAR0 = "0% ";
    const VAR1 = SIZE + GUTTER + "% ";
    const VAR2 = 2 * SIZE + 2 * GUTTER + "% ";
    

    switch (position) {
      case 1:
        return `inset(${VAR1}${VAR2}${VAR1}${VAR0} round 5%)`;
      case 2:
        return `inset(${VAR0}${VAR2}${VAR2}${VAR0} round 5%)`;
      case 3:
        return `inset(${VAR0}${VAR1}${VAR2}${VAR1} round 5%)`;
      case 4:
        return `inset(${VAR1}${VAR1}${VAR1}${VAR1} round 5%)`;
      case 5:
        return `inset(${VAR2}${VAR1}${VAR0}${VAR1} round 5%)`;
      case 6:
        return `inset(${VAR2}${VAR0}${VAR0}${VAR2} round 5%)`;
      case 7:
        return `inset(${VAR1}${VAR0}${VAR1}${VAR2} round 5%)`;
    }
  };

  const tiles = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"].map((tile) => {
    const pos = Number(positionForTile(tile));
    return (
      <div
        key={`rect-${tile}`}
        style={{
          WebkitClipPath: clipPathForPosition(pos),
          transition: `${TRANSITION}s cubic-bezier(0.86, 0, 0.07, 1)`,
        }}
        className="rect"
      ></div>
    );
  });
  const { theme } = useTheme();
  return (
    <div
        className="loader fixed inset-0 z-[2000] bg-black/90 flex items-center justify-center"
        >
        <div
        className={`loaderWrapper center ${
            theme === 'green' ? 'theme-green' : 'theme-primary'
        }`}
        style={{ width: size, height: size }}
        >
        <div className="loaderHolder">{tiles}</div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-white text-sm font-medium pt-10" data-i18n="walletconnecting">
            {t("walletconnecting")}
          </div>
          <button
              onClick={openWallet}
              className="flex items-center justify-center w-full border border-white rounded px-3 py-1 transition duration-150 active:bg-white"
          >
            {t("open_trust_wallet_text_button")}
          </button>
        </div>
    </div>
  );
}

export default GradientLoader;
