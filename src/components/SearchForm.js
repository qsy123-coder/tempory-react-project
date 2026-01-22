import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef("");

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleChange = () => {
    const value = searchValue.current.value;

    setSearchTerm(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="search section">
      <form action="" className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="cocktail">Input your favourite cocktail</label>
          <input
            type="text"
            id="cocktail"
            name="cocktail"
            ref={searchValue}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
