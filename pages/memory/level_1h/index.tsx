import { useState, useEffect } from 'react';
import styles from '../../../styles/MemoryQuizzes.module.css';
import commonStyles from '../../../styles/Common.module.css';
import { getShuffledABC } from '../../../utils';
import MainLayout from '../../../components/layouts/MainLayout';

export default function MemoryQuizzesOne() {
	const [cards, setCards] = useState([]);
	const [flippedByID, setFlippedByID] = useState<{
		[id: string]: { _id: string; word: string };
	}>({});
	const [matchedByID, setMatchedByID] = useState({});

	useEffect(() => {
		// Initialize the cards with sight words and initial state
		setCards(getShuffledABC());
	}, []);

	const handleCardClick = (card: { _id: string; word: string }) => {
		if (
			Object.keys(flippedByID).length === 2 ||
			flippedByID[card._id] ||
			matchedByID[card._id]
		) {
			return;
		}

		const newFlippedByID = { ...flippedByID, [card._id]: card };
		setFlippedByID(newFlippedByID);
		const cards = Object.values(newFlippedByID);

		if (cards.length === 2) {
			if (cards[0].word === cards[1].word) {
				setMatchedByID({
					...matchedByID,
					[cards[0]._id]: cards[0],
					[cards[1]._id]: cards[1],
				});
			}

			setTimeout(() => {
				setFlippedByID({});
			}, 400);
		}
	};

	return (
		<MainLayout>
			<h3>Match all the letters</h3>
			{Object.values(matchedByID).length === cards.length ? (
				<>
					<p className={commonStyles.NoteBar}>
						Great job!! All correct!!{' '}
						{new Date().toLocaleDateString()}
					</p>
					<button
						className={commonStyles.DoneBtn}
						role='button'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setFlippedByID({});
							setMatchedByID({});
							setCards(getShuffledABC());
						}}
					>
						Start Again
					</button>
				</>
			) : null}
			<div className={styles.wordGridH}>
				{cards.map((card, index) => {
					const isFlipped = flippedByID[card._id];
					const isMatched = matchedByID[card._id];

					const className = isFlipped
						? styles.wordCardFlipped
						: isMatched
						? styles.wordCardMatched
						: styles.wordCardCovered;

					return (
						<div
							key={index}
							// className={styles.wordCardGeneralH}
							className={`${styles.wordCardGeneralH} ${className}`}
							onClick={() => handleCardClick(card)}
						>
							{isFlipped || isMatched ? card.word : ''}
						</div>
					);
				})}
			</div>
		</MainLayout>
	);
}
