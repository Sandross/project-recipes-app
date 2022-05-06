// import React, { useState, useEffect } from 'react';
// import { getStorageDoneRecipes } from '../storage/getStorage';
// import ShareRecipes from './ShareRecipes';

// function DoneRecipesCard() {
//   const [getDoneRecipes, setDoneRecipes] = useState([]);

//   useEffect(() => {
//     const doneRecipes = getStorageDoneRecipes();
//     if (doneRecipes) {
//       setDoneRecipes(doneRecipes);
//     }
//   }, []);

//   return (
//     <div>
//       {getDoneRecipes.map((recipe, index) => (
//         <div key={ recipe.id }>
//           <img
//             data-testid={ `${index}-horizontal-image` }
//             src={ recipe.image }
//             alt={ recipe.image }
//             width="80"
//           />
//           <p
//             data-testid={ `${index}-horizontal-top-text` }
//           >
//             {recipe.type === 'drink'
//               ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}`}

//           </p>
//           <h1
//             data-testid={ `${index}-horizontal-name` }
//           >
//             {recipe.name}
//           </h1>
//           <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
//           <p>{recipe.alcoholicOrNot}</p>
//           <ul>
//             {recipe.tags.length > 0
//               && recipe.tags.map((tag, i) => (
//                 <li
//                   data-testid={ `${index}-${tag}-horizontal-tag` }
//                   key={ i }
//                 >
//                   {tag}
//                 </li>
//               ))}
//           </ul>
//           <ShareRecipes
//             share={ `/${recipe.type}s/${recipe.id}` }
//             testid={ `${index}-horizontal-share-btn` }
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DoneRecipesCard;
