const getSaveEmail = () => JSON.parse(localStorage.getItem('email')) || [];

export default getSaveEmail;
