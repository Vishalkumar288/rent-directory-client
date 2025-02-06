import { demoUserLogin } from "../Rent/service";
import { useMutation } from "@tanstack/react-query";

export const useDemoLogin = () => {
  const demoUser = useMutation(() => demoUserLogin());

  return demoUser;
};
