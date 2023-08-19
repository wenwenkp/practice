import { useEffect, useState } from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import styles from './MathQuizzes.module.css';

const totalQuizzesNum = 18;
const maxNum = 16;

function generateMathQuizzes() {
	const quizzes = [];
	const operators = ['+', '-'];
	let uniqueId = 1;

	for (let i = 0; i < totalQuizzesNum; i++) {
		const num1 = Math.floor(Math.random() * maxNum); // Generate random integer between 0 and 30
		const num2 = Math.floor(Math.random() * maxNum);
		const operator =
			operators[Math.floor(Math.random() * operators.length)];

		if (operator === operators[0]) {
			quizzes.push({
				num1,
				num2,
				answer: `${num1 + num2}`,
				type: operators[0],
				_id: uniqueId,
			});
		} else {
			if (num1 >= num2) {
				quizzes.push({
					num1,
					num2,
					answer: `${num1 - num2}`,
					type: operators[1],
					_id: uniqueId,
				});
			} else {
				quizzes.push({
					num1: num2,
					num2: num1,
					answer: `${num2 - num1}`,
					type: operators[1],
					_id: uniqueId,
				});
			}
		}

		uniqueId++;
	}

	return quizzes;
}

export default function MathQuizzes() {
	const [myAnswerByID, setMyAnswerByID] = useState({});
	const [quizzes, setQuizzes] = useState([]);
	const [showAnswers, setShowAnswers] = useState(false);

	useEffect(() => {
		setQuizzes(generateMathQuizzes());
	}, []);

	const doneQuizzesNum = Object.values(myAnswerByID).filter(
		(value) => typeof value === 'string' && value !== ''
	).length;
	const remainingQuizzesNum = totalQuizzesNum - doneQuizzesNum;
	const correctNum = showAnswers
		? quizzes.filter((quiz) => quiz.answer === myAnswerByID[quiz._id])
				.length
		: 0;

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
						{remainingQuizzesNum} math questions to do!!
					</p>
				) : showAnswers ? (
					<button
						className={styles.DoneBtn}
						role='button'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setShowAnswers(false);
							setQuizzes(generateMathQuizzes());
							setMyAnswerByID({});
						}}
					>
						Start Again!
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
						Done and Show Answers to Daddy!!
					</button>
				)}
				{showAnswers ? (
					<p className={styles.NoteBar}>
						{correctNum === totalQuizzesNum
							? 'Great job!! All correct!! Make a screenshot and show send to Daddy!'
							: `You have ${correctNum} correct! Try again!`}
					</p>
				) : null}
			</div>
		</MainLayout>
	);
}
