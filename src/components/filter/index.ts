import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  filterChangeAllValue,
  filterClear,
  getCataloguesArr,
  selectCataloguesArr,
  selectFilter,
  selectIsLoading,
} from "../../store/slice/filterSlice";
import { FilterComponent } from "./FilterComponent";

export const Filter: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cataloguesArr = useSelector(selectCataloguesArr);
  const filterIsLoading = useSelector(selectIsLoading);
  const currentFilterValue = useSelector(selectFilter);
  const { catalogues, payment_from, payment_to } = currentFilterValue;
  const [selectValue, setSelectValue] = useState(catalogues);
  const [inputFromValue, setInputFromValue] = useState(payment_from);
  const [inputToValue, setInputToValue] = useState(payment_to);

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
      dispatch(getCataloguesArr());
  }, []);

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
