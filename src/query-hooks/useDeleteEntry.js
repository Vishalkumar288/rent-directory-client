import { deleteEntry } from "../Rent/service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteEntry = () => {
  const deleteEntryMutate = useMutation((data) => deleteEntry(data));

  return deleteEntryMutate;
};
