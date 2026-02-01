import { Icon } from "@/shared/shadcn-ui/icon";
import { Typography } from "@/shared/shadcn-ui/typography";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { TagDisplay } from "../home-page/filters/Filters";
import { Badge } from "../home-page/filters/Badge";
import PdfViewer from "./music-pdf/PdfReader";
import audio from "./audio-sample.mp3";
import samplePdf from "./music-pdf/sample.pdf";
import { Button } from "@/shared/shadcn-ui/button";
import { Pause } from "lucide-react";
import { Slider } from "@/shared/shadcn-ui/slider";

const tag: TagDisplay[] = [
  {
    id: 1,
    name: "Vivo",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic",
    isActive: false,
  },
  {
    id: 3,
    name: "Jazz",
    isActive: false,
  },
  {
    id: 4,
    name: "Cool",
    isActive: false,
  },
  {
    id: 5,
    name: "Funny",
    isActive: false,
  },
  {
    id: 6,
    name: "Pop",
    isActive: false,
  },
  {
    id: 7,
    name: "Rock",
    isActive: false,
  },
];

export const MusicPage = () => {
  const [showDescrToggle, setShowDescrToggle] = useState(false);
  const [isDescrExpanded, setIsDescrExpanded] = useState(false);
  const descrRef = useRef<HTMLDivElement>(null);
  const [showTagsToggle, setShowTagsToggle] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const tagsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const descr =
    " Description DescriptionDescription Description Description Description Description Description Description DescriptionDescription Description Description Description Description Description Description Description Description DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescriptionDescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription DescriptionDescription  DescriptionDescription Description Description Description Description Description Description Description";

  const COLLAPSED_HEIGHT = 160;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  useLayoutEffect(() => {
    if (descrRef.current) {
      const isOverflowing = descrRef.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowDescrToggle(isOverflowing);
    }
  }, [descr]);

  useLayoutEffect(() => {
    if (tagsRef.current) {
      const isOverflowing = tagsRef.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowTagsToggle(isOverflowing);
    }
  }, [tag]);

  const remainingTime = duration - currentTime;

  return (
    <div className="px-25 py-10 flex gap-10">
      <div className="w-60 2xl:w-80">
        <Typography variant="h2">Mutter</Typography>

        <div className="relative my-8">
          <div
            ref={tagsRef}
            className={clsx(
              "transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar",
              isTagsExpanded
                ? "max-h-50 2xl:max-h-70 overflow-y-auto"
                : "max-h-25 2xl:max-h-40 overflow-hidden",
            )}
          >
            <Typography variant="body3">{descr}</Typography>
          </div>
          {showTagsToggle && (
            <>
              <div
                className={`absolute inset-x-0 bottom-2 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isTagsExpanded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />
              <div className="w-full flex justify-center mt-1">
                <Icon
                  name="Arrow"
                  className={`w-3 cursor-pointer transition-transform duration-300 ${
                    isTagsExpanded ? "rotate-0" : "rotate-180"
                  }`}
                  onClick={() => {
                    setIsTagsExpanded(!isTagsExpanded);
                  }}
                />
              </div>
            </>
          )}
        </div>

        <div className="w-full rounded-lg h-60 overflow-hidden">
          {/* <img src="#" alt="cover" /> */}
          <div className="w-full h-full bg-neutral-700"></div>
        </div>

        <div className="my-8 flex gap-1 text-neutral-400 text-base">
          Uploaded by
          <Link to={ROUTE_PATHS.PROFILE} className="underline">
            Naman Chauhan
          </Link>
        </div>

        <Typography variant="h3" className="my-8">
          Tags
        </Typography>

        <div className="relative">
          <div
            ref={descrRef}
            className={clsx(
              "transition-[max-height] duration-500 [scrollbar-gutter:stable] custom-scrollbar flex flex-wrap gap-2",
              isDescrExpanded
                ? "max-h-50 2xl:max-h-70 overflow-y-auto"
                : "max-h-25 2xl:max-h-40 overflow-hidden",
            )}
          >
            {tag.map((t) => (
              <Badge value={t} key={t.id} handleSelect={() => {}} />
            ))}
          </div>
          {showDescrToggle && (
            <>
              <div
                className={`absolute inset-x-0 bottom-2 h-20 bg-linear-to-t from-neutral-900 to-transparent transition-opacity duration-300 flex justify-center items-end pb-2 ${
                  isDescrExpanded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />
              <div className="w-full flex justify-center mt-1">
                <Icon
                  name="Arrow"
                  className={`w-3 cursor-pointer transition-transform duration-300 ${
                    isDescrExpanded ? "rotate-0" : "rotate-180"
                  }`}
                  onClick={() => {
                    setIsDescrExpanded(!isDescrExpanded);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between w-full">
          <div className="flex gap-6 items-center">
            <Button
              variant="default"
              className="bg-white text-black rounded-full hover:bg-neutral-400"
              size="lg"
            >
              Download
            </Button>
            <div className="w-6 h-6">
              <Icon name="Heart" />
            </div>
            <div className="flex gap-1 text-neutral-400">
              <div className="w-5">
                <Icon name="Eye" className="text-neutral-400" />
              </div>
              16K
            </div>
          </div>
          <div className="flex items-center gap-4 bg-transparent text-white p-2 rounded-lg">
            <audio
              ref={audioRef}
              src={audio}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            <Button
              onClick={togglePlay}
              variant="secondary"
              className="rounded-full w-10 h-10 flex justify-center"
            >
              {isPlaying ? (
                <Pause fill="black" className="text-black w-4 h-4" />
              ) : (
                <div className="w-4 h-4">
                  <Icon name="Resume" />
                </div>
              )}
            </Button>

            <div className="flex flex-col w-100 gap-2">
              <div className="flex justify-between w-full">
                <Typography variant="body3">
                  {formatTime(currentTime)}
                </Typography>

                <Typography variant="body3" className="text-neutral-500">
                  -{formatTime(remainingTime)}
                </Typography>
              </div>
              <div className="relative w-full flex items-center">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={onSliderChange}
                  className="cursor-pointer [&>.relative]:bg-neutral-500 [&>.relative>.absolute]:bg-neutral-300"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <PdfViewer fileUrl={samplePdf} />
          </div>
          <div className="w-80.5 bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <Typography variant="h3">You may also like</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
