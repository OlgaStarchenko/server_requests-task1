import React from 'react';
import { forwardRef } from 'react';
import styles from './input.module.css';

export const Input = forwardRef(function Input(
	{ variant, placeholder, value, onChange },
	ref,
) {
	return (
		<div className={styles.container}>
			<input
				className={styles[variant]}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				ref={ref}
			/>
		</div>
	);
});
