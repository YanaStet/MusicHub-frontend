import { Button } from "@/shared/shadcn-ui/button";
import { Filters } from "./filters/Filters";
import { Input } from "@/shared/shadcn-ui/input";
import { ButtonGroup } from "@/shared/shadcn-ui/button-group";
import { Field } from "@/shared/shadcn-ui/field";
import { MusicCard } from "./music-cards/MusicCard";
import { Typography } from "@/shared/shadcn-ui/typography";
import { noteHooks } from "@/entities/note/hooks";
import { useState } from "react";
import type { NoteParams } from "@/entities/note/model";
import { InfinityList } from "@/shared/custom-ui/InfinityList";

export const HomePage = () => {
  const [currentSearchInput, setCurrentSearchInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [noteParams, setNoteParams] = useState<NoteParams>({
    page: 1,
    limit: 7,
    tagsIds: [],
    timeSignaturesIds: [],
    sizes: [],
    query: searchValue,
  });

  const {
    data: notes,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = noteHooks.useNoteInfinityQuery({ ...noteParams, query: searchValue });

  const allNotes = notes?.pages.flatMap((page) => page.data) || [];

  const handleSearch = () => {
    setSearchValue(currentSearchInput);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="py-10 px-25 flex gap-10">
      <Filters setNoteParams={setNoteParams} />
      <div className="w-full max-w-200 2xl:max-w-340">
        <Field className="w-full mb-5 2xl:mb-10">
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
        <Typography variant="h2">Popular</Typography>
        <div className="w-full mt-4 2xl:mt-8 overflow-y-auto h-[calc(100dvh-270px)] rounded-lg overflow-x-hidden">
          {allNotes &&
            allNotes.length === 0 &&
            noteParams.tagsIds.length === 0 &&
            noteParams.timeSignaturesIds.length === 0 &&
            !searchValue && (
              <Typography variant="body2" className="text-neutral-500">
                There is no notes yet.
              </Typography>
            )}
          {allNotes &&
            allNotes.length === 0 &&
            (noteParams.tagsIds.length > 0 ||
              noteParams.timeSignaturesIds.length > 0 ||
              searchValue) && (
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
