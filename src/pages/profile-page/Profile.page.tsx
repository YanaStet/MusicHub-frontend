import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn-ui/avatar";
import { Button } from "@/shared/shadcn-ui/button";
import { ButtonGroup } from "@/shared/shadcn-ui/button-group";
import { Field } from "@/shared/shadcn-ui/field";
import { Icon } from "@/shared/shadcn-ui/icon";
import { Input } from "@/shared/shadcn-ui/input";
import { Typography } from "@/shared/shadcn-ui/typography";
import { useLayoutEffect, useRef, useState } from "react";
import { MusicCard } from "../../shared/custom-ui/MusicCard";
import { noteHooks } from "@/entities/note/hooks";
import { InfinityList } from "@/shared/custom-ui/InfinityList";
import { useParams } from "react-router-dom";
import { composerHooks } from "@/entities/composer/hooks";
import { Loader } from "@/shared/custom-ui/Loader";

export const ProfilePage = () => {
  const [currentSearchInput, setCurrentSearchInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isDescrExpanded, setIsDescrExpanded] = useState(false);
  const [showSizeToggle, setShowSizeToggle] = useState(false);
  const contentRefDescr = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const { data: composer, isLoading: isComposerLoading } =
    composerHooks.useComposerByIdquery(id || "");

  const {
    data: notes,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = noteHooks.useNoteByComposerIdQuery(Number(id), {
    limit: 12,
    page: 1,
    query: searchValue,
    sizes: [],
    tagsIds: [],
    timeSignaturesIds: [],
  });
  const allNotes = notes?.pages.flatMap((page) => page.data) || [];

  const COLLAPSED_HEIGHT = 360;

  const handleSearch = () => {
    setSearchValue(currentSearchInput);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useLayoutEffect(() => {
    if (contentRefDescr.current) {
      const isOverflowing =
        contentRefDescr.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowSizeToggle(isOverflowing);
    }
  }, [COLLAPSED_HEIGHT]); //TODO

  return (
    <div className="flex gap-10 px-10 2xl:px-25 py-10">
      {isComposerLoading ? (
        <div className="2x:80 w-60">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-8 2xl:w-80 w-70">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {composer?.data.firstName[0]}
              {composer?.data.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <Typography variant="h1">
            {composer?.data.firstName} {composer?.data.lastName}
          </Typography>
          <div className="w-full mt-2 mb-16 flex flex-col gap-2 relative">
            <div
              className={`flex flex-wrap gap-2 transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar ${
                isDescrExpanded
                  ? "max-h-80 2xl:max-h-120 overflow-y-auto"
                  : "max-h-50 2xl:max-h-90 overflow-hidden"
              }`}
              ref={contentRefDescr}
            >
              <Typography>{composer?.data.bio}</Typography>
            </div>

            {showSizeToggle && (
              <>
                <div
                  className={`absolute inset-x-0 bottom-4 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
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
          </div>{" "}
        </div>
      )}
      <div className="w-full max-w-225 2xl:max-w-340">
        <Field className="w-full mb-10">
          <ButtonGroup className="w-full">
            <Input
              id="input-button-group"
              placeholder="Type to search..."
              className="bg-neutral-800 border-neutral-700 w-full"
              value={currentSearchInput}
              onChange={(e) => setCurrentSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="secondary"
              className="bg-neutral-600 text-white"
              onClick={handleSearch}
            >
              Search
            </Button>
          </ButtonGroup>
        </Field>
        <Typography variant="h1" className="mb-8">
          Uploads
        </Typography>
        <div className="w-full mt-8 overflow-y-auto h-[calc(100dvh-310px)] rounded-lg overflow-x-hidden">
          {allNotes && allNotes.length === 0 && !searchValue && (
            <Typography variant="body2" className="text-neutral-500">
              There is no notes yet.
            </Typography>
          )}
          {allNotes && allNotes.length === 0 && searchValue && (
            <Typography variant="body2" className="text-neutral-500">
              No notes found. Try to adjust your filters.
            </Typography>
          )}
          <InfinityList
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {allNotes.map((note) => (
              <MusicCard music={note} key={note.id} />
            ))}
          </InfinityList>
        </div>
      </div>
    </div>
  );
};
