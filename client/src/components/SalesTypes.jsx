import ReactApexChart from "react-apexcharts";

export default function SalesType(props) {
  const series = props.SaleTypesAmounts;
  const options = {
    labels: props.SaleTypesLabels,

    chart: {
      type: "pie",
      width: "100%",
      height: "100%",
    },
    title: {
      text: "Sales Type",
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '18px',
        fontWeight:  'bold',
        fontFamily:  "Avenir",
        color:  '#425B76'
      },
  },
  stroke: {
    width: 2,
    colors:["#eaf0f6"]
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ["#425B76"],
      opacity: "0.8"
    },
    background: {
      enabled: true,
      foreColor: "#fff",
      borderWidth: 0,
    },
  },
  colors: ["#6FB7FF", "#FF9F6F"],

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
    <div id="charts">
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
