import { getLinksForHub } from "@/config/crosslinks";
import { CrossLinkBadge } from "@/components/CrossLinkToLesson";
import { useMemo } from "react";

interface HubLessonBadgesProps {
  hubPath: string;
  hubAnchor?: string;
}

const HubLessonBadges = ({ hubPath, hubAnchor }: HubLessonBadgesProps) => {
  const links = useMemo(() => {
    const all = getLinksForHub(hubPath, hubAnchor);
    // Deduplicate by lessonId
    const seen = new Set<string>();
    return all.filter((l) => {
      if (seen.has(l.lessonId)) return false;
      seen.add(l.lessonId);
      return true;
    });
  }, [hubPath, hubAnchor]);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2 mb-4">
      <span className="text-xs text-muted-foreground mr-1">Используется в:</span>
      {links.map((link) => (
        <CrossLinkBadge
          key={link.lessonId}
          lessonId={link.lessonId}
          lessonPath={link.lessonPath}
          lessonTitle={link.lessonTitle}
          lessonLevel={link.lessonLevel}
        />
      ))}
    </div>
  );
};

export default HubLessonBadges;
