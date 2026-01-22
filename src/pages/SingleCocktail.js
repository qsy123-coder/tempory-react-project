import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktails] = React.useState(null);
  const { id } = useParams();
  const fetchDrinks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const {
          strDrink: name,
          strDrinkThumb: img,
          strCategory: category,
          strAlcoholic: info,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
        } = drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
        ];

        const newCocktails = {
          id,
          name,
          category,
          img,
          info,
          glass,
          instructions,
          ingredients,
        };
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchDrinks();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2>no cocktail to display</h2>;
  } else {
    const { name, category, img, glass, ingredients, info, instructions } =
      cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          go back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={img} alt="" />
          <div className="drink-info">
            <p>
              <span className="drink-data">category:</span>
              {category}
            </p>
            <p>
              <span className="drink-data">glass:</span>
              {glass}
            </p>
            <p>
              <span className="drink-data">instructions:</span>
              {instructions}
            </p>
            <p>
              <span className="drink-data">info:</span>
              {info}
            </p>
            <p>
              <span className="drink-data">gradient:</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;
