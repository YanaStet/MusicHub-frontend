import { Button } from "@/shared/shadcn-ui/button";
import { Filters } from "./filters/Filters";
import { Input } from "@/shared/shadcn-ui/input";
import { ButtonGroup } from "@/shared/shadcn-ui/button-group";
import { Field } from "@/shared/shadcn-ui/field";
import { MusicCard } from "./music-cards/MusicCard";
import { Typography } from "@/shared/shadcn-ui/typography";

export const HomePage = () => {
  return (
    <div className="py-10 px-25 flex gap-10">
      <Filters />
      <div className="w-full max-w-200 2xl:max-w-340">
        <Field className="w-full mb-10">
          <ButtonGroup className="w-full">
            <Input
              id="input-button-group"
              placeholder="Type to search..."
              className="bg-neutral-800 border-neutral-700 w-full"
            />
            <Button variant="secondary" className="bg-neutral-600 text-white">
              Search
            </Button>
          </ButtonGroup>
        </Field>
        <Typography variant="h2">Popular</Typography>
        <div className="w-full flex flex-wrap gap-6 mt-8 justify-between">
          <MusicCard
            music={{
              title: "Mutter",
              description: "Cool song",
              preview: "sdsd",
              tags: [
                { id: 1, name: "rock" },
                { id: 2, name: "metal" },
              ],
              id: 1,
            }}
          />
          <MusicCard
            music={{
              title: "Mutter",
              description: "Cool song",
              preview: "sdsd",
              tags: [
                { id: 1, name: "rock" },
                { id: 2, name: "metal" },
              ],
              id: 2,
            }}
          />
          <MusicCard
            music={{
              title: "Mutter",
              description: "Cool song",
              preview: "sdsd",
              tags: [
                { id: 1, name: "rock" },
                { id: 2, name: "metal" },
              ],
              id: 3,
            }}
          />
          <MusicCard
            music={{
              title: "Mutter",
              description: "Cool song",
              preview: "sdsd",
              tags: [
                { id: 1, name: "rock" },
                { id: 2, name: "metal" },
              ],
              id: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};
