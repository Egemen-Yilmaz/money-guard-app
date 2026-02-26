import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import CurrencyTab from "../CurrencyTab/CurrencyTab";
import css from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  return (
    <div>
      <div className={css.statisticsContainer}>
        <div className={css.currency}>
          <CurrencyTab />
        </div>

        <div className={css.chart}>
          <Chart />
        </div>

        <div className={css.table}>
          <StatisticsDashboard />
          <StatisticsTable />
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
