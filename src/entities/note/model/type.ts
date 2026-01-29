import type { Tag } from "@/entities/tag/model/type";
import type { TimeSignature } from "@/entities/time-signature/model";
import type {
  InfinityQueryResponse,
  PaginatedData,
} from "@/shared/types/common";

type Difficulty = "Hard" | "Medium" | "Easy";

export type Note = {
  id: number;
  title: string;
  userId: number;
  pdfUrl: string;
  audioUrl: string;
  coverImageUrl: string;
  description: string;
  difficulty: Difficulty;
  isPublic: boolean;
  createdAt: Date;
  views: number;
  size: TimeSignature;
  authorName: string;
  authorEmail: string;
  tags: Tag[];
};

export type NotePaginatedResponse = PaginatedData<Note>;

export type NoteInfinityQueryResponse =
  InfinityQueryResponse<NotePaginatedResponse>;

export type NoteParams = {
  page: number;
  limit: number;
  tagsIds: number[];
  timeSignaturesIds: number[];
};
