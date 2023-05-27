import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectIsAuth } from "../../store/slice/authSlice";
import {
  filterChangeAllValue,
  filterClear,
  getCataloguesArr,
  selectCataloguesArr,
  selectIsLoading,
} from "../../store/slice/filterSlice";
import { FilterComponent } from "./FilterComponent";

export const Filter: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectValue, setSelectValue] = useState("");
  const [inputFromValue, setInputFromValue] = useState(0);
  const [inputToValue, setInputToValue] = useState(0);
  const isAuth = useSelector(selectIsAuth);
  const cataloguesArr = useSelector(selectCataloguesArr);
  const filterIsLoading = useSelector(selectIsLoading);

  const onChangeIndustry = (val: string) => {
    setSelectValue(val);
  };

  const onChangeSalaryFrom = (val: number) => {
    setInputFromValue(val);
  };

  const onChangeSalaryTo = (val: number) => {
    setInputToValue(val);
  };

  const clearFilterHandle = () => {
    setSelectValue("");
    setInputFromValue(0);
    setInputToValue(0);
    dispatch(filterClear());
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      selectValue: selectValue || "",
      inputFromValue: inputFromValue || 0,
      inputToValue: inputToValue || 0,
    };
    dispatch(filterChangeAllValue(payload));
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(getCataloguesArr());
    }
  }, [isAuth]);

  return FilterComponent({
    onSubmitHandler,
    filterIsLoading,
    onChangeIndustry,
    industryValue: selectValue,
    cataloguesArr,
    onChangeSalaryFrom,
    onChangeSalaryTo,
    salaryFromValue: inputFromValue,
    salaryToValue: inputToValue,
    clearFilterHandle,
  });
};
