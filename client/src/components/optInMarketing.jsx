import ReactApexChart from "react-apexcharts";

export default function OptInMarketing(props) {
  const series = props.MarketingAmounts;
  const options = {
    labels: props.MarketingLabels,
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
    <div id="M-chart">
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
