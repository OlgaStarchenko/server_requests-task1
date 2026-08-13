import React from 'react';
import styles from './toDoItem.module.css';
import { Link } from 'react-router-dom';

export function ToDoItem({ title, id }) {
	return (
		<li className={styles.todo__item}>
			<div className={styles.round}></div>

			<div className={styles.content}>
				<div className={styles.header}>
					<Link to={`/task/${id}`} className={styles.task__link}>
						{title}
					</Link>
				</div>
			</div>
		</li>
	);
}
