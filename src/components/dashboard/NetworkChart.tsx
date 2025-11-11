import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", bandwidth: 45, latency: 12 },
  { time: "04:00", bandwidth: 52, latency: 15 },
  { time: "08:00", bandwidth: 89, latency: 18 },
  { time: "12:00", bandwidth: 120, latency: 22 },
  { time: "16:00", bandwidth: 95, latency: 16 },
  { time: "20:00", bandwidth: 67, latency: 14 },
];

export const NetworkChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Network Performance
        </CardTitle>
        <CardDescription>24-hour bandwidth and latency trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="bandwidth" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Bandwidth (Mbps)"
            />
            <Line 
              type="monotone" 
              dataKey="latency" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name="Latency (ms)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
