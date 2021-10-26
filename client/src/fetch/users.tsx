import { useQuery } from "react-query";
import { getResource } from "./fetcher";

const getUser = async () => {
  const data = await getResource("/auth/users/me/");

  return data;
};

export default function useUser() {
  return useQuery("user", () => getUser());
}
