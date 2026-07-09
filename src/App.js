import styles from './App.module.css';
import { ToDoList } from './components/ToDoList';
import { Button } from './components/Button';
import { useEffect, useRef, useState } from 'react';
import { Modal } from './components/Modal';
import { Input } from './components/Input';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from './firebase';

export function App() {
	const [originalToDoList, setOriginalToDoList] = useState([]);
	const [viewToDoList, setViewToDoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isAdding, setIsAdding] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [itemText, setItemText] = useState('');
	const [hasInput, setHasInput] = useState(false);
	const [idTask, setIdTask] = useState('');
	const [titleTask, setTitleTask] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [searchText, setSearchText] = useState('');
	const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);

	const timerRef = useRef(null);

	useEffect(() => {
		const toDosDbRef = ref(db, 'toDoList');
		return onValue(toDosDbRef, (snapshot) => {
			const loadedToDos = snapshot.val() || {};
			const toDoList = Object.entries(loadedToDos).map(([id, item]) => ({
				id,
				...item,
			}));
			setOriginalToDoList(toDoList);
			setViewToDoList(toDoList);
			setIsLoading(false);
		});
	}, []);

	const handleSearchChange = ({ target }) => {
		let newInputValue = target.value;
		setInputValue(newInputValue);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setSearchText(newInputValue);
		}, 1500);
	};

	useEffect(() => {
		let updateToDoList = [...originalToDoList];
		if (searchText.trim() !== '') {
			updateToDoList = updateToDoList.filter((itemTask) =>
				itemTask.title.toLowerCase().includes(searchText.trim().toLowerCase()),
			);
		}
		if (isSortedAlphabetically) {
			updateToDoList.sort((a, b) => a.title.localeCompare(b.title));
		}
		setViewToDoList(updateToDoList);
	}, [originalToDoList, searchText, isSortedAlphabetically]);

	const requestAddToDoItem = () => {
		const toDosDbRef = ref(db, 'toDoList');

		push(toDosDbRef, {
			title: itemText,
		}).then(() => {
			setIsAdding(false);
			setItemText('');
		});
	};

	const requestUpdateToDoItem = () => {
		const taskRef = ref(db, `toDoList/${idTask}`);

		set(taskRef, {
			title: itemText,
		}).then(() => {
			setIsUpdating(false);
			setItemText('');
			closeUpdateItemModal();
		});
	};

	const requestDeleteToDoItem = () => {
		const taskRef = ref(db, `toDoList/${idTask}`);
		remove(taskRef).then(() => {
			closeDeleteItemModal();
		});
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

	const openDeleteItemModal = (id, title) => {
		setTitleTask(title);
		setIsDeleting(true);
		setHasInput(false);
		setIdTask(id);
	};

	const closeDeleteItemModal = () => {
		setIsDeleting(false);
		setHasInput(false);
	};

	const toggleIsSorted = () => {
		setIsSortedAlphabetically((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>To Do List</h1>
			<div className={styles.input__search__container}>
				<Input
					variant="input__search"
					placeholder="Search..."
					value={inputValue}
					onChange={handleSearchChange}
				/>

				<Button
					text={'Sort A → Z'}
					onClick={toggleIsSorted}
					variant={isSortedAlphabetically ? 'btn__sort__active' : 'btn__sort'}
				/>
			</div>

			<ToDoList
				toDoList={viewToDoList}
				isLoading={isLoading}
				openUpdateItemModal={openUpdateItemModal}
				openDeleteItemModal={openDeleteItemModal}
			/>

			<div className={styles.btn__add__container}>
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
					isAdding={isAdding}
					isUpdating={isUpdating}
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
					isAdding={isAdding}
					isUpdating={isUpdating}
				/>
			)}
			{isDeleting && (
				<Modal
					acceptButtonText={'Delete'}
					cancelButtonText={'Cancel'}
					cancelButtonOnClick={closeDeleteItemModal}
					acceptButtonOnClick={requestDeleteToDoItem}
					hasInput={hasInput}
					titleTask={titleTask}
					questionText={`Do you really want to delete the task "${titleTask}"?`}
				></Modal>
			)}
		</div>
	);
}
