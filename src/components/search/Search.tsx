import "./Search.scss";

import { useState } from "react";
import { Button } from "@mantine/core";
import { filterSetKeyword, selectKeyword } from "../../store/slice/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const placeholder = "      Введите название вакансии";
  const [searchValue, setSearchValue] = useState("");
  const currentSearchValue = useSelector(selectKeyword);
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentSearchValue !== searchValue) {
      dispatch(filterSetKeyword(searchValue || ""));
    }
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
        <Button
          data-elem="search-button"
          className="search__btn"
          radius="md"
          type="submit"
        >
          Поиск
        </Button>
      </form>
    </div>
  );
};

export default Search;
