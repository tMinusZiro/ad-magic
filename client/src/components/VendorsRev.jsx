import ReactApexChart from "react-apexcharts";

export default function VendorsRev(props) {
  const series = [
    {
      name: "Gross Revenue",
      data: props.RevenueAmounts,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "100%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 15,
      colors: ["transparent"],
    },
    xaxis: {
      categories: props.RevenueLabels,
    },
    yaxis: {
      title: {
        text: "Gross Revenue (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " Thousand";
        },
      },
    },
    colors: ["#6A78D1"],
    title: {
      text: "Top 5 Vendors (Revenue)",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: "#263238",
      },
    },
  };

  return (
    <div id="R-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="100%"
      />
    </div>
  );
}
