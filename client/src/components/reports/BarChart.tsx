import Chart from "react-apexcharts";

const BarChart = () => {
  const config = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  };

  return (
    <Chart
      options={config.options}
      series={config.series}
      type="bar"
      width={800}
      height={600}
    />
  );
};

export default BarChart;
