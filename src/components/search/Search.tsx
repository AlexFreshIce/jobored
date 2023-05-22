import "./Search.scss";

import { useState } from "react";
import { Button } from "@mantine/core";
import { filterSetKeyword } from "../../store/slice/filterSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch<any>();
  const placeholder = "      Введите название вакансии";
  const [searchValue, setSearchValue] = useState("");

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setSearchValue(event.target.value);
    }
  };
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(filterSetKeyword(searchValue || ""));
  };
  return (
    <div className="search">
      <form className="search__form" onSubmit={onSubmitHandler}>
        <input
          data-elem="search-input"
          className="search__input"
          placeholder={placeholder}
          value={searchValue}
          onChange={onChangeValue}
          type="search"
        />
        <Button data-elem="search-button" className="search__btn" radius="md" type="submit">
          Поиск
        </Button>
      </form>
    </div>
  );
};

export default Search;
