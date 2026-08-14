import React from 'react';
import styles from './mainPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { ToDoList } from '../components/ToDoList';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';

export function MainPage() {
	const [originalToDoList, setOriginalToDoList] = useState([]);
	const [viewToDoList, setViewToDoList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [refreshToDosFlag, setRefreshToDosFlag] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [hasInput, setHasInput] = useState(false);
	const [itemText, setItemText] = useState('');
	const [searchText, setSearchText] = useState('');
	const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);

	const timerRef = useRef(null);

	const refreshToDos = () => {
		setRefreshToDosFlag((prev) => !prev);
	};

	const handleSearchChange = ({ target }) => {
		let newInputValue = target.value;
		setInputValue(newInputValue);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setSearchText(newInputValue);
		}, 1500);
	};

	const toggleIsSorted = () => {
		setIsSortedAlphabetically((prev) => !prev);
	};

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3004/toDos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setOriginalToDoList(loadedToDos);
				setViewToDoList(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshToDosFlag]);

	useEffect(() => {
		let updateToDoList;

		if (searchText.trim() === '') {
			updateToDoList = [...originalToDoList];
		} else {
			updateToDoList = originalToDoList.filter((toDoItem) =>
				toDoItem.title.toLowerCase().includes(searchText.toLowerCase()),
			);
		}

		if (isSortedAlphabetically) {
			updateToDoList.sort((a, b) => a.title.localeCompare(b.title));
		}

		setViewToDoList(updateToDoList);
	}, [searchText, originalToDoList, isSortedAlphabetically]);

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

	const openAddItemModal = () => {
		setIsAdding(true);
		setHasInput(true);
	};

	const closeAddItemModal = () => {
		setIsAdding(false);
		setItemText('');
		setHasInput(false);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo List</h1>

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

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<ToDoList toDoList={viewToDoList} />
			)}
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
				/>
			)}
		</div>
	);
}
