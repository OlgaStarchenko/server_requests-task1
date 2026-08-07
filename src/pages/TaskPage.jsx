import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './taskPage.module.css';

export function TaskPage() {
	const [task, setTask] = useState({
		id: '',
		title: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);

		fetch(`http://localhost:3004/toDos/${id}`)
			.then((loadingData) => loadingData.json())
			.then((loadedTask) => {
				setTask(loadedTask);
			})
			.finally(() => setIsLoading(false));
	}, [id]);

	return (
		<div>
			{isLoading ? <div className={styles.loader}></div> : <p>{task.title}</p>}
			<Button text={'Назад'} onClick={() => navigate(-1)} />
		</div>
	);
}
