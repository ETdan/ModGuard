
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ModerationBadge from "../ModerationBadge";

type FlagData = {
  type: 'toxicity' | 'harassment' | 'hate-speech' | 'sexual' | 'violence' | 'spam';
  value: number;
}

type FlagDistributionCardProps = {
  data: FlagData[];
}

export default function FlagDistributionCard({ data }: FlagDistributionCardProps) {
  const COLORS = [
    'hsl(var(--toxicity))',
    'hsl(var(--harassment))',
    'hsl(var(--hate-speech))',
    'hsl(var(--sexual))',
    'hsl(var(--violence))',
    'hsl(var(--spam))'
  ];
  
  const renderLegend = () => {
    return (
      <ul className="flex flex-wrap gap-2 justify-center mt-4">
        {data.map((entry, index) => (
          <li key={`legend-${index}`}>
            <ModerationBadge type={entry.type} />
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Flag Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, '']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {renderLegend()}
      </CardContent>
    </Card>
  );
}
