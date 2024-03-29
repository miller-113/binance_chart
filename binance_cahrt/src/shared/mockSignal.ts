import { Candle, ArrowCoordinate } from "./types";

const drawArrows = (candles: Candle[]): ArrowCoordinate[] => {
  const updatedCoordinates: ArrowCoordinate[] = [];
  for (let i = 3; i < candles.length; i++) {
    const prevPrevPrevCandle = candles[i - 3];
    const prevPrevCandle = candles[i - 2];
    const prevCandle = candles[i - 1];
    const currentCandle = candles[i];

    const prevPrevPrevClose = prevPrevPrevCandle[4];
    const prevPrevClose = prevPrevCandle[4];
    const prevClose = prevCandle[4];
    const currentClose = currentCandle[4];

    if (
      prevPrevPrevClose < prevPrevClose &&
      prevPrevClose < prevClose &&
      prevClose < currentClose
    ) {
      updatedCoordinates.push({
        x: new Date(currentCandle[0]).getTime(),
        y: currentCandle[4], // Используйте только цену закрытия
        direction: "down",
      });
    } else if (
      prevPrevPrevClose > prevPrevClose &&
      prevPrevClose > prevClose &&
      prevClose > currentClose
    ) {
      updatedCoordinates.push({
        x: new Date(currentCandle[0]).getTime(),
        y: currentCandle[4], // Используйте только цену закрытия
        direction: "up",
      });
    }
  }
  return updatedCoordinates;
};

export { drawArrows };
