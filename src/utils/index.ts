import { VacancyType } from "../types";

export const salary = (vacancy: VacancyType) => {
  const { payment_from, payment_to, currency } = vacancy;
  let payment = "з/п ";

  if (payment_from && payment_to) {
    payment += payment_from + " - " + payment_to + " " + currency;
  } else if (payment_from) {
    payment += " от " + payment_from + " " + currency;
  } else if (payment_to) {
    payment += " до " + payment_to + " " + currency;
  } else {
    // payment += "не указана";
    payment += "по договоренности";
  }
  return payment;
};

export const changeFavoritesInLocalStorage = (
  action: string,
  vacancy: {} | null,
  id: number | null
) => {
  const jsonString = localStorage.getItem("favoriteVacancies");
  const favoriteVacancies = jsonString
    ? JSON.parse(jsonString)
    : { objects: [], total: 0 };
  const { objects } = favoriteVacancies;

  const getNewVacanciesArray = () => {
    switch (action) {
      case "add":
        return [...objects, vacancy];
      case "remove":
        return objects.filter(
          (item: { id: number }) => item.id !== id
        );
    }
  }

  const newVacancies = getNewVacanciesArray();

  localStorage.setItem(
    "favoriteVacancies",
    JSON.stringify({ total: newVacancies.length, objects: newVacancies })
  );
};
