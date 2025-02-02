import { updateEntry } from "../Rent/service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateEntry = () => {
  const UpdateEntryMutate = useMutation((data) => updateEntry(data));

  return UpdateEntryMutate;
};
