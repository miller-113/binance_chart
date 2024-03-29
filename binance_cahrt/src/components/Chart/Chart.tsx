import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import useCandlestickData from "../../hooks/useCandleStickData";
import { drawArrows } from "../../shared";
import options_ from "./chartOption";

import { ArrowCoordinate } from "../../shared";
interface CandlestickChartProps {
  interval?: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  interval = "1m",
}) => {
  const { candles, loading } = useCandlestickData(interval);
  const [arrowCoordinates, setArrowCoordinates] = useState<ArrowCoordinate[]>(
    []
  );

  useEffect(() => {
    if (candles.length > 0) {
      const updatedCoordinates: ArrowCoordinate[] = drawArrows(candles);
      setArrowCoordinates(updatedCoordinates);
    }
  }, [candles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const series = [
    {
      data: candles.map((candle) => ({
        x: new Date(candle[0]),
        y: [candle[1], candle[2], candle[3], candle[4]],
      })),
    },
  ];

  const options: any = options_(arrowCoordinates);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="candlestick"
      height={350}
    />
  );
};

export { CandlestickChart };
