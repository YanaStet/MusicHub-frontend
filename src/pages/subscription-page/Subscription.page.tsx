import { useState } from "react";
import { SubscriptionModal } from "./subscription-modal/SubscriptionModal";
import { Button } from "@/shared/shadcn-ui/button";

export const SubscriptionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Open</Button>
      <SubscriptionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};
