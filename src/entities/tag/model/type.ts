import type {
  InfinityQueryResponse,
  PaginatedData,
} from "@/shared/types/common";

export type Tag = {
  id: number;
  name: string;
};

export type TagPaginated = PaginatedData<Tag>;

export type TagInfinity = InfinityQueryResponse<TagPaginated>;
