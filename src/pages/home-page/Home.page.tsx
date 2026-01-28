import { Button } from "@/shared/shadcn-ui/button";
import { Filters } from "./filters/Filters";
import { Input } from "@/shared/shadcn-ui/input";
import { ButtonGroup } from "@/shared/shadcn-ui/button-group";
import { Field } from "@/shared/shadcn-ui/field";
import { MusicCard } from "./music-cards/MusicCard";
import { Typography } from "@/shared/shadcn-ui/typography";
import { noteHooks } from "@/entities/note/hooks";
import { useEffect, useState } from "react";
import type { NoteParams } from "@/entities/note/model";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/shared/custom-ui/Loader";

export const HomePage = () => {
  const [noteParams, setNoteParams] = useState<NoteParams>({
    page: 1,
    limit: 7,
    tagsIds: [],
    timeSignaturesIds: [],
  });
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  const {
    data: notes,
    isLoading: isNotesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = noteHooks.useNoteInfinityQuery(noteParams);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      console.log("fetch");
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allNotes = notes?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="py-10 px-25 flex gap-10">
      <Filters setNoteParams={setNoteParams} />
      <div className="w-full max-w-200 2xl:max-w-340">
        <Field className="w-full mb-10">
          <ButtonGroup className="w-full">
            <Input
              id="input-button-group"
              placeholder="Type to search..."
              className="bg-neutral-800 border-neutral-700 w-full"
            />
            <Button variant="secondary" className="bg-neutral-600 text-white">
              Search
            </Button>
          </ButtonGroup>
        </Field>
        <Typography variant="h2">Popular</Typography>
        <div className="w-full flex flex-wrap gap-6 mt-8 justify-around overflow-y-auto h-[calc(100dvh-310px)] rounded-lg overflow-x-hidden">
          {isNotesLoading ? (
            <div className="h-[calc(100dvh-299px)] flex items-center">
              <Loader />
            </div>
          ) : !allNotes || allNotes.length === 0 ? (
            noteParams.tagsIds.length > 1 ||
            noteParams.timeSignaturesIds.length > 0 ? (
              <Typography variant="body2" className="text-neutral-500">
                No notes found. Try to adjust your filters.
              </Typography>
            ) : (
              <Typography variant="body2" className="text-neutral-500">
                There is no notes yet.
              </Typography>
            )
          ) : (
            allNotes.map((note, i) => (
              <MusicCard
                music={note}
                key={note.id}
                ref={allNotes.length - 1 === i ? ref : null}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
