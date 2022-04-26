export const setSaveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const mealsToken = () => {
  localStorage.setItem('mealsToken', JSON.stringify(1));
};

export const cocktailsToken = () => {
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
};
