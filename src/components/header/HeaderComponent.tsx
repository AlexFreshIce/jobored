import {
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { Logo } from "../logo";
import "./Header.scss";
import { FC } from "react";
import { HeaderComponentType } from "./types";


export const HeaderComponent: FC<HeaderComponentType> = (props) => {
  const { links, close, opened, toggle } = props;

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={({ isActive }) =>
        isActive ? "header__link header__link-active" : "header__link"
      }
      onClick={close}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={84} className={"header"}>
      <Container className={"header__container"} size={1148}>
        <Logo />
        <Group spacing={60} className={"header__group"}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={"header__burger"}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={"header__dropdown"} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}