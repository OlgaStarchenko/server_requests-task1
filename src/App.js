import styles from './App.module.css';
import { ToDoList } from './components/ToDoList';
import { Button } from './components/Button';

export function App() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>To Do List</h1>
			<ToDoList />
			<div className={styles.btn__container}>
				<Button />
			</div>
		</div>
	);
}
