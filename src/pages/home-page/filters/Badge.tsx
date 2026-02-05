import clsx from "clsx";

type BadgeValue = {
  isActive: boolean;
  name: string;
};

type BadgeProps<T extends BadgeValue> = {
  value: T;
  handleSelect?: (value: T) => void;
  className?: string;
};

export const Badge = <T extends BadgeValue>({
  value,
  handleSelect,
  className,
}: BadgeProps<T>) => {
  return (
    <div
      className={clsx(
        "py-1 px-2 cursor-pointer rounded-xl duration-300 border-2 flex",
        value.isActive
          ? "bg-neutral-700 border-white"
          : "bg-neutral-800 border-neutral-800",
        handleSelect && "hover:bg-neutral-700",
        className,
      )}
      onClick={() => {
        if (handleSelect) {
          handleSelect(value);
        }
      }}
    >
      {value.name}
    </div>
  );
};
