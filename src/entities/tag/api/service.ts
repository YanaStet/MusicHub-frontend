import { api } from "@/shared/api/api";
import type { Params } from "@/shared/types/common";
import type { TagPaginated } from "../model/type";
import { buildQueryParams } from "@/shared/utils/query";

class TagService {
  async getTags(params: Params): Promise<TagPaginated> {
    const data = await api.get<TagPaginated>(
      `/tags?${buildQueryParams(params)}`,
    );
    return data;
  }
}

export const tagService = new TagService();
