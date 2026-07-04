import React from 'react';
import styles from './button.module.css';

export function Button({ text, children, variant, onClick, disabled }) {
	return (
		<button className={styles[variant]} onClick={onClick} disabled={disabled}>
			{text} {children}
		</button>
	);
}
