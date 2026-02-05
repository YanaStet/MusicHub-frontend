import { Dialog, DialogContent } from "@/shared/shadcn-ui/dialog";
import { useForm } from "react-hook-form";
import { editProfileSchema, type EditProfileSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditProfileModal = () => {
  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  return (
    <Dialog>
      <DialogContent>
        <form></form>
      </DialogContent>
    </Dialog>
  );
};
