"use client";

import { Montserrat } from "next/font/google";
import { Card } from "./ui/card";
import { GaugeChart } from "./gauge-chart";
import { SavingsChart } from "./savings-graph";
import ContractSimulator from "./ContractSimulator";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Dashboard() {
  return (
    <div className={`min-h-screen p-6 ${montserrat.className}`}>
      <div className="mx-auto space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-transparent border-none">
            <GaugeChart score={75} />
          </Card>
          <Card className="bg-transparent border-none">
            <SavingsChart />
          </Card>
        </div>
        <Card className="bg-transparent border-none">
          <ContractSimulator />
        </Card>
      </div>
    </div>
  );
}
