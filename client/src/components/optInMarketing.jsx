import ReactApexChart from "react-apexcharts";

export default function OptInMarketing(props) {
  const series = props.MarketingAmounts;
  const options = {
    labels: props.MarketingLabels,
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

    legend: {
      position: "bottom",
      verticalAlign: "right",
      containerMargin: {
        left: 50,
        right: 100,
      },
    },
    title: {
      text: "Marketing Opt-in",
      align: "center",
      offsetX: 0,
      offsetY: -5,
      floating: false,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        fontFamily: "Avenir",
        color: "#425B76",
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
    colors: ["#6FB7FF", "#FF9F6F"],
    stroke: {
      width: 2,
      colors: ["#eaf0f6"],
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
