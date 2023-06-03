import { ActionIcon, Button, NumberInput, Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { FC } from "react";
import "./styles.scss";
import { FilterComponentType } from "./types";

export const FilterComponent: FC<FilterComponentType> = (props) => {
  const {
    onSubmitHandler,
    onChangeIndustry,
    onChangeSalaryFrom,
    onChangeSalaryTo,
    clearFilterHandle,
    filterIsLoading,
    industryValue,
    salaryFromValue,
    salaryToValue,
    cataloguesArr,
  } = props;

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
          onChange={onChangeIndustry}
          value={industryValue}
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
          onChange={onChangeSalaryFrom}
          value={salaryFromValue || ""}
          placeholder="От"
          label="Оклад"
        />

        <NumberInput
          data-elem="salary-to-input"
          min={0}
          step={1000}
          onChange={onChangeSalaryTo}
          value={salaryToValue || ""}
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
          onClick={clearFilterHandle}
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
