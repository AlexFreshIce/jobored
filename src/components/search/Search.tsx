import "./Search.scss";

import { useState } from "react";
import { Button } from "@mantine/core";

const Search = () => {
  const placeholder = "      Введите название вакансии";
  const [searchVal, setSearchVal] = useState("");
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setSearchVal(event.target.value);
    }
  };
  return (
    <div className="search">
      <form className="search__form" action="submit">
        <input
          className="search__input"
          placeholder={placeholder}
          value={searchVal}
          onChange={onChangeValue}
          type="search"
        />
        <Button className="search__btn" radius="md">
          Поиск
        </Button>
      </form>
    </div>
  );
};

export default Search;
