import type { Tag } from "@/entities/tag/model/type";
import type { TimeSignature } from "@/entities/time-signature/model";
import type {
  InfinityQueryResponse,
  PaginatedData,
} from "@/shared/types/common";
import type { File } from "react-pdf/dist/shared/types.js";

export type Difficulty = "hard" | "medium" | "easy";

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
  author: {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
  };
  tags: Tag[];
  favourite: boolean;
};

export type NotePaginatedResponse = PaginatedData<Note>;

export type NoteInfinityQueryResponse =
  InfinityQueryResponse<NotePaginatedResponse>;

export type NoteParams = {
  page: number;
  limit: number;
  tagsIds: number[];
  timeSignaturesIds: number[];
  sizes: string[];
  query: string | null;
};

export type NoteById = {
  data: Note;
};

export type CreateNoteRequest = {
  title: string;
  userId: number;
  timeSignatureId: number;
  isPublic: boolean;
  tagsIds: number[];
  pdf: File;
  audio: File;
  cover: File;
  difficulty: Difficulty;
  description?: string;
};

export type UpdateNoteRequest = {
  id: number;
  title: string;
  description?: string;
  tagsIds: number[];
};
