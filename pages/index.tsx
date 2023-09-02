import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';
import Link from 'next/link';
import MainLayout from '../components/layouts/MainLayout';

export default function Home() {
	return (
		<MainLayout>
			<h1 className={styles.title}>Welcome</h1>
			<h2>Samuel's homework:</h2>
			<main className={styles.category}>
				<div className={styles.grid}>
					<Link
						href='/math/level_1'
						className={commonStyles.NoDecorationLink}
					>
						<div className={commonStyles.card}>
							<h3>Math</h3>
							<span>Level 1</span>
						</div>
					</Link>
				</div>
				<div className={styles.grid}>
					<Link
						href='/math/level_2'
						className={commonStyles.NoDecorationLink}
					>
						<div className={commonStyles.card}>
							<h3>Math</h3>
							<span>Level 2</span>
						</div>
					</Link>
				</div>
				<div className={styles.grid}>
					<Link
						href='/memory/level_1'
						className={commonStyles.NoDecorationLink}
					>
						<div className={commonStyles.card}>
							<h3>Memory</h3>
							<span>Level 1</span>
						</div>
					</Link>
				</div>
			</main>
			<h2>Hannah's homework:</h2>
			<main className={styles.category}>
				<div className={styles.grid}>
					<Link
						href='/memory/level_1h'
						className={commonStyles.NoDecorationLink}
					>
						<div className={commonStyles.card}>
							<h3>Memory</h3>
							<span>Level 1</span>
						</div>
					</Link>
				</div>
			</main>
		</MainLayout>
	);
}
