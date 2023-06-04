import { CatalogueType } from "../../types";

export type FilterComponentType = {
  onSubmitHandler(event: React.FormEvent<HTMLFormElement>): void;
  onChangeIndustry(val: string): void;
  onChangeSalaryFrom(val: number): void;
  onChangeSalaryTo(val: number): void;
  clearFilterHandle(): void;
  filterIsLoading: boolean;
  industryValue: string | null;
  salaryFromValue: number | null;
  salaryToValue: number | null;
  cataloguesArr: CatalogueType[];
};
