import type { Tag } from "@/entities/tag/model/type";
import type { TimeSignature } from "@/entities/time-signature/model";
import type { PaginatedData } from "@/shared/types/common";

export type Note = {
  id: number;
  title: string;
  content: string;
  size: TimeSignature;
  authorName: string;
  authorEmail: string;
  tags: Tag[];
};

export type NotePaginatedResponse = PaginatedData<Note>;

export type NoteInfinityQueryResponse = {
  pages: NotePaginatedResponse[];
  pageParams: number[];
};

export type NoteParams = {
  page: number;
  limit: number;
  tagsIds: number[];
  timeSignaturesIds: number[];
};
