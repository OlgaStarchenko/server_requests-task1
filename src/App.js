import styles from './App.module.css';
import { ToDoList } from './components/ToDoList';
import { Button } from './components/Button';
import { useEffect, useState } from 'react';
import { Modal } from './components/Modal';

export function App() {
	const [toDoList, setToDoList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [itemText, setItemText] = useState('');

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3004/toDos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDoList(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, [itemText]);

	const openAddItemModal = () => {
		setIsAdding(true);
	};

	const closeAddItemModal = () => {
		setIsAdding(false);
		setItemText('');
	};

	const requestAddToDoItem = () => {
		fetch('http://localhost:3004/toDos', {
			method: 'POST',
			heder: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: itemText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => console.log(response));
		setIsAdding(false);
		setItemText('');
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>To Do List</h1>
			<ToDoList toDoList={toDoList} isLoading={isLoading} />
			<div className={styles.btn__container}>
				<Button
					text={'+'}
					onClick={openAddItemModal}
					variant="btn__open_add_modal"
				/>
			</div>
			{isAdding && (
				<Modal
					closeAddItemModal={closeAddItemModal}
					requestAddToDoItem={requestAddToDoItem}
					itemText={itemText}
					setItemText={setItemText}
				/>
			)}
		</div>
	);
}
