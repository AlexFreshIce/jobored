import "./Search.scss";

import { FC } from "react";
import { Button } from "@mantine/core";
import { SearchComponentType } from "./types";
import { IconSearch } from "@tabler/icons-react";

export const SearchComponent: FC<SearchComponentType> = (props) => {
  const { onSubmitHandler, placeholder, searchValue, onChangeValue } = props;

  return (
    <div className="search">
      <form className="search__form" onSubmit={onSubmitHandler}>
        <div className="search__input-component">
          <IconSearch className="search__input-icon" />
          <input
            data-elem="search-input"
            className="search__input"
            placeholder={placeholder}
            value={searchValue}
            onChange={onChangeValue}
            type="search"
          />
        </div>
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
