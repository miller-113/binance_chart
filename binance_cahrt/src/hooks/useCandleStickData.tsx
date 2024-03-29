import { useState, useEffect } from "react";
import axios from "axios";

export type Candle = [number, number, number, number, number];

const useCandlestickData = (interval = "1m", symbol = "BTCUSDT") => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandles = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines",
          {
            params: {
              symbol: "BTCUSDT",
              interval: interval,
              limit: 50,
            },
          }
        );
        setCandles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candles:", error);
      }
    };
    fetchCandles();

    const socket = new WebSocket(
      `wss://stream.binance.com:443/ws/${symbol}@kline_${interval}`
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbol.toLowerCase()}@kline_${interval}`],
          id: 1,
        })
      );
    };

    socket.onmessage = (event) => {
      const candleData = JSON.parse(event.data);
      if (candleData && candleData.k && candleData.k.t) {
        const newCandle: Candle = [
          candleData.k.t,
          parseFloat(candleData.k.o),
          parseFloat(candleData.k.h),
          parseFloat(candleData.k.l),
          parseFloat(candleData.k.c),
        ];
        setCandles((prevCandles) => {
          const updatedCandles = [...prevCandles];
          const lastIndex = updatedCandles.length - 1;
          const prevIndex = lastIndex - 1;

          if (candleData.k.x) {
            fetchCandles();
          } else {
            updatedCandles[lastIndex] = newCandle;
          }
          return updatedCandles;
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [symbol, interval]);

  return { candles, loading };
};

export default useCandlestickData;
