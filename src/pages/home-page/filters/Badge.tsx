import clsx from "clsx";
import type { SizeDisplay, TagDisplay } from "./Filters";

type TagBadgeProps = {
  value: TagDisplay;
  handleSelect: (tag: TagDisplay) => void;
};

type SizeBadgeProps = {
  value: SizeDisplay;
  handleSelect: (tag: SizeDisplay) => void;
};

export const TagBadge = ({ value, handleSelect }: TagBadgeProps) => {
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

export const SizeBadge = ({ value, handleSelect }: SizeBadgeProps) => {
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
