import styles from './App.module.css';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { TaskPage } from './pages/TaskPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
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

	const requestDeleteToDoItem = (id) => {
		fetch(`http://localhost:3004/toDos/${idTask}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => {
				rawResponse.json();
			})
			.then((deleteItem) => {
				refreshToDos();
			})
			.finally(() => closeDeleteItemModal());
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
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/task/:id" element={<TaskPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</div>
	);
}
