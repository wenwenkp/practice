import { useEffect, useState } from 'react';
import MainLayout from '../../../components/layouts/MainLayout';
import styles from './MathQuizzes.module.css';
import { generateMathQuizzes } from './utils';

const totalQuizzesNum = 18;
const maxNum = 16;

export default function MathQuizzes() {
	const [myAnswerByID, setMyAnswerByID] = useState({});
	const [quizzes, setQuizzes] = useState([]);
	const [showAnswers, setShowAnswers] = useState(false);

	useEffect(() => {
		setQuizzes(generateMathQuizzes(totalQuizzesNum, maxNum));
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
				<p className={styles.NoteBar}>
					Great job!! All correct!! {new Date().toLocaleDateString()}
				</p>
				<button
					className={styles.DoneBtn}
					role='button'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setShowAnswers(false);
						setQuizzes(
							generateMathQuizzes(totalQuizzesNum, maxNum)
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
				{quizzes?.map(({ answer, num1, num2, type, _id }) => {
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
								{num1} {type} {num2} =
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
				})}
			</div>
			<div className={styles.DoneArea}>
				{remainingQuizzesNum > 0 ? (
					<p className={styles.NoteBar}>
						{remainingQuizzesNum} math questions to do.
					</p>
				) : showAnswers ? (
					<button
						className={styles.DoneBtn}
						role='button'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setShowAnswers(false);
							setQuizzes(
								generateMathQuizzes(totalQuizzesNum, maxNum)
							);
							setMyAnswerByID({});
						}}
					>
						Start Again
					</button>
				) : (
					<button
						className={styles.DoneBtn}
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
