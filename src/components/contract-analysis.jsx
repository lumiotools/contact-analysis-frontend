import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContractAnalysis() {
  const positions = [
    {
      position: 2,
      title: "Fairly Competitive",
      indicators: [
        { label: "Ground Residential", value: "28%" },
        { label: "Ground Commercial", value: "32%" },
        { label: "Air Services", value: "15%" },
        { label: "Surcharges", value: "15%" },
      ],

      score: 850,
      color: "from-blue-500/10 via-purple-500/10 to-blue-500/10",
      textColor: "text-blue-500",
      bgColor: "bg-[#1A1A24]",
      height: "h-[300px]",
    },
    {
      position: 1,
      title: "Most Competitive",
      indicators: [
        { label: "Ground Residential", value: "42%" },
        { label: "Ground Commercial", value: "45%" },
        { label: "Air Services", value: "25%" },
        { label: "Surcharges", value: "22%" },
      ],

      score: 920,
      color: "from-orange-500/10 via-purple-500/10 to-orange-500/10",
      textColor: "text-orange-500",
      bgColor: "bg-[#1A1A24]",
      height: "h-[350px]",
    },
    {
      position: 3,
      title: "Least Competitive",
      indicators: [
        { label: "Ground Residential", value: "18%" },
        { label: "Ground Commercial", value: "25%" },
        { label: "Air Services", value: "10%" },
        { label: "Surcharges", value: "12%" },
      ],

      score: 780,
      color: "from-purple-500/10 via-blue-500/10 to-purple-500/10",
      textColor: "text-purple-500",
      bgColor: "bg-[#1A1A24]",
      height: "h-[250px]",
    },
  ];

  return (
    <div className="w-full bg-[#1A1A24] rounded-2xl p-8 mt-8">
      <div
        className="text-center space-y-4 max-w-3xl mx-auto mb-12"
      >
        <Badge
          variant="outline"
          className="bg-orange-500/10 text-orange-500 border-orange-500/20 mb-4"
        >
          Contract Analysis
        </Badge>
        <h2 className="text-3xl font-bold text-white">
          Your Contract Breakdown
        </h2>
        <p className="text-gray-400 text-sm">
          We broke down and compared your contract against our proprietary
          database of hundreds of UPS contracts with similar annual spend
          between $1M and $1.2M to identify how favorable each of your discount
          terms are
        </p>
      </div>

      <div className="flex items-end justify-between px-4">
        {positions
          .sort((a, b) => a.position - b.position)
          .map((pos, index) => (
            <div
              key={pos.position}
              className="group flex flex-col items-center gap-4"
              id={`n8wlup_${index}`}
            >
              <div
                className="relative flex flex-col items-center space-y-2"
                id={`h1v7bj_${index}`}
              >
                <div
                  className="grid grid-cols-2 gap-2 w-60"
                  id={`ixnza4_${index}`}
                >
                  {pos.indicators.map((indicator, i) => (
                    <div
                      key={i}
                      className="bg-[#1C1C28] p-3 rounded-lg border border-gray-800/50 hover:bg-[#23232F] transition-all duration-300"
                      id={`arwx5y_${index}`}
                    >
                      <div
                        className="text-xs text-gray-400"
                        id={`agnt2r_${index}`}
                      >
                        {indicator.label}
                      </div>
                      <div
                        className="text-sm font-semibold text-white mt-1"
                        id={`3v06lz_${index}`}
                      >
                        {indicator.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card
                className={`relative flex w-60 transform items-center justify-center transition-all duration-500 group-hover:translate-y-[-8px] border-none ${pos.bgColor} bg-gradient-to-br ${pos.color} ${pos.height}`}
                id={`b0peas_${index}`}
              >
                <div
                  className="absolute bottom-8 flex flex-col items-center gap-3"
                  id={`2hrqvg_${index}`}
                >
                  <span
                    className="text-lg font-medium text-white"
                    id={`ht9ikw_${index}`}
                  >
                    {pos.title}
                  </span>
                  <span
                    className={`text-4xl font-bold ${pos.textColor}`}
                    id={`jz8hpb_${index}`}
                  >
                    {pos.position}
                  </span>
                  <div
                    className="text-xs text-gray-300 mt-2 bg-black/40 px-2 py-0.5 rounded-full"
                    id={`soy8qo_${index}`}
                  >
                    Orchestro Performance Index: {pos.score}
                  </div>
                </div>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
