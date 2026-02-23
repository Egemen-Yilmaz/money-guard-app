import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from "./Chart.module.css";
import { colorSelect } from "../../utils/colorSelect";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function Chart() {
  const transactionsSummaryData = {
    expenseSummary: -9850,
    periodTotal: -9850,
    year: 2026,
    categoriesSummary: [
      { name: "Main expenses", total: -2500 },
      { name: "Products", total: -1200 },
      { name: "Car", total: -1800 },
      { name: "Self care", total: -750 },
      { name: "Child care", total: -950 },
      { name: "Household products", total: -600 },
      { name: "Education", total: -500 },
      { name: "Leisure", total: -900 },
      { name: "Entertainment", total: -650 },
      { name: "Other expenses", total: -1000 },
      { name: "Income", total: 15000 }, // Bu chart'ta gösterilmeyecek zaten
    ],
  };

  const hasData = transactionsSummaryData.expenseSummary < 0;

  const data = [];
  const labels = [];
  const colors = [];

  const dataset = hasData
    ? {
        labels: labels,
        datasets: [
          {
            label: "Amount",
            data: data,
            borderWidth: 0,
            backgroundColor: colors,
          },
        ],
      }
    : {
        labels: ["No Data"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["grey"],
            borderWidth: 0,
          },
        ],
      };

  colorSelect;
  return (
    <div>
      <div className={css.box}>
        <p className={css.title}>Statistics</p>
        {transactionsSummaryData.categoriesSummary.map((category) => {
          if (category.name != "Income") {
            // Harcamalar için negatif değeri pozitife çevir
            const amount =
              category.total < 0 ? Math.abs(category.total) : category.total;
            data.push(amount);
            labels.push(category.name);
            colors.push(colorSelect(category.name));
          }
        })}
        <p className={css.centerText}>
          $ {transactionsSummaryData.periodTotal}
        </p>
        {transactionsSummaryData.year != 0 && (
          <Doughnut
            data={dataset}
            options={{
              cutout: "70%",
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: { enabled: hasData },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
