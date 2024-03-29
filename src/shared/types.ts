export type Candle = [number, number, number, number, number, number];

export type ArrowCoordinate = {
  x: number;
  y: any;
  direction: string;
};

export interface CandlestickChartProps {
  interval?: string;
}

export type Signal = {
  type: "buy 📈" | "sell 📉";
  time: Date;
  price: number;
  volume: number;
};
