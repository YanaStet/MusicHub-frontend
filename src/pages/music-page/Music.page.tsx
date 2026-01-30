import { Icon } from "@/shared/shadcn-ui/icon";
import { Typography } from "@/shared/shadcn-ui/typography";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { TagDisplay } from "../home-page/filters/Filters";
import { Badge } from "../home-page/filters/Badge";

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
];

export const MusicPage = () => {
  const [showDescrToggle, setShowDescrToggle] = useState(false);
  const [isDescrExpanded, setIsDescrExpanded] = useState(false);
  const descrRef = useRef<HTMLDivElement>(null);
  const [showTagsToggle, setShowTagsToggle] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const tagsRef = useRef<HTMLDivElement>(null);

  const descr =
    " Description DescriptionDescription Description Description Description Description Description Description DescriptionDescription Description Description Description Description Description Description Description Description DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescriptionDescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription  DescriptionDescription Description Description Description Description Description Description Description";

  const COLLAPSED_HEIGHT = 160;

  useLayoutEffect(() => {
    if (descrRef.current) {
      const isOverflowing = descrRef.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowDescrToggle(isOverflowing);
    }
  }, [descr]);

  useLayoutEffect(() => {
    if (tagsRef.current) {
      const isOverflowing = tagsRef.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowTagsToggle(isOverflowing);
    }
  }, [tag]);

  return (
    <div className="px-25 py-10">
      <div className="w-60 2xl:w-80">
        <Typography variant="h2">Mutter</Typography>

        <div className="relative my-8">
          <div
            ref={tagsRef}
            className={clsx(
              "transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar",
              isTagsExpanded
                ? "max-h-50 2xl:max-h-70 overflow-y-auto"
                : "max-h-25 2xl:max-h-40 overflow-hidden",
            )}
          >
            <Typography variant="body3">{descr}</Typography>
          </div>
          {showTagsToggle && (
            <>
              <div
                className={`absolute inset-x-0 bottom-2 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isTagsExpanded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />
              <div className="w-full flex justify-center mt-1">
                <Icon
                  name="Arrow"
                  className={`w-3 cursor-pointer transition-transform duration-300 ${
                    isTagsExpanded ? "rotate-0" : "rotate-180"
                  }`}
                  onClick={() => {
                    setIsTagsExpanded(!isTagsExpanded);
                  }}
                />
              </div>
            </>
          )}
        </div>

        <div className="w-full rounded-lg h-60 overflow-hidden">
          {/* <img src="#" alt="cover" /> */}
          <div className="w-full h-full bg-neutral-700"></div>
        </div>

        <div className="my-8 flex gap-1 text-neutral-400 text-base">
          Uploaded by
          <Link to={ROUTE_PATHS.PROFILE} className="underline">
            Naman Chauhan
          </Link>
        </div>

        <Typography variant="h3" className="my-8">
          Tags
        </Typography>

        <div className="relative">
          <div
            ref={descrRef}
            className={clsx(
              "transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar flex flex-wrap gap-2",
              isDescrExpanded
                ? "max-h-50 2xl:max-h-70 overflow-y-auto"
                : "max-h-25 2xl:max-h-40 overflow-hidden",
            )}
          >
            {tag.map((t) => (
              <Badge value={t} key={t.id} handleSelect={() => {}} />
            ))}
          </div>
          {showDescrToggle && (
            <>
              <div
                className={`absolute inset-x-0 bottom-2 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isDescrExpanded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />
              <div className="w-full flex justify-center mt-1">
                <Icon
                  name="Arrow"
                  className={`w-3 cursor-pointer transition-transform duration-300 ${
                    isDescrExpanded ? "rotate-0" : "rotate-180"
                  }`}
                  onClick={() => {
                    setIsDescrExpanded(!isDescrExpanded);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
