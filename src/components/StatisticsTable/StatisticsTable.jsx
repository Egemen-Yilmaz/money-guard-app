import css from "./StatisticsTable.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionsSummary } from "../../redux/transactions/operations";
import { colorSelect } from "../../utils/colorSelect";

function StatisticsTable() {
  const transactionsSummaryData = useSelector(
    (state) => state.transactions.transactionsSummary,
  );

  const date = useSelector((state) => state.transactions.date);
  const categoryList = [];

  const dispatch = useDispatch();
  useEffect(() => {
    if (date.year) {
      dispatch(transactionsSummary(date));
    }
  }, [date]);

  colorSelect;

  async function listCreate() {
    transactionsSummaryData.categoriesSummary.map((category) => {
      if (category.name != "Income") {
        categoryList.push({
          color: colorSelect(category.name),
          name: category.name,
          amount: category.total,
        });
      }
    });
  }
  listCreate();

  return (
    <div className={css.area}>
      <div className={css.topBox}>
        <h2>Category</h2>
        <h2>Sum</h2>
      </div>
      <ul className={css.list}>
        {categoryList.map((category) => (
          <li key={category.name} className={css.category}>
            <div
              className={css.box}
              style={{ backgroundColor: category.color }}
            ></div>
            <div className={css.right}>
              <div>{category.name}</div>
              <div>{category.amount}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className={css.total}>
        <div className={css.totalValue}>
          <p>Expenses:</p>
          <p className={css.evalue}>{transactionsSummaryData.expenseSummary}</p>
        </div>
        <div className={css.totalValue}>
          <p>Income:</p>
          <p className={css.ivalue}>{transactionsSummaryData.incomeSummary}</p>
        </div>
      </div>
    </div>
  );
}

export default StatisticsTable;
