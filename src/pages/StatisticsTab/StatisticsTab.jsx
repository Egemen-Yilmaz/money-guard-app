import React, { lazy, Suspense } from "react";
const Chart = lazy(() => import("../../components/Chart/Chart"));
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
          <Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  maxWidth: 520,
                  height: "100%",
                  background: "#f3f4f6",
                  borderRadius: 8,
                }}
              />
            }
          >
            <Chart />
          </Suspense>
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
