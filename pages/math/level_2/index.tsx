import { useEffect, useState } from 'react';
import MainLayout from '../../../components/layouts/MainLayout';
import styles from '../../../styles/MathQuizzes.module.css';
import commonStyles from '../../../styles/Common.module.css';
import { generateMathQuizzesTwo } from '../../../utils';

const totalQuizzesNum = 18;
const maxNum = 11;

export default function MathQuizzesTwo() {
	const [myAnswerByID, setMyAnswerByID] = useState({});
	const [quizzes, setQuizzes] = useState([]);
	const [showAnswers, setShowAnswers] = useState(false);

	useEffect(() => {
		setQuizzes(generateMathQuizzesTwo(totalQuizzesNum, maxNum));
	}, []);

	const doneQuizzesNum = Object.values(myAnswerByID).filter(
		(value) => typeof value === 'string' && value !== ''
	).length;
	const remainingQuizzesNum = totalQuizzesNum - doneQuizzesNum;
	const correctNum = showAnswers
		? quizzes.filter((quiz) => quiz.answer === myAnswerByID[quiz._id])
				.length
		: 0;

	if (showAnswers && correctNum === totalQuizzesNum) {
		return (
			<MainLayout>
				<p className={commonStyles.NoteBar}>
					Great job!! All correct!! {new Date().toLocaleDateString()}
				</p>
				<button
					className={commonStyles.DoneBtn}
					role='button'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setShowAnswers(false);
						setQuizzes(
							generateMathQuizzesTwo(totalQuizzesNum, maxNum)
						);
						setMyAnswerByID({});
					}}
				>
					Start Again
				</button>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className={styles.Paper}>
				{quizzes?.map(
					({
						answer,
						num1,
						num2,
						num3,
						operator1,
						operator2,
						_id,
					}) => {
						const myAnswer = myAnswerByID[_id] || '';
						return (
							<div
								key={_id}
								className={styles.Card}
								style={
									showAnswers
										? {
												backgroundColor:
													myAnswer === answer
														? 'darkseagreen'
														: 'lightcoral',
										  }
										: undefined
								}
							>
								<div>
									{num1} {operator1} {num2} {operator2} {num3}{' '}
									=
								</div>
								<input
									className={styles.Input}
									type='number'
									value={myAnswer}
									onChange={(e) =>
										setMyAnswerByID({
											...myAnswerByID,
											[_id]: e.target.value,
										})
									}
								/>
							</div>
						);
					}
				)}
			</div>
			<div className={styles.DoneArea}>
				{remainingQuizzesNum > 0 ? (
					<p className={commonStyles.NoteBar}>
						{remainingQuizzesNum} math questions to do.
					</p>
				) : showAnswers ? (
					<button
						className={commonStyles.DoneBtn}
						role='button'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setShowAnswers(false);
							setQuizzes(
								generateMathQuizzesTwo(totalQuizzesNum, maxNum)
							);
							setMyAnswerByID({});
						}}
					>
						Start Again
					</button>
				) : (
					<button
						className={commonStyles.DoneBtn}
						role='button'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setShowAnswers(true);
						}}
					>
						Done and Check Answers
					</button>
				)}
			</div>
		</MainLayout>
	);
}
