export const getQuestAPI = async (numberQuest: string, category: string) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1000) + 2000)
  );

  const res = await fetch(
    `https://opentdb.com/api.php?amount=${numberQuest}&category=${category}`
  );
  const data = await res.json();

  const shuffleArray = (array: any) => {
    return array.sort((a: string, b: string) => {
      const firstLetterA = a.charAt(0).toLowerCase();
      const firstLetterB = b.charAt(0).toLowerCase();

      if (firstLetterA < firstLetterB) {
        return -1;
      }
      if (firstLetterA > firstLetterB) {
        return 1;
      }
      return 0;
    });
  };

  const shuffledResults = data.results.map((question: any) => {
    const options = shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);
    return { ...question, options };
  });

  return shuffledResults;
};

export const getCategoryAPI = async () => {
  const res = await fetch("https://opentdb.com/api_category.php");

  const data = await res.json();

  return data.trivia_categories;
};
