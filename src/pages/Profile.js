import React from 'react';
import { useHistory } from 'react-router-dom';
// import MyContext from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getSaveEmail from '../storage/getStorage';

function Profile() {
  // const { email } = useContext(MyContext);
  const history = useHistory();

  return (
    <div>
      <Header title="Profile" toHaveSearch={ false } />
      <p data-testid="profile-email">{getSaveEmail()}</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes

      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes

      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
