export const salary = (
  payment_from: string | number,
  payment_to: string | number,
  currency: string
) => {
  let payment = "з/п ";
  const paymentFrom =
    payment_from && payment_from !== "0" && payment_from !== "";
  const paymentTo = payment_to && payment_to !== "0" && payment_to !== "";
  if (paymentFrom && paymentTo) {
    payment += payment_from + " - " + payment_to + " " + currency;
  } else if (paymentFrom) {
    payment += " от " + payment_from + " " + currency;
  } else if (paymentTo) {
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
  id: string | null
) => {
  const jsonString = localStorage.getItem("favoriteVacancies");
  const favoriteVacancies = jsonString
    ? JSON.parse(jsonString)
    : { objects: [], total: 0 };
  const { objects } = favoriteVacancies;
  let newVacanciesArr = [];
  switch (action) {
    case "add":
      newVacanciesArr = [...objects, vacancy];
      break;
    case "remove":
      newVacanciesArr = objects.filter(
        (item: { id: string }) => item.id !== id
      );
      break;
  }
  localStorage.setItem(
    "favoriteVacancies",
    JSON.stringify({ total: newVacanciesArr.length, objects: newVacanciesArr })
  );
};
