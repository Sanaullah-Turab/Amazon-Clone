import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export let deliveryOptions = [
  {
    id: 1,
    date: dayjs().add(7, "day"),
    priceCents: 0,
  },
  {
    id: 2,
    date: dayjs().add(4, "day"),
    priceCents: 499,
  },
  {
    id: 3,
    date: dayjs().add(1, "day"),
    priceCents: 999,
  },
];

export function FormatDate(date) {
  return date.format("dddd, MMMM D");
}

export function FormatPrice(priceCents) {
  return priceCents > 0 ? `$${priceCents / 100}` : `FREE Shipping`;
}

export function GetDeliveryPrice(deliveryOptionId) {
  let matchingOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingOption = option;
    }
  });
  return matchingOption.priceCents;
}

export function GetDeliveryDate(deliveryOptionId) {
  let matchingOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingOption = option;
    }
  });
  return FormatDate(matchingOption.date);
}
