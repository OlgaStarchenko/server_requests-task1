import React from 'react';
import styles from './toDoItem.module.css';

export function ToDoItem() {
	return (
		<li className={styles.todo__item}>
			<div className={styles.round}></div>
			<div className={styles.item__container}>
				<p>Todo item jhbcjsdbhc jsbcjasdbcfjhd jsdbfjhsdbjfhbh janbcjhasbjhbhj</p>
				<hr className={styles.line} />
			</div>
		</li>
	);
}
