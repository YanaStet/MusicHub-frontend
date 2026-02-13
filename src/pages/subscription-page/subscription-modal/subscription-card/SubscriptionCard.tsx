import { subscriptionHooks } from "@/entities/subscriptions/hooks";
import type { Subscription } from "@/entities/subscriptions/model";
import { Button } from "@/shared/shadcn-ui/button";
import { Icon } from "@/shared/shadcn-ui/icon";
import { Spinner } from "@/shared/shadcn-ui/spinner";
import { Typography } from "@/shared/shadcn-ui/typography";
import { handleApiError } from "@/shared/utils/handleApiError";
import { showToast } from "@/shared/utils/showToast";
import clsx from "clsx";

type SubscriptionPlanProps = {
  isActive?: boolean;
  plan: Subscription;
  setOpen: (open: boolean) => void;
};

export const SubscriptionCard = ({
  isActive,
  plan,
  setOpen,
}: SubscriptionPlanProps) => {
  const { mutate, isPending } = subscriptionHooks.useBuySubscriptionMutation();

  const handleBuySubscription = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          showToast("success", "Subscription was oformed");
        },
        onError: (er) => handleApiError(er),
      },
    );
  };

  return (
    <div
      className={clsx(
        "p-4 rounded-lg border w-65 2xl:w-88 duration-300",
        isActive
          ? "bg-neutral-700 border-neutral-500"
          : "border-neutral-700 bg-neutral-800",
      )}
    >
      <div className="flex justify-between items-center mb-4 2xl:mb-8">
        <Typography variant="h4" className="min-w-20">
          {plan.name}
        </Typography>
        {isActive && (
          <Button
            className="text-white"
            variant="ghost"
            size="xs"
            onClick={() => setOpen(false)}
          >
            <Icon name="Cross" />
          </Button>
        )}
      </div>

      <Typography variant="h1" className="text-[36px] 2xl:text-[48px]">
        {plan.price}$/mo
      </Typography>
      <Typography className="text-sm text-neutral-400 my-2 2xl:my-4">
        Annual, billed monthly
      </Typography>
      <Typography className="text-sm">{plan.description}</Typography>
      <div className="flex gap-2 text-neutral-400 items-center">
        <div className="w-3.5 h-3.5">
          <Icon name="Lock" />
        </div>
        <Typography className="text-sm my-2 2xl:my-4">
          Secure transaction
        </Typography>
      </div>
      {isActive && (
        <Button
          variant={"secondary"}
          className="w-full duration-300"
          disabled={isPending}
          onClick={handleBuySubscription}
        >
          Select
          {isPending && <Spinner />}
        </Button>
      )}
    </div>
  );
};
