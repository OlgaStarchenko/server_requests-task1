import styles from './App.module.css';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { TaskPage } from './pages/TaskPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
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
		</div>
	);
}
