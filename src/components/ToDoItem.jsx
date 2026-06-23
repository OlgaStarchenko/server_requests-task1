import React from 'react';
import styles from './toDoItem.module.css';

export function ToDoItem({ title }) {
	return (
		<li className={styles.todo__item}>
			<div className={styles.round}></div>
			<div className={styles.item__container}>
				<p>{title}</p>
				<hr className={styles.line} />
			</div>
		</li>
	);
}
