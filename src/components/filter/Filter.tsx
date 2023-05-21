import "./Filter.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, NumberInput, ActionIcon, Button } from "@mantine/core";
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
  selectIsLoading,
} from "../../store/slice/filterSlice";
import { selectIsAuth } from "../../store/slice/authSlice";

const Filter = () => {
  const dispatch = useDispatch<any>();

  const isAuth = useSelector(selectIsAuth);
  const inputFromValue = useSelector(selectFromValue);
  const inputToValue = useSelector(selectToValue);
  const selectValue = useSelector(selectCatalogues);
  const cataloguesArr = useSelector(selectCataloguesArr);
  const filterIsLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (isAuth) {
      dispatch(getCataloguesArr());
    }
  }, [isAuth]);

  return (
    <div className="page__filter">
      <h3 className="filter__title">Фильтры</h3>
      <Select
        label="Отрасль"
        placeholder="Выберете отрасль"
        allowDeselect
        disabled={filterIsLoading}
        // searchable
        // clearable
        onChange={(val) => dispatch(filterChangeCatalogues(val))}
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
      <Button className="filter__btn-submit" radius="md">
      Применить
        </Button>

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
