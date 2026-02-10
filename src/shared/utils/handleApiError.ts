import { showToast } from "./showToast";
import type { AxiosError } from "axios";

export const handleApiError = (er: AxiosError<{}>) => {
  showToast("error", er.message);
};
