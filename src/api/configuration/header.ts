import { API_TOKEN } from "@env";

export const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};
