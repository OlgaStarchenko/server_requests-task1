import { useContext } from 'react';
import { AppContext } from '../context';
import styles from './toDoList.module.css';
import { ToDoItem } from './ToDoItem';

export function ToDoList() {
	const { viewToDoList, isLoading } = useContext(AppContext);
	return (
		<div className={styles.todo__list}>
			<ul>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					viewToDoList.map((item, id) => (
						<ToDoItem id={item.id} key={item.id} title={item.title} />
					))
				)}
			</ul>
		</div>
	);
}
