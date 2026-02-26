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
import { useSelector } from "react-redux";
import { colorSelect } from "../../utils/colorSelect";
import { useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function Chart() {
  const transactionsSummaryData = useSelector(
    (state) => state.transactions.transactionsSummary,
  );

  const items = useSelector((state) => state.transactions?.items);
  useEffect(() => {
    console.log(items);
  }, []);

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
