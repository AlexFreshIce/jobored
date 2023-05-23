import { CatalogueType } from "../../types";

export type FilterComponentType = {
  onSubmitHandler(event: React.FormEvent<HTMLFormElement>): void;
  filterIsLoading: boolean;
  onChangeIndustry(val: string): void;
  industryValue: string;
  cataloguesArr: CatalogueType[];
  onChangeSalaryFrom(val: number): void; 
  onChangeSalaryTo(val: number): void; 
  salaryFromValue: number;
  salaryToValue: number;
  clearFilterHandle(): void;
};