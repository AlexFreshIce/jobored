import "./Filter.scss"
// import { useRef } from 'react';
import { Select, NumberInput, ActionIcon } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const Filter = () => {
  const data = ['React', 'Angular', 'Svelte', 'Vue']
  // const ref = useRef<HTMLInputElement>(null);
  return (
   <div className="page-main__filter">
      <h3 className="filter__title">Фильтры</h3>
      <Select
      label="Отрасль"
      placeholder="Выберете отрасль"
      allowDeselect
      searchable
      // ref={ref} 
      nothingFound="Отрасль не найдена"
      // dropdownComponent
      data={data}
      defaultValue={"phone"}
      rightSection={<IconChevronDown size="1rem" />}
      rightSectionWidth={40}
      styles={{ rightSection: { pointerEvents: 'none' } }}
    />
      <NumberInput
      // defaultValue={0}
      min={0}
      step={10}
      placeholder="От"
      label="Оклад"
    />
      <NumberInput
      min={0}
      step={10}
      // defaultValue={1000000}
      placeholder="До"
    />
     {/* <button className="filter__btn-reset">Сбросить все ×</button> */}
     <ActionIcon size={20} className="filter__btn-reset"><p>Сбросить все ×</p>
      </ActionIcon>
   </div>
  )
}

export default Filter