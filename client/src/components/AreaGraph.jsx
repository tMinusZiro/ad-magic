import ReactApexChart from "react-apexcharts";

export default function AreaGraph() {
  const series = [
    {
      data: [
        //jan 2021
        [1617235920000, 102],
        [1614557520000, 79],
        [1612138320000, 285],
        [1609459920000, 119],
        [1606781520000, 102],
        [1604189520000, 37],
        [1601511120000, 27],
        [1598919120000, 16],
        [1596240720000, 16],
        [1593562320000, 7],
        [1590970320000, 6],
        [1588291920000, 67],
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
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date("05 01 2020").getTime(),
          borderColor: "#000",
          yAxisIndex: 0,
          label: {
            show: false,
            style: {
              color: "#fff",
              background: "#ff7711",
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
      min: new Date("05 01 2020").getTime(),
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
