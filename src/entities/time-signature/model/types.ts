import type {
  InfinityQueryResponse,
  PaginatedData,
} from "@/shared/types/common";

export type TimeSignature = {
  id: number;
  name: string;
};

export type TimeSignaturePaginated = PaginatedData<TimeSignature>;

export type TimeSignatureParams = {
  page: number;
  limit: number;
};

export type TimeSignatureInfinityResponse =
  InfinityQueryResponse<TimeSignaturePaginated>;
