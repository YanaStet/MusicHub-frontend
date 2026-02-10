import { noteHooks } from "@/entities/note/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn-ui/alert-dialog";
import { showToast } from "../utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_CONSTANTS } from "@/entities/auth/model";
import { handleApiError } from "../utils/handleApiError";

type DeleteNoteProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  noteId?: number;
};

export const DeleteNote = ({ isOpen, setIsOpen, noteId }: DeleteNoteProps) => {
  const { mutate } = noteHooks.useDeleteNoteMutation();
  const queryClient = useQueryClient();
  const handleDeleteNote = () => {
    if (noteId) {
      mutate(noteId, {
        onSuccess: () => {
          showToast("success", "Note was successfuly deleted.");
          queryClient.invalidateQueries({
            queryKey: [AUTH_CONSTANTS.GET_MY_SONGS],
          });
        },
        onError: (er) => handleApiError(er),
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-neutral-800 text-white border-neutral-700">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this upload?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white bg-neutral-600 border-neutral-500">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDeleteNote}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
