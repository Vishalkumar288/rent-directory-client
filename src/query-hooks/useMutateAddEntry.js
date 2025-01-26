import { createNewEntry } from "../Rent/service";
import { useMutation } from "@tanstack/react-query";

export const useMutateAddEntry = () => {
  const newEntryMutate = useMutation((data) => createNewEntry(data));

  return newEntryMutate;
};
