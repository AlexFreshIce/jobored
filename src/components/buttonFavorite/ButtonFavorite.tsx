import "./ButtonFavorite.scss";
import { ActionIcon } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const ButtonFavorite = () => {
  return (
    <ActionIcon size={22} className="vacancy__btn-favorite">
      <IconStar />
    </ActionIcon>
  );
};

export default ButtonFavorite;
