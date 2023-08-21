import React from 'react';
import styles from './styles.module.css';

const Card = ({ value, onClick, isFlipped }) => {
	const cardClass = isFlipped ? styles.cardFlipped : styles.card;

	return (
		<div className={cardClass} onClick={onClick}>
			<div className={styles.cardInner}>
				<div className={styles.cardFront}>{isFlipped ? value : ''}</div>
				<div className={styles.cardBack}>{isFlipped ? value : ''}</div>
			</div>
		</div>
	);
};

export default Card;
