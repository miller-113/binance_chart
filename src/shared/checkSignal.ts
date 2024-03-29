import { Candle } from "./types";
import { Signal } from "./types";

const checkSignal = (candles: Candle[]): Signal | null => {
  if (candles.length >= 3) {
    const lastThreeCandles = candles.slice(-3);
    const [firstCandle, secondCandle, thirdCandle] = lastThreeCandles;

    const firstClose = firstCandle[4];
    const secondClose = secondCandle[4];
    const thirdClose = thirdCandle[4];
    console.log("entry");
    console.log("lastThreeCandles", lastThreeCandles);

    if (firstClose < secondClose && secondClose < thirdClose) {
      return {
        type: "sell 📉",
        time: new Date(thirdCandle[0]),
        price: thirdClose,
        volume: thirdCandle[5],
      };
    } else if (firstClose > secondClose && secondClose > thirdClose) {
      return {
        type: "buy 📈",
        time: new Date(thirdCandle[0]),
        price: thirdClose,
        volume: thirdCandle[5],
      };
    }
  }
  return null;
};

export { checkSignal };
