import styles from './App.module.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { TaskPage } from './pages/TaskPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/task/:id" element={<TaskPage />} />
			<Route path="/404" element={<NotFoundPage />} />
			<Route path="*" element={<Navigate to="/404" replace />} />
		</Routes>
	);
}
