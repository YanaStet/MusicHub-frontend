import type { Tag } from "@/entities/tag/types/type";
import { Badge } from "@/shared/shadcn-ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn-ui/card";
import musicImage from "./image 1.jpg";

export type Music = {
  title: string;
  description: string;
  preview: string;
  tags: Tag[];
};
export type MusicCardProps = {
  music: Music;
};

export const MusicCard = ({ music }: MusicCardProps) => {
  return (
    <Card className="bg-neutral-800 border-neutral-700 rounded-lg flex flex-col hover:animate-wiggle cursor-pointer duration-75">
      <CardHeader className="px-6 text-white">
        <CardTitle>{music.title}</CardTitle>
        <CardDescription>{music.description}</CardDescription>
      </CardHeader>
      <div className="w-55 h-30 2xl:w-80 2xl:h-52 overflow-y-hidden">
        <img src={musicImage} alt="Photo" className="object-cover" />
      </div>
      <div className="px-6 flex flex-wrap gap-2">
        {music.tags.map((tag) => (
          <Badge
            variant="outline"
            key={tag.id}
            className="text-white bg-neutral-700 border-neutral-600 border-2"
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </Card>
  );
};
