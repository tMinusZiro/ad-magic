import ReactApexChart from "react-apexcharts";

export default function Fullfilment(props) {
  const series = props.FullfilmentAmounts;
  const options = {
    labels: props.FullfilmentLabels,
    chart: {
      type: "pie",
      width: "100%",
      height: "100%",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
    title: {
      text: "Fullfillment Type",
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
    colors: ["#FF9F6F", "#6FB7FF"],
    stroke: {
      width: 2,
      colors:["#eaf0f6"]
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#425B76"],
        opacity: "0.8",
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        borderWidth: 0,
      },
    },
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
