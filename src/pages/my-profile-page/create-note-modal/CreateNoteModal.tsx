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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn-ui/popover";
import { Typography } from "@/shared/shadcn-ui/typography";
import { InfinityList } from "@/shared/custom-ui/InfinityList";
import { Item, ItemTitle } from "@/shared/shadcn-ui/item";
import type { Tag } from "@/entities/tag/model";
import { useState } from "react";
import { Badge } from "@/pages/home-page/filters/Badge";
import { noteHooks } from "@/entities/note/hooks";
import { showToast } from "@/shared/utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { NOTE_CONSTANTS } from "@/entities/note/model";
import { zodResolver } from "@hookform/resolvers/zod";

type ManageNoteModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const CreateNoteModal = ({
  isOpen,
  setIsOpen,
}: ManageNoteModalProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    mode: "onSubmit",
  });

  const {
    data: tags,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = tagHooks.useTagsInfinityQuery({
    page: 1,
    limit: 10,
  });

  const { mutate } = noteHooks.useCreateNoteMutation();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateNoteSchema) => {
    console.log(values);
    mutate(
      {
        audio: values.audio,
        cover: values.cover,
        isPublic: true,
        pdf: values.pdf,
        tagsIds: selectedTags.map((t) => t.id),
        title: values.title,
        timeSignatureId: 1,
        userId: 1,
      },
      {
        onSuccess: () => {
          showToast("success", "Note was successfuly created");
          queryClient.invalidateQueries({
            queryKey: [NOTE_CONSTANTS.INFINITE_QUERY],
          });
          form.reset();
        },
        onError: () => {
          showToast("error", "Some error ocured");
        },
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

  const allTags = tags?.pages.flatMap((page) => page.data) || [];

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
                    className="bg-neutral-700 text-neutral-400 border border-neutral-600"
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
                    className="bg-neutral-700 text-neutral-400 border border-neutral-600"
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
                <Popover>
                  <PopoverTrigger>
                    <Button className="rounded-full bg-neutral-700 hover:bg-neutral-600">
                      <Icon name="Plus" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-h-50 overflow-y-auto bg-neutral-800 border border-neutral-600 text-white w-50">
                    <InfinityList
                      fetchNextPage={fetchNextPage}
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                      className="gap-0"
                    >
                      {allTags.map((t) => (
                        <Item
                          className="cursor-pointer border border-neutral-600 rounded-lg w-full p-2 hover:bg-neutral-600"
                          onClick={() => {
                            handleAddTag(t);
                          }}
                        >
                          <ItemTitle>{t.name}</ItemTitle>
                        </Item>
                      ))}
                    </InfinityList>
                  </PopoverContent>
                </Popover>
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
          </div>
          <DialogFooter className="w-full">
            <Button
              type="submit"
              className="bg-white text-black hover:bg-neutral-300 "
            >
              Upload
              <Icon name="Upload" />
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-neutral-600 border border-neutral-500 text-white hover:bg-neutral-400 "
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
