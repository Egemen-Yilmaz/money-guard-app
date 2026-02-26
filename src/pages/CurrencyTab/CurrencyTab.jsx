import React from 'react';
import styles from './CurrencyTab.module.css';

const rates = [
	{ code: 'USD', buy: '27.55', sell: '30.00' },
	{ code: 'EUR', buy: '29.10', sell: '31.50' },
];

const CurrencyTab = () => {
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
		</div>
	);
};

export default CurrencyTab;
