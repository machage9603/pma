import React from 'react';
import { Card } from "@/app/components/ui/card";

const UserStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 text-center">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
