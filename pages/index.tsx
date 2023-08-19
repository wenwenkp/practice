import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';
import Link from 'next/link';
import MainLayout from '../components/layouts/MainLayout';

export default function Home() {
	return (
		<MainLayout>
			<main className={styles.main}>
				<h1 className={styles.title}>Welcome, Samuel.</h1>
				<div className={styles.grid}>
					<Link href='/math' className={commonStyles.NoDecorationLink}>
						<div className={commonStyles.card}>
							<h3>Math Practice &rarr;</h3>
							<span>Practice your math skills!</span>
						</div>
					</Link>
				</div>
			</main>
		</MainLayout>
	);
}
