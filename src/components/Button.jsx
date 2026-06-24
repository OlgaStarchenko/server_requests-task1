import React from 'react';
import styles from './button.module.css';

export function Button({ text, variant, onClick }) {
	return (
		<button className={styles[variant]} onClick={onClick}>
			{text}
		</button>
	);
}
