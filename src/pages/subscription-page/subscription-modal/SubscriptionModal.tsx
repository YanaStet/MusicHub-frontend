import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/shadcn-ui/carousel";
import { SubscriptionCard } from "./subscription-card/SubscriptionCard";
import { useEffect, useState } from "react";

const plans = [
  { id: "free", name: "Free Plan", price: 500 },
  { id: "pro", name: "Pro Plan", price: 900 },
  { id: "max", name: "Pro Max Plan", price: 9999 },
];

export const SubscriptionModal = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    if (!api) return;

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
    <div className="w-full max-w-6xl mx-auto px-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: false,
          startIndex: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 flex flex-row items-center">
          {plans.map((plan, index) => (
            <CarouselItem
              key={plan.id}
              className="pl-4 md:basis-1/3 lg:basis-1/3 transition-all duration-300"
            >
              <div className={`transform transition-transform duration-500 `}>
                <SubscriptionCard
                  isActive={selectedIndex === index}
                  plan={plan}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="text-white" />
        <CarouselNext className="text-white" />
      </Carousel>
    </div>
  );
};
