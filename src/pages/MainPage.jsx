import React from 'react';
import styles from './maimPage.module.css';
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

	const [searchText, setSearchText] = useState('');
	const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);

	const timerRef = useRef(null);

	const refreshToDos = () => {
		setRefreshToDosFlag(!refreshToDosFlag);
	};

	useEffect(() => {
		console.log('MainPage useEffect запустился');

		setIsLoading(true);

		fetch('http://localhost:3004/toDos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setOriginalToDoList(loadedToDos);
				setViewToDoList(loadedToDos);
				console.log('Данные с сервера', loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshToDosFlag]);

	return <div>MainPage</div>;
}
