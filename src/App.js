import styles from './App.module.css';
import { ToDoList } from './components/ToDoList';
import { Button } from './components/Button';
import { useEffect, useState } from 'react';
import { Modal } from './components/Modal';

export function App() {
	const [toDoList, setToDoList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [itemText, setItemText] = useState('');
	const [refreshToDosFlag, setRefreshToDosFlag] = useState(false);
	const [hasInput, setHasInput] = useState(false);
	const [idTask, setIdTask] = useState('');

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3004/toDos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDoList(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshToDosFlag]);

	const requestAddToDoItem = () => {
		fetch('http://localhost:3004/toDos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: itemText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newItem) => {
				refreshToDos();
			})
			.finally(() => {
				setIsAdding(false);
				setItemText('');
			});
	};

	const requestUpdateToDoItem = () => {
		fetch(`http://localhost:3004/toDos/${idTask}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: itemText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newItem) => {
				refreshToDos();
			})
			.finally(() => {
				setIsAdding(false);
				setItemText('');
				closeUpdateItemModal();
			});
	};

	const refreshToDos = () => {
		setRefreshToDosFlag(!refreshToDosFlag);
	};

	const openAddItemModal = () => {
		setIsAdding(true);
		setHasInput(true);
	};

	const closeAddItemModal = () => {
		setIsAdding(false);
		setItemText('');
		setHasInput(false);
	};
	const openUpdateItemModal = (id, title) => {
		setIdTask(id);
		setItemText(title);
		setIsUpdating(true);
		setHasInput(true);
	};

	const closeUpdateItemModal = () => {
		setIsUpdating(false);
		setItemText('');
		setHasInput(false);
	};
	console.log(toDoList);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>To Do List</h1>
			<ToDoList
				toDoList={toDoList}
				isLoading={isLoading}
				openUpdateItemModal={openUpdateItemModal}
			/>
			<div className={styles.btn__container}>
				<Button
					text={'+'}
					onClick={openAddItemModal}
					variant="btn__open_add_modal"
				/>
			</div>
			{isAdding && (
				<Modal
					acceptButtonText={'Add'}
					cancelButtonText={'Cancel'}
					cancelButtonOnClick={closeAddItemModal}
					acceptButtonOnClick={requestAddToDoItem}
					itemText={itemText}
					setItemText={setItemText}
					hasInput={hasInput}
					disabledAcceptButton={itemText.trim() === ''}
					placeholder={'Enter a new task...'}
				/>
			)}
			{isUpdating && (
				<Modal
					acceptButtonText={'Edit'}
					cancelButtonText={'Cancel'}
					cancelButtonOnClick={closeUpdateItemModal}
					acceptButtonOnClick={requestUpdateToDoItem}
					itemText={itemText}
					setItemText={setItemText}
					hasInput={hasInput}
					disabledAcceptButton={itemText.trim() === ''}
				/>
			)}
		</div>
	);
}
