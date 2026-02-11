import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/shadcn-ui/carousel";
import { SubscriptionCard } from "./subscription-card/SubscriptionCard";
import { useEffect, useState } from "react";
import { Button } from "@/shared/shadcn-ui/button";
import { Icon } from "@/shared/shadcn-ui/icon";
import { Dialog, DialogContent } from "@/shared/shadcn-ui/dialog";

const plans = [
  { id: "free", name: "Free Plan", price: 500 },
  { id: "pro", name: "Pro Plan", price: 900 },
  { id: "max", name: "Pro Max Plan", price: 9999 },
  { id: "free", name: "Free Plan", price: 500 },
  { id: "pro", name: "Pro Plan", price: 900 },
  { id: "max", name: "Pro Max Plan", price: 9999 },
];

type SubscriptionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const SubscriptionModal = ({
  open,
  onOpenChange,
}: SubscriptionModalProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleNext = () => {
    api?.scrollNext();
  };

  const handlePrev = () => {
    api?.scrollPrev();
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(1);

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-white max-w-[95vw] w-full bg-transparent border-none shadow-none flex items-center justify-center p-0 [&>button]:hidden">
        <div className="flex flex-row gap-0 items-center justify-center w-min">
          <Button onClick={handlePrev} className="bg-neutral-800 rounded-full">
            <Icon name="Arrow" className="rotate-270" />
          </Button>
          <div className="w-full max-w-240 2xl:max-w-6xl mx-auto px-16">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
                startIndex: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 2xl:-ml-4 flex flex-row items-center">
                {plans.map((plan, index) => (
                  <CarouselItem
                    key={plan.id}
                    className="pl-2 2xl:pl-4 md:basis-1/3 lg:basis-1/3 transition-all duration-300"
                  >
                    <div
                      className={`transform transition-transform duration-500 `}
                    >
                      <SubscriptionCard
                        isActive={selectedIndex === index}
                        plan={plan}
                        setOpen={onOpenChange}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <Button onClick={handleNext} className="bg-neutral-800 rounded-full">
            <Icon name="Arrow" className="rotate-90" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
