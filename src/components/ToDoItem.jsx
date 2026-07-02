import React from 'react';
import styles from './toDoItem.module.css';
import { Button } from './Button';

export function ToDoItem({ title, openUpdateItemModal, id }) {
	return (
		<li className={styles.todo__item}>
			<div className={styles.round}></div>

			<div className={styles.content}>
				<div className={styles.header}>
					<p>{title}</p>

					<div className={styles.right}>
						<Button
							text="Edit"
							variant="btn__edit"
							onClick={() => openUpdateItemModal(id, title)}
						/>
						<Button text="Delete" variant="btn__delete" />
					</div>
				</div>

				<hr className={styles.line} />
			</div>
		</li>
	);
}
