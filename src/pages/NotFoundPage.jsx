import React from 'react';
import styles from './notFoundPage.module.css';
import { Button } from './../components/Button';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div>
			<div className={styles.container}>
				<h1 className={styles.title}>Error 404</h1>
				<p className={styles.item__text}>page not found...</p>
				<Button text={'Back'} variant="btn__back" onClick={() => navigate('/')} />
			</div>
		</div>
	);
}
