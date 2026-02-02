import { Icon } from "@/shared/shadcn-ui/icon";
import { Typography } from "@/shared/shadcn-ui/typography";
import { generatePath, Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import type { Note } from "@/entities/note/model";

type SimilarCardProps = {
  music: Note;
};

export const SimilarCard = ({ music }: SimilarCardProps) => {
  return (
    <Link
      to={generatePath(ROUTE_PATHS.MUSIC, { id: music.id })}
      className="flex gap-2.5 cursor-pointer hover:bg-neutral-700 rounded-lg duration-300 p-1"
    >
      <div className="w-30 h-22.5 rounded-lg overflow-hidden">
        <img
          src={music.coverImageUrl}
          alt="Photo"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1 w-40">
          <Typography variant="h3" className="truncate">
            {music.title}
          </Typography>
          <Typography
            variant="body3"
            className="underline text-neutral-400 truncate"
          >
            {music?.author.firstName || ""} {music?.author.lastName || ""}
          </Typography>
        </div>
        <div className="text-neutral-400 flex gap-1 items-center">
          <div className="w-3 items-center">
            <Icon name="Eye" />
          </div>
          <Typography variant="body3">{music.views}</Typography>
        </div>
      </div>
    </Link>
  );
};
