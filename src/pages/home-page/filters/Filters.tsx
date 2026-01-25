import { Typography } from "@/shared/shadcn-ui/typography";
import { useState } from "react";
import { SizeBadge, TagBadge } from "./Badge";
import { Icon } from "@/shared/shadcn-ui/icon";

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

const tag: TagDisplay[] = [
  {
    id: 1,
    name: "Vivo",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic",
    isActive: false,
  },
  {
    id: 3,
    name: "Jazz",
    isActive: false,
  },
  {
    id: 4,
    name: "Cool",
    isActive: false,
  },
  {
    id: 5,
    name: "Funny",
    isActive: false,
  },
  {
    id: 6,
    name: "Pop",
    isActive: false,
  },
  {
    id: 7,
    name: "Rock",
    isActive: false,
  },
  {
    id: 1,
    name: "Vivo",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic",
    isActive: false,
  },
  {
    id: 3,
    name: "Jazz",
    isActive: false,
  },
  {
    id: 4,
    name: "Cool",
    isActive: false,
  },
  {
    id: 5,
    name: "Funny",
    isActive: false,
  },
  {
    id: 6,
    name: "Pop",
    isActive: false,
  },
  {
    id: 7,
    name: "Rock",
    isActive: false,
  },
  {
    id: 1,
    name: "Vivo",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic",
    isActive: false,
  },
  {
    id: 3,
    name: "Jazz",
    isActive: false,
  },
  {
    id: 4,
    name: "Cool",
    isActive: false,
  },
  {
    id: 5,
    name: "Funny",
    isActive: false,
  },
  {
    id: 6,
    name: "Pop",
    isActive: false,
  },
  {
    id: 7,
    name: "Rock",
    isActive: false,
  },
  {
    id: 1,
    name: "Vivo",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic",
    isActive: false,
  },
  {
    id: 3,
    name: "Jazz",
    isActive: false,
  },
  {
    id: 4,
    name: "Cool",
    isActive: false,
  },
  {
    id: 5,
    name: "Funny",
    isActive: false,
  },
  {
    id: 6,
    name: "Pop",
    isActive: false,
  },
  {
    id: 7,
    name: "Rock",
    isActive: false,
  },
  {
    id: 1,
    name: "Vivo",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic",
    isActive: false,
  },
  {
    id: 3,
    name: "Jazz",
    isActive: false,
  },
  {
    id: 4,
    name: "Cool",
    isActive: false,
  },
  {
    id: 5,
    name: "Funny",
    isActive: false,
  },
  {
    id: 6,
    name: "Pop",
    isActive: false,
  },
  {
    id: 7,
    name: "Rock",
    isActive: false,
  },
  {
    id: 1,
    name: "Vivo",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic",
    isActive: false,
  },
  {
    id: 3,
    name: "Jazz",
    isActive: false,
  },
  {
    id: 4,
    name: "Cool",
    isActive: false,
  },
  {
    id: 5,
    name: "Funny",
    isActive: false,
  },
  {
    id: 6,
    name: "Pop",
    isActive: false,
  },
  {
    id: 7,
    name: "Rock",
    isActive: false,
  },
];

