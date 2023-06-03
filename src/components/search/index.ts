import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { filterSetKeyword, selectKeyword } from "../../store/slice/filterSlice";
import { SearchComponent } from "./SearchComponent";

export const Search: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const placeholder = "Введите название вакансии";
  const currentSearchValue = useSelector(selectKeyword);
  const [searchValue, setSearchValue] = useState(currentSearchValue);

  useEffect(() => {
    setSearchValue(currentSearchValue);
  }, [currentSearchValue]);

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentSearchValue !== searchValue) {
      dispatch(filterSetKeyword(searchValue || ""));
    }
  };

  return SearchComponent({
    onSubmitHandler,
    placeholder,
    searchValue,
    onChangeValue,
  });
};
