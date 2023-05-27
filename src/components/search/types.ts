export type SearchComponentType = {
  placeholder: string;
  searchValue: string;
  onSubmitHandler(event: React.FormEvent<HTMLFormElement>): void;
  onChangeValue(event: React.ChangeEvent<HTMLInputElement>): void;
};
