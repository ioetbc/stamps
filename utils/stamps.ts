import {STAMPS_PER_CARD} from "../constants";

export const getPoints = (count: number) => {
  return (count % STAMPS_PER_CARD) - 1;
};
