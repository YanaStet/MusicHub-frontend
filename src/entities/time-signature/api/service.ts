import { buildQueryParams } from "@/shared/utils/query";
import type { TimeSignaturePaginated, TimeSignatureParams } from "../model";
import { api } from "@/shared/api/api";

class TimeSignatureService {
  async getTimeSignatures(
    params: TimeSignatureParams,
  ): Promise<TimeSignaturePaginated> {
    const data = await api.get<TimeSignaturePaginated>(
      `/time-signatures?${buildQueryParams(params)}`,
    );
    return data;
  }
}

export const timeSignatureService = new TimeSignatureService();
