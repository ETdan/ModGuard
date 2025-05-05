
import { Badge } from "@/components/ui/badge";

type ModerationBadgeProps = {
  type: 'toxicity' | 'harassment' | 'hate-speech' | 'sexual' | 'violence' | 'spam';
  score?: number;
  showScore?: boolean;
}

export default function ModerationBadge({ type, score = 0, showScore = false }: ModerationBadgeProps) {
  const typeLabel = {
    'toxicity': 'Toxicity',
    'harassment': 'Harassment',
    'hate-speech': 'Hate Speech',
    'sexual': 'Sexual Content',
    'violence': 'Violence',
    'spam': 'Spam'
  };
  
  const badgeVariants = {
    'toxicity': 'bg-red-500/10 text-red-500 border-red-500/20',
    'harassment': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'hate-speech': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'sexual': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    'violence': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'spam': 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  };
  
  return (
    <Badge variant="outline" className={`text-xs font-medium ${badgeVariants[type]}`}>
      {typeLabel[type]}
      {showScore && score !== undefined && (
        <span className="ml-1">{Math.round(score * 100)}%</span>
      )}
    </Badge>
  );
}
