import HatchedPattern from "@/components/ui/hatched-pattern";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GitHubCalendar } from "react-github-calendar";

const GithubSection = () => {
  return (
    <>
      <HatchedPattern />

      <section className="w-full text-zinc-300 font-mono text-sm px-5 py-3">
        <div className="w-full [&_svg]:w-full [&_svg]:h-auto">
          <GitHubCalendar
            blockRadius={0}
            username="RizkyArdiansyahhh"
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            theme={{
              dark: ["#18181b", "#3f3f46", "#71717a", "#d4d4d8", "#ffffff"],
              light: ["#fafafa", "#e4e4e7", "#a1a1aa", "#52525b", "#27272a"],
            }}
            renderBlock={(block, activity) => (
              <Tooltip key={activity.date}>
                <TooltipTrigger render={block} />
                <TooltipContent>
                  <p>
                    {activity.count}{" "}
                    {activity.count === 1 ? "contribution" : "contributions"} on{" "}
                    {activity.date}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          />
        </div>
      </section>
      <HatchedPattern />
    </>
  );
};

export default GithubSection;
