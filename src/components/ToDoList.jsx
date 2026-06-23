import React from 'react';
import styles from './toDoList.module.css';
import { ToDoItem } from './ToDoItem';

export function ToDoList({ toDoList, isLoading }) {
	return (
		<div className={styles.todo__list}>
			<ul>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					toDoList.map((item) => <ToDoItem key={item.id} title={item.title} />)
				)}
			</ul>
		</div>
	);
}
