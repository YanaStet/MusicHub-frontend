import clsx from "clsx";

type BadgeValue = {
  isActive: boolean;
  name: string;
};

type BadgeProps<T extends BadgeValue> = {
  value: T;
  handleSelect: (value: T) => void;
};

export const Badge = <T extends BadgeValue>({
  value,
  handleSelect,
}: BadgeProps<T>) => {
  return (
    <div
      className={clsx(
        "py-1 px-2 cursor-pointer rounded-xl hover:bg-neutral-700 duration-300 border-2 flex",
        value.isActive
          ? "bg-neutral-700 border-white"
          : "bg-neutral-800 border-neutral-800",
      )}
      onClick={() => {
        handleSelect(value);
      }}
    >
      {value.name}
    </div>
  );
};
