import styles from './App.module.css';

export function App() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>To Do List</h1>
			<div className={styles.todo__list}>
				<ul>
					<li className={styles.todo__item}>
						<div className={styles.round}></div>
						<div className={styles.item__container}>
							<p>
								Todo item jhbcjsdbhc jsbcjasdbcfjhd jsdbfjhsdbjfhbh
								janbcjhasbjhbhj
							</p>
							<hr className={styles.line} />
						</div>
					</li>
					<li className={styles.todo__item}>
						<div className={styles.round}></div>
						<div className={styles.item__container}>
							<p>Todo item jhbcjsdbhc</p>
							<hr className={styles.line} />
						</div>
					</li>
					<li className={styles.todo__item}>
						<div className={styles.round}></div>
						<div className={styles.item__container}>
							<p>
								Todo item jhbcjsdbhc jsbcjasdbcfjhd jsdbfjhsdbjfhbh
								janbcjhasbjhbhj kjndfijsdh kadjcbjdbv kasjbcjisdcj
								jashbcjhsdabc
							</p>
							<hr className={styles.line} />
						</div>
					</li>
				</ul>
			</div>
			<div className={styles.btn__container}>
				<button className={styles.btn__add}> + </button>
			</div>
		</div>
	);
}
