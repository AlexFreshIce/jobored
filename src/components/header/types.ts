export type HeaderType = {
  links: {
    link: string;
    label: string;
  }[];
};

export type HeaderComponentType = HeaderType & {
  opened: boolean;
  close(): void;
  toggle(): void;
};
