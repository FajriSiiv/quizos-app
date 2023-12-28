export const getQuestAPI = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 3000) + 2000)
  );

  const res = await fetch("https://opentdb.com/api.php?amount=10&category=9");
  const data = await res.json();

  return data.results;
};

export const getCategoryAPI = async () => {
  const res = await fetch("https://opentdb.com/api_category.php");

  const data = await res.json();

  return data.trivia_categories;
};
