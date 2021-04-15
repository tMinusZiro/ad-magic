import ReactApexChart from "react-apexcharts";

export default function VendorsTopFive(props) {
  const series = [
    {
      name: "Total Sales",
      data: props.VendorsAmounts,
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
      categories: props.VendorsLabels,
    },
    yaxis: {
      title: {
        text: "Total Sales (items)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Item";
        },
      },
    },
    colors: ["#6A78D1"],
    title: {
      text: "Top 5 Vendors (items sold)",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: "#2425B76",
      },
    },
  };

  return (
    <div id="V-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        width="635px"
        height="100%"
      />
    </div>
  );
}
