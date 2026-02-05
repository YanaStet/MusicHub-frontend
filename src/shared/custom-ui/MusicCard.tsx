import { Badge } from "@/shared/shadcn-ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn-ui/card";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import type { Note } from "@/entities/note/model";
import React from "react";
import { Icon } from "@/shared/shadcn-ui/icon";
import { Button } from "@/shared/shadcn-ui/button";

export type MusicCardProps = {
  music: Note;
  isMine?: boolean;
  handleOpenDeleteModal?: () => void;
  handleOpenEditModal?: () => void;
  setNoteId?: (id: number) => void;
};

export const MusicCard = React.forwardRef<HTMLDivElement, MusicCardProps>(
  (
    { music, isMine, handleOpenDeleteModal, handleOpenEditModal, setNoteId },
    ref,
  ) => {
    const navigate = useNavigate();

    const handleClick = () => {
      const path = generatePath(ROUTE_PATHS.MUSIC, { id: music.id });
      navigate(path);
    };

    return (
      <Card
        className="bg-neutral-800 border-neutral-700 rounded-lg flex flex-col cursor-pointer duration-75 h-min"
        onClick={handleClick}
        ref={ref}
      >
        <div className="flex justify-between px-4">
          <CardHeader className="text-white w-48">
            <CardTitle>{music.title}</CardTitle>
            <CardDescription className="max-w-full truncate">
              {music.description}
            </CardDescription>
          </CardHeader>
          {isMine && handleOpenDeleteModal && handleOpenEditModal && (
            <div className="flex gap-2 text-neutral-500">
              <Button
                variant="ghost"
                className="p-0 hover:text-red-400 active:text-white hover:bg-transparent active:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  if (setNoteId) setNoteId(music.id);
                  handleOpenDeleteModal();
                }}
              >
                <Icon name="Delete" />
              </Button>
              <Button
                variant="ghost"
                className="p-0 hover:text-white active:text-white hover:bg-transparent active:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEditModal();
                }}
              >
                <Icon name="Pen" />
              </Button>
            </div>
          )}
        </div>
        <div className="w-55 h-30 2xl:w-79 2xl:h-52 overflow-y-hidden">
          <img
            src={music.coverImageUrl}
            alt="Photo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="px-4 flex flex-wrap gap-2">
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
  },
);
