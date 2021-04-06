import ReactApexChart from "react-apexcharts";

export default function Fullfilment(props) {
  const series = props.FullfilmentAmounts;
  const options = {
    labels: props.FullfilmentLabels,
    chart: {
      type: "pie",
      width: "100%",
      height: "100%",
    },

    legend: {
      position: "bottom",
      verticalAlign: "right",
      containerMargin: {
        left: 50,
        right: 100,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
          legend: {
            position: "left",
            height: 5,
          },
        },
      },
    ],
  };
  return (
    <div id="f-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width="100%"
        height="100%"
      />
    </div>
  );
}
