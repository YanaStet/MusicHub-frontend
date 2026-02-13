import { Button } from "@/shared/shadcn-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn-ui/dialog";
import { Icon } from "@/shared/shadcn-ui/icon";
import { createNoteSchema, type CreateNoteSchema } from "./schema";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/shadcn-ui/field";
import { FileUploadField } from "@/shared/custom-ui/FileUploadField";
import { Textarea } from "@/shared/shadcn-ui/textarea";
import { tagHooks } from "@/entities/tag/hooks";
import { Typography } from "@/shared/shadcn-ui/typography";
import { InfinityList } from "@/shared/custom-ui/InfinityList";
import type { Tag } from "@/entities/tag/model";
import { useState } from "react";
import { Badge } from "@/pages/home-page/filters/Badge";
import { noteHooks } from "@/entities/note/hooks";
import { showToast } from "@/shared/utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_CONSTANTS } from "@/entities/auth/model";
import { useMe } from "@/shared/store/common";
import { Spinner } from "@/shared/shadcn-ui/spinner";
import { handleApiError } from "@/shared/utils/handleApiError";
import type { Difficulty } from "@/entities/note/model";
import type { TimeSignature } from "@/entities/time-signature/model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/shadcn-ui/dropdown-menu";
import { timeSignatureHooks } from "@/entities/time-signature/hooks";

type ManageNoteModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const CreateNoteModal = ({
  isOpen,
  setIsOpen,
}: ManageNoteModalProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>();
  const [selectedTimeSignature, setSelectedTimeSignature] =
    useState<TimeSignature>();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    mode: "onSubmit",
  });
  const { me } = useMe();

  const {
    data: tags,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = tagHooks.useTagsInfinityQuery({
    page: 1,
    limit: 10,
  });

  const {
    data: timeSignatures,
    fetchNextPage: timeFetchNextPage,
    isFetchingNextPage: timeIsFetchingNextPage,
    hasNextPage: timeHasNextPage,
  } = timeSignatureHooks.useTimeSignaturesInfinityQuery({
    page: 1,
    limit: 12,
  });

  const { mutate, isPending } = noteHooks.useCreateNoteMutation();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateNoteSchema) => {
    mutate(
      {
        audio: values.audio,
        cover: values.cover,
        isPublic: true,
        pdf: values.pdf,
        tagsIds: selectedTags.map((t) => t.id),
        title: values.title,
        timeSignatureId: selectedTimeSignature?.id || 1,
        userId: me?.id || 0,
        description: values.description,
        difficulty: difficulty || "easy",
      },
      {
        onSuccess: () => {
          showToast("success", "Note was successfuly created");
          queryClient.invalidateQueries({
            queryKey: [AUTH_CONSTANTS.GET_MY_SONGS],
          });
          setIsOpen(false);
          form.reset();
        },
        onError: (er) => handleApiError(er),
      },
    );
  };

  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  const selectTimeSignature = (time: TimeSignature) => {
    setSelectedTimeSignature(time);
  };

  const handleSelectDifficulty = (action: string) => {
    switch (action) {
      case "Easy":
        setDifficulty("easy");
        break;
      case "Medium":
        setDifficulty("medium");
        break;
      case "Hard":
        setDifficulty("hard");
        break;
      default:
        showToast("error", "Some error occured");
    }
  };

  const allTags = tags?.pages.flatMap((page) => page.data) || [];

  const allSizes = timeSignatures?.pages.flatMap((page) => page.data) || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl bg-neutral-800 border border-neutral-700 text-white">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
        </DialogHeader>
        <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-rows-3 grid-cols-2 gap-4">
            <Controller
              name="pdf"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>PDF file</FieldLabel>
                  <FileUploadField
                    icon={<Icon name="Upload" />}
                    accept={{ "application/pdf": [".pdf"] }}
                    onChange={field.onChange}
                    value={field.value}
                    label="PDF file"
                    error={fieldState.error?.message}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Descriprion</FieldLabel>
                  <Textarea
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="Type your message here."
                    className="bg-neutral-700 text-neutral-400 border border-neutral-600 max-h-21 overflow-y-auto custom-scrollbar"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="audio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Audio file</FieldLabel>
                  <FileUploadField
                    icon={<Icon name="Upload" />}
                    accept={{
                      "audio/mpeg": [".mp3"],
                      "audio/wav": [".wav"],
                      "audio/ogg": [".ogg"],
                      "audio/mp4": [".m4a"],
                      "audio/x-m4a": [".m4a"],
                    }}
                    onChange={field.onChange}
                    value={field.value}
                    label="Audio file"
                    error={fieldState.error?.message}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Textarea
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="Type your message here."
                    className="bg-neutral-700 text-neutral-400 border border-neutral-600 max-h-21 overflow-y-auto custom-scrollbar"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="cover"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Cover image</FieldLabel>
                  <FileUploadField
                    icon={<Icon name="Upload" />}
                    accept={{
                      "image/jpeg": [".jpg", ".jpeg"],
                      "image/png": [".png"],
                      "image/webp": [".webp"],
                    }}
                    onChange={field.onChange}
                    value={field.value}
                    label="Cover image"
                    error={fieldState.error?.message}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div>
              <Typography className="mb-3">Tags</Typography>
              <div className="flex gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      className="rounded-full bg-neutral-700 hover:bg-neutral-600"
                      type="button"
                    >
                      <Icon name="Plus" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-50 overflow-y-auto bg-neutral-800 border border-neutral-600 text-white custom-scrollbar w-30">
                    <InfinityList
                      fetchNextPage={fetchNextPage}
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                      className="gap-0! flex flex-col! w-full"
                    >
                      {allTags.map((t) => (
                        <DropdownMenuItem
                          onClick={() => {
                            handleAddTag(t);
                          }}
                        >
                          {t.name}
                        </DropdownMenuItem>
                      ))}
                    </InfinityList>
                  </DropdownMenuContent>
                </DropdownMenu>
                {selectedTags.map((t) => (
                  <Badge
                    handleSelect={() => {
                      handleRemoveTag(t);
                    }}
                    value={{ name: t.name, isActive: false }}
                    className="bg-neutral-700!"
                  />
                ))}
              </div>
            </div>
            <div>
              <Typography className="mb-3">Time signature</Typography>
              {selectedTimeSignature ? (
                <Badge
                  value={{
                    name: selectedTimeSignature.name,
                    isActive: false,
                  }}
                  handleSelect={() => {
                    setSelectedTimeSignature(undefined);
                  }}
                  className="w-min bg-neutral-700!"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button>
                      <Icon name="Plus" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-50 overflow-y-auto bg-neutral-800 border border-neutral-600 text-white custom-scrollbar w-30">
                    <InfinityList
                      fetchNextPage={timeFetchNextPage}
                      hasNextPage={timeHasNextPage}
                      isFetchingNextPage={timeIsFetchingNextPage}
                      className="gap-0! flex flex-col! w-full"
                    >
                      {allSizes.map((s) => (
                        <DropdownMenuItem
                          className="duration-300"
                          key={s.id}
                          onClick={() => {
                            selectTimeSignature(s);
                          }}
                        >
                          {s.name}
                        </DropdownMenuItem>
                      ))}
                    </InfinityList>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div>
              <Typography className="mb-3">Difficulty</Typography>
              {difficulty ? (
                <Badge
                  value={{
                    name:
                      difficulty === "easy"
                        ? "Easy"
                        : difficulty === "medium"
                          ? "Medium"
                          : "Hard",
                    isActive: false,
                  }}
                  handleSelect={() => {
                    setDifficulty(undefined);
                  }}
                  className="w-min bg-neutral-700!"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button>
                      <Icon name="Plus" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-neutral-800 border-neutral-700 text-white">
                    <DropdownMenuItem
                      onClick={() => {
                        handleSelectDifficulty("Easy");
                      }}
                    >
                      Easy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleSelectDifficulty("Medium");
                      }}
                    >
                      Medium
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleSelectDifficulty("Hard");
                      }}
                    >
                      Hard
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <DialogFooter className="w-full mt-4">
            <Button
              type="submit"
              className="bg-white text-black hover:bg-neutral-300 w-[50%]"
              disabled={isPending}
            >
              Upload
              {isPending ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <Icon name="Upload" />
              )}
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-[50%] bg-neutral-600 border border-neutral-500 text-white hover:bg-neutral-400 "
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
