import React from 'react';
import styles from './toDoList.module.css';
import { ToDoItem } from './ToDoItem';

export function ToDoList({
	toDoList,
	isLoading,
	openUpdateItemModal,
	openDeleteItemModal,
}) {
	return (
		<div className={styles.todo__list}>
			<ul>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					toDoList.map((item, id) => (
						<ToDoItem key={item.id} title={item.title} id={item.id} />
					))
				)}
			</ul>
		</div>
	);
}
