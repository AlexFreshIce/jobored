import "./Filter.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, NumberInput, ActionIcon, Button } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import {
  getCataloguesArr,
  filterChangeAllValue,
  selectCataloguesArr,
  selectIsLoading,
} from "../../store/slice/filterSlice";
import { selectIsAuth } from "../../store/slice/authSlice";
import { AppDispatch } from "../../store";

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectValue, setSelectValue] = useState("");
  const [inputFromValue, setInputFromValue] = useState(0);
  const [inputToValue, setInputToValue] = useState(0);
  const isAuth = useSelector(selectIsAuth);
  const cataloguesArr = useSelector(selectCataloguesArr);
  const filterIsLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (isAuth) {
      dispatch(getCataloguesArr());
    }
  }, [isAuth]);

  // const handleFilterApply = (
  //   selectValue: string,
  //   inputFromValue: number,
  //   inputToValue: number
  // ) => {
  //   const payload = {
  //     selectValue: selectValue || "",
  //     inputFromValue: inputFromValue || 0,
  //     inputToValue: inputToValue || 0,
  //   };
  //   dispatch(filterChangeAllValue(payload));
  // };
  const clearFilterHandle = () => {
    setSelectValue("");
    setInputFromValue(0);
    setInputToValue(0);
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

  return (
    <div className="filter">
      <form className="filter__form" onSubmit={onSubmitHandler}>
        <h3 className="filter__title">Фильтры</h3>
        <Select
          data-elem="industry-select"
          label="Отрасль"
          placeholder="Выберете отрасль"
          allowDeselect
          disabled={filterIsLoading}
          // searchable
          // clearable
          // onChange={(val) => dispatch(filterChangeCatalogues(val))}
          onChange={(val: string) => setSelectValue(val)}
          value={selectValue}
          selectOnBlur
          // nothingFound="Отрасль не найдена"
          // initiallyOpened
          data={cataloguesArr}
          rightSection={<IconChevronDown size="1rem" />}
          rightSectionWidth={40}
          styles={{ rightSection: { pointerEvents: "none" } }}
        />

        <NumberInput
          data-elem="salary-from-input"
          min={0}
          step={1000}
          // onChange={(val: number) => dispatch(filterChangeFromValue(val))}
          onChange={(val: number) => setInputFromValue(val)}
          value={inputFromValue || ""}
          placeholder="От"
          label="Оклад"
        />

        <NumberInput
          data-elem="salary-to-input"
          min={inputFromValue}
          step={1000}
          // onChange={(val: number) => dispatch(filterChangeToValue(val))}
          onChange={(val: number) => setInputToValue(val)}
          value={inputToValue || ""}
          placeholder="До"
        />
        <Button
          data-elem="search-button"
          className="filter__btn-submit"
          radius="md"
          type="submit"
        >
          Применить
        </Button>

        <ActionIcon
          onClick={() => {
            clearFilterHandle();
            // dispatch(filterClear());
          }}
          type="button"
          size={20}
          className="filter__btn-reset"
        >
          <p>Сбросить все ×</p>
        </ActionIcon>
      </form>
    </div>
  );
};

export default Filter;
