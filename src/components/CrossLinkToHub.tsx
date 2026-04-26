import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CrossLinkToHubProps {
  hubPath: string;
  hubAnchor?: string;
  children: React.ReactNode;
  hubTitle?: string;
}

/**
 * Polls the DOM for an element with the given id, scrolling to it once it appears.
 * Handles lazy-loaded routes, accordion auto-open and async chunk loading.
 */
const scrollToAnchorWhenReady = (anchor: string, maxWaitMs = 3000) => {
  const deadline = Date.now() + maxWaitMs;
  const tryScroll = () => {
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("highlight-flash");
      setTimeout(() => el.classList.remove("highlight-flash"), 1500);
      return;
    }
    if (Date.now() < deadline) {
      window.requestAnimationFrame(() => setTimeout(tryScroll, 80));
    }
  };
  tryScroll();
};

const CrossLinkToHub = ({
  hubPath,
  hubAnchor,
  children,
  hubTitle,
}: CrossLinkToHubProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const fullPath = hubAnchor ? `${hubPath}#${hubAnchor}` : hubPath;
    navigate(fullPath);

    if (hubAnchor) {
      // Route/component may mount lazily; poll for the element rather than guessing a delay.
      scrollToAnchorWhenReady(hubAnchor);
    }
  };

  const link = (
    <span
      onClick={handleClick}
      className="inline-flex items-center gap-1 cursor-pointer text-[hsl(192,100%,50%)] hover:underline transition-all duration-200"
      style={{
        textShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.textShadow =
          "0 0 8px rgba(0,212,255,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.textShadow = "none";
      }}
    >
      <ExternalLink className="inline w-3 h-3 flex-shrink-0" />
      {children}
    </span>
  );

  if (hubTitle) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {hubTitle}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};

export default CrossLinkToHub;
