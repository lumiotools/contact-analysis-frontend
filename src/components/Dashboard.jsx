"use client";

import { Montserrat } from "next/font/google";
import { Card } from "./ui/card";
import { GaugeChart } from "./gauge-chart";
import { SavingsChart } from "./savings-graph";
import ContractSimulator from "./ContractSimulator";
import { useEffect, useState } from "react";
import { extractContractData } from "@/utils/extractContractData";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Dashboard() {
  const [contractData, setContractData] = useState(null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedGraphData = localStorage.getItem("graphData");

      if (storedGraphData) {
        const parsedGraphData = JSON.parse(storedGraphData);
        setGraphData(parsedGraphData);
        const extractedContractData = extractContractData(parsedGraphData);
        setContractData(extractedContractData);
      }
    };

    fetchData();
  }, []);

  console.log("contractData",contractData)

  return (
    <div className={`min-h-screen p-6 ${montserrat.className}`}>
      <div className="mx-auto space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-transparent border-none">
            <GaugeChart score={contractData?.competitiveScore || 75} />
          </Card>
          <Card className="bg-transparent border-none">
            <SavingsChart data={graphData} />
          </Card>
        </div>
        <Card className="bg-transparent border-none">
          <ContractSimulator data={contractData} />
        </Card>
      </div>
    </div>
  );
}
