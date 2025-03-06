import { loginApi } from "../Rent/service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const user = useMutation((data) => loginApi(data));

  return user;
};
