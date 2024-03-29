import { ArrowCoordinate } from "../../shared";

function options(arrowCoordinates: ArrowCoordinate[]) {
  return {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "Candlestick",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
    },
    markers: {
      size: 0,
    },
    annotations: {
      points: arrowCoordinates.map(({ x, y, direction }) => ({
        x,
        y,
        label: {
          borderColor: "",
          offsetY: direction === "up" ? 50 : -5,
          style: {
            background: "#ffffff",
            padding: "5px",
            fontSize: "14px",
          },
          text: direction === "up" ? "↑" : "↓",
        },
      })),
    },
  };
}

export default options;
