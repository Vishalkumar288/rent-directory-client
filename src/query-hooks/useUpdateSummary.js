import { updateSummary } from "../Rent/service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSummary = () => {
  const UpdateSummaryMutate = useMutation((data) => updateSummary(data));

  return UpdateSummaryMutate;
};
