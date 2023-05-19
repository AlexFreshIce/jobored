import "./Filter.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, NumberInput, ActionIcon } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import {
  getCataloguesArr,
  filterClear,
  filterChangeFromValue,
  filterChangeToValue,
  filterChangeCatalogues,
  selectFromValue,
  selectToValue,
  selectCatalogues,
  selectCataloguesArr,
} from "../../store/slice/filterSlice";
import { selectIsAuth } from "../../store/slice/authSlice";

const Filter = () => {
  // const [selectValue, setSelectValue] = useState("");
  // const [inputFromValue, setInputFromValue] = useState(0);
  // const [inputToValue, setInputToValue] = useState(0);
  const isAuth = useSelector(selectIsAuth);
  const inputFromValue = useSelector(selectFromValue);
  const inputToValue = useSelector(selectToValue);
  const selectValue = useSelector(selectCatalogues);
  const cataloguesArr = useSelector(selectCataloguesArr);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (isAuth) {
    dispatch(getCataloguesArr())};
  }, [isAuth]);

  // useEffect(() => {
  //   console.log(isAuth);
  //   if (!isAuth) {
  //     dispatch(loginUser());
  //   } else {
  //     dispatch(getAllVacancies());
  //   }
  // }, [isAuth, isFilterChange]);

  // const ref = useRef<HTMLInputElement>(null);
  console.log("render");
  return (
    <div className="page-main__filter">
      <h3 className="filter__title">Фильтры</h3>
      <Select
        label="Отрасль"
        placeholder="Выберете отрасль"
        allowDeselect
        // searchable
        onChange={(val) => dispatch(filterChangeCatalogues(val))}
        value={selectValue}
        // nothingFound="Отрасль не найдена"
        // dropdownComponent
        data={cataloguesArr}
        // defaultValue={"phone"}
        rightSection={<IconChevronDown size="1rem" />}
        rightSectionWidth={40}
        styles={{ rightSection: { pointerEvents: "none" } }}
      />
      <NumberInput
        min={0}
        step={1000}
        onChange={(val: number) => dispatch(filterChangeFromValue(val))}
        value={inputFromValue}
        placeholder="От"
        label="Оклад"
      />
      <NumberInput
        min={inputFromValue}
        step={1000}
        onChange={(val: number) => dispatch(filterChangeToValue(val))}
        value={inputToValue}
        placeholder="До"
      />
      {/* <button className="filter__btn-reset">Сбросить все ×</button> */}
      <ActionIcon
        onClick={() => {
          dispatch(filterClear());
        }}
        size={20}
        className="filter__btn-reset"
      >
        <p>Сбросить все ×</p>
      </ActionIcon>
    </div>
  );
};

export default Filter;
