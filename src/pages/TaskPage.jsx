import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './taskPage.module.css';
import { Modal } from '../components/Modal';

export function TaskPage() {
	const [task, setTask] = useState({
		id: '',
		title: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [refreshTaskFlag, setRefreshTaskFlag] = useState(false);
	const [hasInput, setHasInput] = useState(false);
	const [itemText, setItemText] = useState('');

	const { id } = useParams();
	const navigate = useNavigate();

	const refreshTask = () => {
		setRefreshTaskFlag((prev) => !prev);
	};

	useEffect(() => {
		setIsLoading(true);

		fetch(`http://localhost:3004/toDos/${id}`)
			.then((loadingData) => {
				if (!loadingData.ok) {
					navigate('/404');
					return;
				} else {
					return loadingData.json();
				}
			})
			.then((loadedTask) => {
				setTask(loadedTask);
			})
			.finally(() => setIsLoading(false));
	}, [id, refreshTaskFlag, navigate]);

	const requestUpdateToDoItem = () => {
		fetch(`http://localhost:3004/toDos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: itemText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newItem) => {
				refreshTask();
			})
			.finally(() => {
				setItemText('');
				closeUpdateItemModal();
			});
	};

	const requestDeleteToDoItem = () => {
		fetch(`http://localhost:3004/toDos/${id}`, {
			method: 'DELETE',
		}).then((deleteItem) => {
			closeDeleteItemModal();
			navigate(-1);
		});
	};

	const openUpdateItemModal = () => {
		setItemText(task.title);
		setIsUpdating(true);
		setHasInput(true);
	};

	const closeUpdateItemModal = () => {
		setIsUpdating(false);
		setItemText('');
		setHasInput(false);
	};

	const openDeleteItemModal = () => {
		setIsDeleting(true);
		setHasInput(false);
	};

	const closeDeleteItemModal = () => {
		setIsDeleting(false);
		setHasInput(false);
	};

	return (
		<div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				task && (
					<div className={styles.container}>
						<h1 className={styles.title}>Todo Item</h1>
						<div className={styles.item__text}>
							<div className={styles.round}></div>
							<p>{task.title}</p>
						</div>

						<div className={styles.button__container}>
							<Button
								text={'Back'}
								variant="btn__back"
								onClick={() => navigate(-1)}
							/>

							<Button
								text={'Edit'}
								variant="btn__edit"
								onClick={openUpdateItemModal}
							/>
							<Button
								text={'Delete'}
								variant="btn__delete"
								onClick={openDeleteItemModal}
							/>
						</div>
					</div>
				)
			)}

			{isUpdating && (
				<Modal
					itemText={itemText}
					setItemText={setItemText}
					hasInput={hasInput}
					isUpdating={isUpdating}
					acceptButtonText={'Edit'}
					acceptButtonOnClick={requestUpdateToDoItem}
					cancelButtonText={'Cancel'}
					cancelButtonOnClick={closeUpdateItemModal}
					disabledAcceptButton={itemText.trim() === ''}
				/>
			)}

			{isDeleting && (
				<Modal
					acceptButtonText={'Delete'}
					acceptButtonOnClick={requestDeleteToDoItem}
					cancelButtonText={'Cancel'}
					cancelButtonOnClick={closeDeleteItemModal}
					questionText={'Do you really want to delete this task?'}
					isDeleting
				/>
			)}
		</div>
	);
}
