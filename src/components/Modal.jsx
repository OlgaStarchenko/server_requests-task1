import React, { useEffect, useRef } from 'react';
import styles from './modal.module.css';
import { Button } from './Button';

export function Modal({
	acceptButtonText,
	acceptButtonOnClick,
	cancelButtonText,
	cancelButtonOnClick,
	questionText,
	disabledAcceptButton,
	disabledCancelButton,
	itemText,
	setItemText,
	hasInput,
	placeholder,
	isAdding,
	isUpdating,
}) {
	const inputRef = useRef(null);

	useEffect(() => {
		if (isAdding || isUpdating) {
			inputRef.current.focus();
		}
	}, [isAdding, isUpdating]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			console.log(event.key);
			if (event.key === 'Enter' && !disabledAcceptButton) {
				acceptButtonOnClick();
			} else if (event.key === 'Escape') {
				cancelButtonOnClick();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	return (
		<div className={styles.container}>
			{hasInput ? (
				<input
					className={styles.input__add}
					placeholder={placeholder}
					value={itemText}
					onChange={({ target }) => setItemText(target.value)}
					ref={inputRef}
				/>
			) : (
				<h2 className={styles.textH2}>{questionText}</h2>
			)}
			<div className={styles.btn__container}>
				<Button
					text={acceptButtonText}
					variant="btn__add"
					onClick={acceptButtonOnClick}
					disabled={disabledAcceptButton}
				/>
				<Button
					text={cancelButtonText}
					variant="btn__cancel"
					onClick={cancelButtonOnClick}
					questionText={'Do you really want to delete the task?'}
				/>
			</div>
		</div>
	);
}
