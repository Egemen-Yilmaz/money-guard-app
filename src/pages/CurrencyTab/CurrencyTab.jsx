import React, { useState, useEffect, useRef } from "react";
import styles from "./CurrencyTab.module.css";

const CACHE_KEY = "currencyRates";
const CACHE_TIME_KEY = "currencyRatesTime";
const CACHE_DURATION = 60 * 60 * 1000;

const CurrencyTab = () => {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef();

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  // Dynamically import Chart.js and react-chartjs-2 Line component to avoid
  // pulling chart.js into the main bundle when the CurrencyTab is not shown.
  const [LineComp, setLineComp] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ChartJS = await import('chart.js');
        // register only when loaded
        ChartJS.register(
          ChartJS.CategoryScale,
          ChartJS.LinearScale,
          ChartJS.PointElement,
          ChartJS.LineElement,
          ChartJS.Tooltip,
          ChartJS.Filler,
        );
        const rc = await import('react-chartjs-2');
        if (mounted && rc && rc.Line) setLineComp(() => rc.Line);
      } catch {
        // swallow — we'll render nothing if charts fail to load
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const fetchCurrencyRates = async () => {
    try {
      const cachedRates = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (
        cachedRates &&
        cachedTime &&
        now - Number(cachedTime) < CACHE_DURATION
      ) {
        setRates(JSON.parse(cachedRates));
        setIsLoading(false);
        return;
      }

      const response = await fetch("https://api.monobank.ua/bank/currency");

      if (!response.ok) {
        throw new Error("Failed to fetch currency rates");
      }

      const data = await response.json();

      const usd = data.find(
        (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980,
      );
      const eur = data.find(
        (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980,
      );

      const formatted = [];

      if (usd) {
        formatted.push({
          code: "USD",
          buy: usd.rateBuy,
          sell: usd.rateSell,
        });
      }

      if (eur) {
        formatted.push({
          code: "EUR",
          buy: eur.rateBuy,
          sell: eur.rateSell,
        });
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());

      setRates(formatted);
    } catch (error) {
      console.error("Currency fetch error:", error);
      setError("Unable to load currency rates");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // 📈 Chart Data
  const chartData = {
    labels: ["USD Buy", "EUR Buy", "USD Sell", "EUR Sell"],
    datasets: [
      {
        data: [rates[0]?.buy, rates[1]?.buy, rates[0]?.sell, rates[1]?.sell],
        borderColor: "#FF868D",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#FF868D",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(0, "rgba(255, 134, 141, 0.4)");
          gradient.addColorStop(1, "rgba(255, 134, 141, 0)");

          return gradient;
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currencyTable}>
        <div className={styles.currencyHeader}>
          <div>Currency</div>
          <div>Purchase</div>
          <div>Sale</div>
        </div>

        {rates.map((r) => (
          <div className={styles.currencyRow} key={r.code}>
            <div>{r.code}</div>
            <div>{Number(r.buy).toFixed(2)}</div>
            <div>{Number(r.sell).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* 📊 Chart Alanı */}
      <div className={styles.chartContainer}>
        {LineComp ? (
          <LineComp ref={chartRef} data={chartData} options={chartOptions} />
        ) : (
          <div style={{ height: 120 }} />
        )}
      </div>
    </div>
  );
};

export default CurrencyTab;
