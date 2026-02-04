import { Icon } from "@/shared/shadcn-ui/icon";
import { Typography } from "@/shared/shadcn-ui/typography";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { TagDisplay } from "../home-page/filters/Filters";
import { Badge } from "../home-page/filters/Badge";
import PdfViewer from "../../shared/custom-ui/PdfViewer";
import { Button } from "@/shared/shadcn-ui/button";
import { Pause } from "lucide-react";
import { Slider } from "@/shared/shadcn-ui/slider";
import { SimilarCard } from "./similar-card/SimilarCard";
import { noteHooks } from "@/entities/note/hooks";
import { Loader } from "@/shared/custom-ui/Loader";
import { useMediaQuery } from "react-responsive";
import { showToast } from "@/shared/utils/showToast";

export const MusicPage = () => {
  const [audioError, setAudioError] = useState(false);
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

  const isLaptop = useMediaQuery({ maxWidth: 1439 });

  const { id } = useParams();

  const { data: note, isLoading: isNoteLoading } = noteHooks.useNoteByIdQuery(
    id || "",
  );

  const { data: similar, isLoading: isSimilarLoading } =
    noteHooks.usePaginatedNoteQuery({
      page: 1,
      limit: 7,
      query: "",
      sizes: [],
      tagsIds: note?.data.tags.map((t) => t.id) || [],
      timeSignaturesIds: [],
    });

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
  }, [note?.data.description]);

  useLayoutEffect(() => {
    if (tagsRef.current) {
      const isOverflowing = tagsRef.current.scrollHeight > COLLAPSED_HEIGHT;
      setShowTagsToggle(isOverflowing);
    }
  }, [note?.data.tags]);

  useEffect(() => {
    setAudioError(false);
  }, [note?.data.audioUrl]);

  const remainingTime = duration - currentTime;
  const tagsDisplay: TagDisplay[] = useMemo(() => {
    return (
      note?.data.tags.map((t) => ({
        id: t.id,
        name: t.name,
        isActive: false,
      })) || []
    );
  }, [note]);

  return (
    <div className="px-25 py-10 flex flex-col gap-4">
      {isNoteLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex gap-10">
            <div className="w-60 2xl:w-80">
              <Typography variant="h2">{note?.data.title}</Typography>

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
                  <Typography variant="body3">
                    {note?.data.description}
                  </Typography>
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

              <div className="w-full rounded-lg h-40 2xl:h-60 overflow-hidden mb-8">
                <img
                  src={note?.data.coverImageUrl}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <Link
                to={ROUTE_PATHS.PROFILE}
                className="text-neutral-400 text-sm"
              >
                Uploaded by{" "}
                <span className="underline">
                  {note?.data.author.firstName || ""}{" "}
                  {note?.data.author.lastName || ""}
                </span>
              </Link>

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
                  {tagsDisplay.map((t) => (
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
                    {note?.data.views}
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-transparent text-white p-2 rounded-lg">
                  <audio
                    ref={audioRef}
                    src={note?.data.audioUrl}
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => {
                      showToast(
                        "error",
                        "Something went wrong with the audio...",
                      );
                      setAudioError(true);
                      setIsPlaying(false);
                    }}
                  />

                  <Button
                    onClick={togglePlay}
                    variant="secondary"
                    className="rounded-full w-10 h-10 flex justify-center"
                    disabled={audioError}
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
                  <PdfViewer fileUrl={note?.data.pdfUrl || ""} />
                </div>
                {!isLaptop && (
                  <div className="w-60 2xl:w-80.5 bg-neutral-800 rounded-lg border border-neutral-700 p-6">
                    <Typography variant="h3">You may also like</Typography>
                    <div className="flex flex-col gap-6 mt-6 overflow-y-auto custom-scrollbar">
                      {isSimilarLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Loader />
                        </div>
                      ) : similar?.data.find((n) => n.id === note?.data.id) ? (
                        similar.data.map((n, i) => {
                          if (n.id !== note?.data.id) {
                            return <SimilarCard music={n} key={i} />;
                          }
                        })
                      ) : (
                        similar?.data
                          .slice(0, 5)
                          .map((n, i) => <SimilarCard music={n} key={i} />)
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isLaptop && (
            <div className="w-full h-min bg-neutral-800 rounded-lg border border-neutral-700 p-6">
              <Typography variant="h3">You may also like</Typography>
              <div className="flex flex-row gap-6 mt-6 overflow-y-auto custom-scrollbar">
                {isSimilarLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader />
                  </div>
                ) : similar?.data.find((n) => n.id === note?.data.id) ? (
                  similar.data.map((n, i) => {
                    if (n.id !== note?.data.id) {
                      return <SimilarCard music={n} key={i} />;
                    }
                  })
                ) : (
                  similar?.data
                    .slice(0, 5)
                    .map((n, i) => <SimilarCard music={n} key={i} />)
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
