import React from 'react';
import styles from './toDoList.module.css';
import { ToDoItem } from './ToDoItem';

export function ToDoList() {
	return (
		<div className={styles.todo__list}>
			<ul>
				<ToDoItem />
			</ul>
		</div>
	);
}
