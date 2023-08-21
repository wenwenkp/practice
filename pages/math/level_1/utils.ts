export function generateMathQuizzes(totalQuizzesNum: number, maxNum: number) {
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
