import ReactApexChart from "react-apexcharts";

export default function AreaGraph() {
  const series = [
    {
      data: [
        [1327359600000, 20],
        [1327446000000, 25],
        [1327532400000, 35],
        [1327618800000, 30],
        [1327878000000, 45],
        [1327964400000, 40],
        [1328050800000, 30],
        [1328137200000, 20],
        [1328223600000, 25],
        [1328482800000, 35],
        [1328569200000, 40],
      ],
    },
  ];
  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: "#999",
          label: {
            show: true,
            text: "Support",
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date("14 Nov 2012").getTime(),
          borderColor: "#999",
          yAxisIndex: 0,
          label: {
            show: true,
            text: "Rally",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      min: new Date("01 Mar 2012").getTime(),
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  return (
    <div id="area-chart-wrapper">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={"100%"}
      />
    </div>
  );
}
