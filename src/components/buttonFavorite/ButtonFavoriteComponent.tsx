import "./ButtonFavorite.scss";
import { ActionIcon } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { FC } from "react";
import { ButtonFavoriteComponentType } from "./types";

export const ButtonFavoriteComponent: FC<ButtonFavoriteComponentType> = (
  props
) => {
  const { vacancyId, addToFavoritesHandler, isActive } = props;

  const dataAttr = `vacancy-${vacancyId}-shortlist-button`;

  return (
    <ActionIcon
      data-elem={dataAttr}
      key={vacancyId}
      size={22}
      className="vacancy__btn-favorite"
      onClick={addToFavoritesHandler}
    >
      <IconStar
        className={
          isActive ? "btn-favorite btn-favorite--active" : "btn-favorite"
        }
      />
    </ActionIcon>
  );
};
