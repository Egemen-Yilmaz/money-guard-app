import css from "./StatisticsDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeDate } from "../../redux/transactions/slice";
import { useEffect } from "react";

function StatisticsDashboard() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];

  const dispatch = useDispatch();
  const date = useSelector((state) => state.transactions.date);

  useEffect(() => {
    const now = new Date();
    dispatch(
      changeDate({
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      }),
    );
  }, []);

  const handleMonthChange = (event) => {
    dispatch(
      changeDate({
        month: months.indexOf(event.target.value) + 1,
        year: date.year,
      }),
    );
  };

  const handleYearChange = (event) => {
    dispatch(changeDate({ month: date.month, year: event.target.value }));
  };

  return (
    <div className={css.date}>
      <select
        value={months[date.month - 1]}
        className={css.box}
        onChange={handleMonthChange}
      >
        {months.map((month) => (
          <option key={month} className={css.option} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select value={date.year} className={css.box} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} className={css.option} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatisticsDashboard;
