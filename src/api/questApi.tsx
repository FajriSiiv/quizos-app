export const getQuestAPI = async (numberQuest: string, category: string) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1000) + 2000)
  );

  const res = await fetch(
    `https://opentdb.com/api.php?amount=${numberQuest}&category=${category}`
  );
  const data = await res.json();

  return data.results;
};

export const getCategoryAPI = async () => {
  const res = await fetch("https://opentdb.com/api_category.php");

  const data = await res.json();

  return data.trivia_categories;
};
