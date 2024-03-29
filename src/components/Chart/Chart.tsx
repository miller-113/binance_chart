import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import useCandlestickData from "../../hooks/useCandleStickData";
import { Candle, drawArrows } from "../../shared";
import options_ from "./chartOption";
import { ArrowCoordinate, CandlestickChartProps } from "../../shared";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  interval = "1m",
}) => {
  const { candles, loading, signal } = useCandlestickData(interval);
  const [arrowCoordinates, setArrowCoordinates] = useState<ArrowCoordinate[]>(
    []
  );

  useEffect(() => {
    if (candles.length > 0) {
      const updatedCoordinates: ArrowCoordinate[] = drawArrows(candles);
      setArrowCoordinates(updatedCoordinates);
    }
  }, [candles]);

  useEffect(() => {
    if (signal) {
      toast.success(
        `${signal.type};
         time: ${signal.time.getHours()}:${signal.time.getMinutes()};
         price: ${signal.price};
         volume: ${signal.volume};`,
        {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
      console.log(new Date());
      console.log(signal);
    }
  }, [signal]);

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
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
      <ToastContainer
        position="top-right"
        autoClose={10000}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition={Bounce}
      />
      {/* {candleClose && <Signal candles={candles} />} */}
    </>
  );
};

export { CandlestickChart };
