import React from 'react';
import styles from './modal.module.css';
import { Button } from './Button';

export function Modal({ closeAddItemModal, requestAddToDoItem, itemText, setItemText }) {
	return (
		<div className={styles.container}>
			<input
				className={styles.input__add}
				placeholder="Enter a new task..."
				value={itemText}
				onChange={({ target }) => setItemText(target.value)}
			/>
			<div className={styles.btn__container}>
				<Button
					text={'Add'}
					variant="btn__add"
					onClick={requestAddToDoItem}
					disabled={itemText.trim() === ''}
				/>
				<Button
					text={'Cancel'}
					variant="btn__cancel"
					onClick={closeAddItemModal}
				/>
			</div>
		</div>
	);
}
