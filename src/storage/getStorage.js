const getSaveEmail = () => JSON.parse(localStorage.getItem('user')).email;

export default getSaveEmail;
