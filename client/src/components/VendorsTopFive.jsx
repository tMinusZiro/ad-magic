import ReactApexChart from "react-apexcharts";

export default function VendorsTopFive(props) {
  const series = [
    {
      name: "Total Sales",
      data: props.VendorsAmounts,
    },
    // {
    //   name: "Revenue",
    //   data: props.VendorsSales,
    // },
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
        text: "Total Sales",
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
  };

  return (
    <div id="V-chart">
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
