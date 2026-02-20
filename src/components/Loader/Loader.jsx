import React from 'react';
import { Rings } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import styles from './Loader.module.css';

const Loader = () => {
	const isLoading = useSelector((state) => state.global?.isLoading);
	if (!isLoading) return null;

	return (
		<div className={styles.backdrop}>
			<Rings height="96" width="96" color="#ffffff" ariaLabel="loading" />
		</div>
	);
};

export default Loader;
