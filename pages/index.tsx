import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';
import Link from 'next/link';
import MainLayout from '../components/layouts/MainLayout';

export default function Home() {
	return (
		<MainLayout>
			<main className={styles.main}>
				<h1 className={styles.title}>Welcome</h1>
				<div className={styles.grid}>
					<Link
						href='/math/level_1'
						className={commonStyles.NoDecorationLink}
					>
						<div className={commonStyles.card}>
							<h3>Math Practice &rarr;</h3>
							<span>Level 1</span>
						</div>
					</Link>
				</div>
			</main>
		</MainLayout>
	);
}
