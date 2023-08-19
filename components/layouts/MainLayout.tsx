import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './MainLayout.module.css';
import commonStyles from '../../styles/Common.module.css';

const MainLayout = ({ children }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Fun Practice</title>
			</Head>
			<nav>
				<Link href='/' className={commonStyles.NoDecorationLink}>
					<h3 className={styles.header}>Home</h3>
				</Link>
			</nav>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				<div>Powered by WJ</div>
			</footer>
		</div>
	);
};

export default MainLayout;
