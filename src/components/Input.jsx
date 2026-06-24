import React from 'react';
import styles from './input.module.css';
import { Button } from './Button';

export function Input() {
	return (
		<div className={styles.container}>
			<input className={styles.input__search} />
		</div>
	);
}
