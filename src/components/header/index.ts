import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { changeCurrentPage } from "../../store/slice/filterSlice";
import { HeaderComponent } from "./HeaderComponent";
import { HeaderType } from "./types";

export const Header: FC<HeaderType> = (props) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();

  const onChangeCurrentPage = () => {
    dispatch(changeCurrentPage(1));
    close();
  };

  return HeaderComponent({
    ...props,
    opened,
    toggle,
    close: onChangeCurrentPage,
  });
};
