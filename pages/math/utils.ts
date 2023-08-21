export function generateMathQuizzesOne(
	totalQuizzesNum: number,
	maxNum: number
) {
	const quizzes = [];
	const operators = ['+', '-'];

	for (let i = 0; i < totalQuizzesNum; i++) {
		let num1 = Math.floor(Math.random() * maxNum);
		let num2 = Math.floor(Math.random() * maxNum);
		const operator =
			operators[Math.floor(Math.random() * operators.length)];
		let answer: number, operator1: string;

		if (operator === '+') {
			answer = num1 + num2;
			operator1 = '+';
		} else {
			operator1 = '-';
			if (num1 >= num2) {
				answer = num1 - num2;
			} else {
				answer = num2 - num1;
				// Swap the numbers to keep num1 >= num2
				[num1, num2] = [num2, num1];
			}
		}

		quizzes.push({
			num1,
			num2,
			answer: answer.toString(),
			operator1,
			_id: i + 1,
		});
	}

	return quizzes;
}

export function generateMathQuizzesTwo(
	totalQuizzesNum: number,
	maxNum: number
) {
	const quizzes = [];

	for (let i = 0; i < totalQuizzesNum; i++) {
		const num1 = Math.floor(Math.random() * maxNum); // Random number between 0 and 30
		const num2 = Math.floor(Math.random() * maxNum);
		const num3 = Math.floor(Math.random() * maxNum);

		const operators = ['+', '-'];
		const operator1 =
			operators[Math.floor(Math.random() * operators.length)];
		const operator2 =
			operators[Math.floor(Math.random() * operators.length)];

		let answer: number;
		if (operator1 === '+') {
			answer = num1 + num2;
		} else {
			answer = num1 - num2;
		}

		if (operator2 === '+') {
			answer += num3;
		} else {
			answer -= num3;
		}

		if (answer <= 30 && answer > -1) {
			quizzes.push({
				num1,
				num2,
				num3,
				operator1,
				operator2,
				answer: answer.toString(),
				_id: i + 1,
			});
		} else {
			i--; // Retry generating the quiz
		}
	}

	return quizzes;
}
