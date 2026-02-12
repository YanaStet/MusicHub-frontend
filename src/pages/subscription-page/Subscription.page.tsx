import { useState } from "react";
import { SubscriptionModal } from "./subscription-modal/SubscriptionModal";
import { Button } from "@/shared/shadcn-ui/button";
import { Typography } from "@/shared/shadcn-ui/typography";
import { Icon } from "@/shared/shadcn-ui/icon";

export const SubscriptionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = false;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="px-10 2xl:px-25 py-10">
      <Typography variant="h1">Plans</Typography>
      {data ? (
        <div></div>
      ) : (
        <div className="w-full flex justify-center items-center h-[calc(100dvh-196px)]">
          <div className="w-89 flex flex-col gap-4 items-center">
            <div className="p-3 bg-neutral-600 rounded-lg">
              <div className="w-5 h-5 text-white">
                <Icon name="Crown" />
              </div>
            </div>
            <Typography
              className="text-neutral-400 text-center"
              variant="body2"
            >
              You haven't tried our sixty-seventh plan yet. Get started by
              choosing it as your first plan.
            </Typography>
            <Button onClick={handleOpenModal} variant={"secondary"}>
              View Plans
            </Button>
          </div>
        </div>
      )}

      <SubscriptionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};
