import styles from './App.module.css';
import { ToDoList } from './components/ToDoList';
import { Button } from './components/Button';
import { useEffect, useState } from 'react';

export function App() {
	const [toDoList, setToDoList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDoList(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>To Do List</h1>
			<ToDoList toDoList={toDoList} isLoading={isLoading} />
			<div className={styles.btn__container}>
				<Button />
			</div>
		</div>
	);
}
