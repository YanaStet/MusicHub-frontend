import { Dialog, DialogContent, DialogTitle } from "@/shared/shadcn-ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/shadcn-ui/field";
import { Textarea } from "@/shared/shadcn-ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { type EditNoteSchema, editNoteSchema } from "./schema";
import { Typography } from "@/shared/shadcn-ui/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn-ui/popover";
import { Button } from "@/shared/shadcn-ui/button";
import { Icon } from "@/shared/shadcn-ui/icon";
import { InfinityList } from "@/shared/custom-ui/InfinityList";
import { Item, ItemTitle } from "@/shared/shadcn-ui/item";
import { Badge } from "@/pages/home-page/filters/Badge";
import { tagHooks } from "@/entities/tag/hooks";
import type { Tag } from "@/entities/tag/model";
import { useEffect, useState } from "react";
import type { Note } from "@/entities/note/model";
import { zodResolver } from "@hookform/resolvers/zod";

type EditNoteModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  prevValues?: Note;
};

export const EditNoteModal = ({
  isOpen,
  setIsOpen,
  prevValues,
}: EditNoteModalProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const form = useForm<EditNoteSchema>({
    resolver: zodResolver(editNoteSchema),
    mode: "onSubmit",
    defaultValues: {
      title: prevValues?.title,
      description: prevValues?.description,
    },
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

  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  useEffect(() => {
    if (prevValues) {
      form.reset({
        title: prevValues.title,
        description: prevValues.description,
      });
      setSelectedTags(prevValues.tags);
    }
    console.log(prevValues);
  }, [prevValues]);

  const allTags = tags?.pages.flatMap((page) => page.data) || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-88 bg-neutral-800 border border-neutral-700 text-white">
        <DialogTitle>Edit file</DialogTitle>
        <form {...form} className="flex flex-col gap-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Textarea
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Don’t pee on the floor"
                  className="bg-neutral-700 text-neutral-400 border border-neutral-600"
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
                  placeholder="Use the commodore"
                  className="bg-neutral-700 text-neutral-400 border border-neutral-600"
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
                  <Button
                    className="rounded-full bg-neutral-700 hover:bg-neutral-600"
                    type="button"
                  >
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
        </form>
      </DialogContent>
    </Dialog>
  );
};