const size: SizeDisplay[] = [
  {
    id: 1,
    name: "2/4",
    isActive: false,
  },
  {
    id: 2,
    name: "3/4",
    isActive: false,
  },
  {
    id: 3,
    name: "4/4",
    isActive: false,
  },
  {
    id: 4,
    name: "3/8",
    isActive: false,
  },
  {
    id: 5,
    name: "2/4",
    isActive: false,
  },
  {
    id: 6,
    name: "3/4",
    isActive: false,
  },
  {
    id: 7,
    name: "4/4",
    isActive: false,
  },
  {
    id: 8,
    name: "3/8",
    isActive: false,
  },
  {
    id: 9,
    name: "2/4",
    isActive: false,
  },
  {
    id: 10,
    name: "3/4",
    isActive: false,
  },
  {
    id: 11,
    name: "4/4",
    isActive: false,
  },
  {
    id: 12,
    name: "3/8",
    isActive: false,
  },
  {
    id: 13,
    name: "2/4",
    isActive: false,
  },
  {
    id: 14,
    name: "3/4",
    isActive: false,
  },
  {
    id: 15,
    name: "4/4",
    isActive: false,
  },
  {
    id: 16,
    name: "3/8",
    isActive: false,
  },
  {
    id: 17,
    name: "2/4",
    isActive: false,
  },
  {
    id: 18,
    name: "3/4",
    isActive: false,
  },
  {
    id: 19,
    name: "4/4",
    isActive: false,
  },
  {
    id: 20,
    name: "3/8",
    isActive: false,
  },
  {
    id: 21,
    name: "2/4",
    isActive: false,
  },
  {
    id: 22,
    name: "3/4",
    isActive: false,
  },
  {
    id: 23,
    name: "4/4",
    isActive: false,
  },
  {
    id: 24,
    name: "3/8",
    isActive: false,
  },
  {
    id: 25,
    name: "2/4",
    isActive: false,
  },
  {
    id: 26,
    name: "3/4",
    isActive: false,
  },
  {
    id: 27,
    name: "4/4",
    isActive: false,
  },
  {
    id: 28,
    name: "3/8",
    isActive: false,
  },
  {
    id: 24,
    name: "3/8",
    isActive: false,
  },
  {
    id: 25,
    name: "2/4",
    isActive: false,
  },
  {
    id: 26,
    name: "3/4",
    isActive: false,
  },
  {
    id: 27,
    name: "4/4",
    isActive: false,
  },
  {
    id: 28,
    name: "3/8",
    isActive: false,
  },
  {
    id: 24,
    name: "3/8",
    isActive: false,
  },
  {
    id: 25,
    name: "2/4",
    isActive: false,
  },
  {
    id: 26,
    name: "3/4",
    isActive: false,
  },
  {
    id: 27,
    name: "4/4",
    isActive: false,
  },
  {
    id: 28,
    name: "3/8",
    isActive: false,
  },
  {
    id: 24,
    name: "3/8",
    isActive: false,
  },
  {
    id: 25,
    name: "2/4",
    isActive: false,
  },
  {
    id: 26,
    name: "3/4",
    isActive: false,
  },
  {
    id: 27,
    name: "4/4",
    isActive: false,
  },
  {
    id: 28,
    name: "3/8",
    isActive: false,
  },
  {
    id: 24,
    name: "3/8",
    isActive: false,
  },
  {
    id: 25,
    name: "2/4",
    isActive: false,
  },
  {
    id: 26,
    name: "3/4",
    isActive: false,
  },
  {
    id: 27,
    name: "4/4",
    isActive: false,
  },
  {
    id: 28,
    name: "3/8",
    isActive: false,
  },
  {
    id: 24,
    name: "3/8",
    isActive: false,
  },
  {
    id: 25,
    name: "2/4",
    isActive: false,
  },
  {
    id: 26,
    name: "3/4",
    isActive: false,
  },
  {
    id: 27,
    name: "4/4",
    isActive: false,
  },
  {
    id: 28,
    name: "3/8",
    isActive: false,
  },
  {
    id: 24,
    name: "3/8",
    isActive: false,
  },
  {
    id: 25,
    name: "2/4",
    isActive: false,
  },
  {
    id: 26,
    name: "3/4",
    isActive: false,
  },
  {
    id: 27,
    name: "4/4",
    isActive: false,
  },
  {
    id: 28,
    name: "3/8",
    isActive: false,
  },
];

export const Filters = () => {
  const [tags, setTags] = useState<TagDisplay[]>(tag);
  const [sizes, setSizes] = useState<SizeDisplay[]>(size);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

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

  return (
    <div className="w-80">
      <Typography variant="h2">Filters</Typography>
      <div className="mt-8">
        <Typography variant="body1">Time signature</Typography>
        <div className="w-full mt-2 mb-16 flex flex-col gap-2">
          <div
            className={`relative flex flex-wrap gap-2 transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar ${
              isSizeOpen
                ? "max-h-60 overflow-y-auto"
                : "max-h-40 overflow-hidden"
            }`}
          >
            {sizes.map((size) => (
              <SizeBadge
                value={size}
                key={size.id}
                handleSelect={handleSelectSize}
              />
            ))}

            {sizes.length > 15 && (
              <div
                className={`absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isSizeOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />
            )}
          </div>

          {sizes.length > 15 && (
            <div className="w-full flex justify-center mt-1">
              <Icon
                name="Arrow"
                className={`w-3 cursor-pointer transition-transform duration-300 ${
                  isSizeOpen ? "rotate-0" : "rotate-180"
                }`}
                onClick={() => setIsSizeOpen(!isSizeOpen)}
              />
            </div>
          )}
        </div>

        <Typography variant="body1">Tags</Typography>
        <div className="w-full mt-2  flex flex-col gap-2">
          <div
            className={`relative flex flex-wrap gap-2 overflow-hidden transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar ${
              isTagsOpen
                ? "max-h-60 overflow-y-auto"
                : "max-h-40 overflow-hidden"
            }`}
          >
            {tags.map((tag) => (
              <TagBadge
                value={tag}
                key={tag.id}
                handleSelect={handleSelectTag}
              />
            ))}

            {tags.length > 15 && (
              <div
                className={`absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isTagsOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />
            )}
          </div>

          {tags.length > 15 && (
            <div className="w-full flex justify-center mt-1">
              <Icon
                name="Arrow"
                className={`w-3 cursor-pointer transition-transform duration-300 ${
                  isTagsOpen ? "rotate-0" : "rotate-180"
                }`}
                onClick={() => setIsTagsOpen(!isTagsOpen)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
