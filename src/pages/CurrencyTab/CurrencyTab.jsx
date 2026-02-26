import React, { useState, useEffect } from 'react';
import styles from './CurrencyTab.module.css';

const CACHE_KEY = 'currencyRates';
const CACHE_TIME_KEY = 'currencyRatesTime';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const CurrencyTab = () => {
	const [rates, setRates] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchCurrencyRates();
	}, []);

	const fetchCurrencyRates = async () => {
		try {
			// Check if we have cached data
			const cachedRates = localStorage.getItem(CACHE_KEY);
			const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
			const now = Date.now();

			// If cache exists and is less than 1 hour old, use it
			if (cachedRates && cachedTime && (now - parseInt(cachedTime)) < CACHE_DURATION) {
				setRates(JSON.parse(cachedRates));
				setIsLoading(false);
				return;
			}

			// Otherwise, fetch fresh data from Monobank API
			const response = await fetch('https://api.monobank.ua/bank/currency');
			
			if (!response.ok) {
				throw new Error('Failed to fetch currency rates');
			}

			const data = await response.json();

			// Filter for USD (840) and EUR (978) against UAH (980)
			const usdRate = data.find(item => item.currencyCodeA === 840 && item.currencyCodeB === 980);
			const eurRate = data.find(item => item.currencyCodeA === 978 && item.currencyCodeB === 980);

			const formattedRates = [];

			if (usdRate) {
				formattedRates.push({
					code: 'USD',
					buy: usdRate.rateBuy?.toFixed(2) || 'N/A',
					sell: usdRate.rateSell?.toFixed(2) || 'N/A',
				});
			}

			if (eurRate) {
				formattedRates.push({
					code: 'EUR',
					buy: eurRate.rateBuy?.toFixed(2) || 'N/A',
					sell: eurRate.rateSell?.toFixed(2) || 'N/A',
				});
			}

			// Cache the rates and timestamp
			localStorage.setItem(CACHE_KEY, JSON.stringify(formattedRates));
			localStorage.setItem(CACHE_TIME_KEY, now.toString());

			setRates(formattedRates);
			setError(null);
		} catch (err) {
			console.error('Error fetching currency rates:', err);
			setError('Unable to load currency rates');
			
			// Fallback to cached data if available, even if expired
			const cachedRates = localStorage.getItem(CACHE_KEY);
			if (cachedRates) {
				setRates(JSON.parse(cachedRates));
			}
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className={styles.currencyWrapper}>
				<div className={styles.loadingText}>Loading currency rates...</div>
			</div>
		);
	}

	if (error && rates.length === 0) {
		return (
			<div className={styles.currencyWrapper}>
				<div className={styles.errorText}>{error}</div>
			</div>
		);
	}

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
						<div>{r.buy}</div>
						<div>{r.sell}</div>
					</div>
				))}
			</div>
			{error && (
				<div className={styles.cacheNotice}>Using cached data</div>
			)}
		</div>
	);
};

export default CurrencyTab;
