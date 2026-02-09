import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/shared/shadcn-ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { editProfileSchema, type EditProfileSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/shared/shadcn-ui/field";
import { FileUploadField } from "@/shared/custom-ui/FileUploadField";
import { Icon } from "@/shared/shadcn-ui/icon";
import { Textarea } from "@/shared/shadcn-ui/textarea";
import { Input } from "@/shared/shadcn-ui/input";
import { Button } from "@/shared/shadcn-ui/button";

type EditProfileModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EditProfileModal = ({ open, setOpen }: EditProfileModalProps) => {
  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onSubmit",
  });

  const handleSubmit = (values: EditProfileSchema) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-88 bg-neutral-800 border border-neutral-700 text-white">
        <DialogTitle>Edit profile</DialogTitle>
        <form
          {...form}
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                <Input
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
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                <Input
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
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
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
            name="avatar"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Avatar</FieldLabel>
                <FileUploadField
                  icon={<Icon name="Upload" />}
                  accept={{
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/png": [".png"],
                    "image/webp": [".webp"],
                  }}
                  onChange={field.onChange}
                  value={field.value}
                  label=""
                  error={fieldState.error?.message}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <DialogFooter className="w-full">
            <Button
              type="submit"
              className="bg-white text-black hover:bg-neutral-300 w-[50%]"
            >
              Apply changes
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
