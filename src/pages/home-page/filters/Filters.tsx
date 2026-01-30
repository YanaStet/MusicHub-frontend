import { Typography } from "@/shared/shadcn-ui/typography";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Badge } from "./Badge";
import { Icon } from "@/shared/shadcn-ui/icon";
import type { NoteParams } from "@/entities/note/model";
import { timeSignatureHooks } from "@/entities/time-signature/hooks";
import { InfinityList } from "@/shared/custom-ui/InfinityList";
import { tagHooks } from "@/entities/tag/hooks";

export type TagDisplay = {
  id: number;
  name: string;
  isActive: boolean;
};

export type SizeDisplay = {
  id: number;
  name: string;
  isActive: boolean;
};

type FiltersProps = {
  setNoteParams: Dispatch<SetStateAction<NoteParams>>;
};

export const Filters = ({ setNoteParams }: FiltersProps) => {
  const [tags, setTags] = useState<TagDisplay[]>([]);
  const [sizes, setSizes] = useState<SizeDisplay[]>([]);
  const [isSizeExpanded, setIsSizeExpanded] = useState(false);
  const [showSizeToggle, setShowSizeToggle] = useState(false);
  const contentRefSize = useRef<HTMLDivElement>(null);

  const [isTagExpanded, setIsTagExpanded] = useState(false);
  const [showTagToggle, setShowTagToggle] = useState(false);
  const contentRefTag = useRef<HTMLDivElement>(null);

  const COLLAPSED_HEIGHT = 160;

  const {
    data: size,
    hasNextPage: hasNextPageSize,
    fetchNextPage: fetchNextPageSize,
    isFetchingNextPage: isFetchingNextPageSize,
  } = timeSignatureHooks.useTimeSignaturesInfinityQuery({
    page: 1,
    limit: 10,
  });

  const {
    data: tag,
    hasNextPage: hasNextPageTag,
    fetchNextPage: fetchNextPageTag,
    isFetchingNextPage: isFetchingNextPageTag,
  } = tagHooks.useTagsInfinityQuery({
    page: 1,
    limit: 10,
  });

  const handleSelectTag = (tag: TagDisplay) => {
    let newTags: TagDisplay[] = tags.map((t) =>
      tag.id === t.id
        ? tag.isActive
          ? { id: tag.id, name: tag.name, isActive: false }
          : { id: tag.id, name: tag.name, isActive: true }
        : t,
    );
    setTags(newTags);
  };

  const handleSelectSize = (size: SizeDisplay) => {
    let newSizes: SizeDisplay[] = sizes.map((t) =>
      size.id === t.id
        ? size.isActive
          ? { id: size.id, name: size.name, isActive: false }
          : { id: size.id, name: size.name, isActive: true }
        : t,
    );
    setSizes(newSizes);
  };

  useEffect(() => {
    setNoteParams((prevParams: NoteParams) => {
      return {
        ...prevParams,
        tagsIds: tags.filter((t) => t.isActive).map((t) => t.id) || [],
        timeSignaturesIds:
          sizes.filter((s) => s.isActive).map((s) => s.id) || [],
      };
    });
  }, [tags, sizes]);

  useEffect(() => {
    let s: SizeDisplay[] =
      size?.pages
        .flatMap((page) => page.data)
        .map((s) => ({ ...s, isActive: false })) || [];

    setSizes(s);
  }, [size]);

  useEffect(() => {
    let t: TagDisplay[] =
      tag?.pages
        .flatMap((page) => page.data)
        .map((t) => ({ ...t, isActive: false })) || [];

    setTags(t);
  }, [tag]);

  useLayoutEffect(() => {
    if (contentRefSize.current) {
      const isOverflowing =
        contentRefSize.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowSizeToggle(isOverflowing);
    }
  }, [size]);

  useLayoutEffect(() => {
    if (contentRefTag.current) {
      const isOverflowing =
        contentRefTag.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowTagToggle(isOverflowing);
    }
  }, [tag]);

  return (
    <div className="w-60 2xl:w-80">
      <Typography variant="h2">Filters</Typography>
      <div className="mt-8">
        <Typography variant="body1">Time signature</Typography>
        <div className="w-full mt-2 mb-16 flex flex-col gap-2 relative">
          <div
            className={`flex flex-wrap gap-2 transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar ${
              isSizeExpanded
                ? "max-h-50 2xl:max-h-70 overflow-y-auto"
                : "max-h-25 2xl:max-h-40 overflow-hidden"
            }`}
            ref={contentRefSize}
          >
            <InfinityList
              fetchNextPage={fetchNextPageSize}
              hasNextPage={hasNextPageSize}
              isFetchingNextPage={isFetchingNextPageSize}
              className="gap-2!"
            >
              {sizes.map((size, i) => (
                <Badge value={size} key={i} handleSelect={handleSelectSize} />
              ))}
            </InfinityList>
          </div>

          {showSizeToggle && (
            <>
              <div
                className={`absolute inset-x-0 bottom-4 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isSizeExpanded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />
              <div className="w-full flex justify-center mt-1">
                <Icon
                  name="Arrow"
                  className={`w-3 cursor-pointer transition-transform duration-300 ${
                    isSizeExpanded ? "rotate-0" : "rotate-180"
                  }`}
                  onClick={() => {
                    setIsSizeExpanded(!isSizeExpanded);
                  }}
                />
              </div>
            </>
          )}
        </div>

        <Typography variant="body1">Tags</Typography>
        <div className="w-full mt-2 relative flex flex-col gap-2">
          <div
            className={`flex flex-wrap gap-2 overflow-hidden transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar ${
              isTagExpanded
                ? "max-h-50 2xl:max-h-70 overflow-y-auto"
                : "max-h-25 2xl:max-h-40 overflow-hidden"
            }`}
            ref={contentRefTag}
          >
            <InfinityList
              fetchNextPage={fetchNextPageTag}
              hasNextPage={hasNextPageTag}
              isFetchingNextPage={isFetchingNextPageTag}
              className="gap-2!"
            >
              {tags.map((tag, i) => (
                <Badge value={tag} key={i} handleSelect={handleSelectTag} />
              ))}
            </InfinityList>
          </div>

          {showTagToggle && (
            <>
              <div
                className={`absolute inset-x-0 bottom-4 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isTagExpanded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />

              <div className="w-full flex justify-center mt-1">
                <Icon
                  name="Arrow"
                  className={`w-3 cursor-pointer transition-transform duration-300 ${
                    isTagExpanded ? "rotate-0" : "rotate-180"
                  }`}
                  onClick={() => setIsTagExpanded(!isTagExpanded)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
