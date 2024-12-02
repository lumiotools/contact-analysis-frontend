import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  FileText,
  HandshakeIcon,
  MessageSquare,
  ChevronLeft,
  Scale,
  Target,
  Briefcase,
  Clock,
} from "lucide-react";

const initialTactics = [
  {
    id: "volume",
    icon: BarChart3,
    title: "Volume Analysis",
    description: "Optimize discounts based on shipping volume",
    color: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/20",
    details:
      "Analyze your shipping volumes to identify opportunities for increased discounts. We'll examine patterns, peak periods, and volume commitments to negotiate better rates.",
    subCards: [
      {
        icon: Target,
        title: "Volume Patterns",
        description: "Analyze shipping patterns and peaks",
      },
      {
        icon: Briefcase,
        title: "Volume Commitment",
        description: "Leverage guaranteed volume deals",
      },
      {
        icon: Scale,
        title: "Benchmarking",
        description: "Compare with industry standards",
      },
      {
        icon: Clock,
        title: "Timing Strategy",
        description: "Optimize shipping schedules",
      },
    ],
  },
  {
    id: "contract",
    icon: FileText,
    title: "Contract Review",
    description: "Analyze contract terms for better rates",
    color: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-500/20",
    details:
      "Our AI-powered analysis examines your contract terms in detail, identifying areas for improvement and negotiation leverage points.",
    subCards: [
      {
        icon: Scale,
        title: "Term Analysis",
        description: "Review contract clauses",
      },
      {
        icon: Target,
        title: "Rate Analysis",
        description: "Compare market rates",
      },
      {
        icon: Briefcase,
        title: "Cost Structure",
        description: "Analyze pricing models",
      },
      {
        icon: Clock,
        title: "Optimization",
        description: "Identify improvement areas",
      },
    ],
  },
  {
    id: "negotiate",
    icon: HandshakeIcon,
    title: "Negotiation Strategy",
    description: "Expert tactics for maximum discounts",
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20",
    details:
      "Leverage our negotiation expertise to secure the best possible discounts. We'll help you identify key leverage points and optimal timing for negotiations.",
    subCards: [
      {
        icon: Target,
        title: "Strategic Points",
        description: "Key negotiation areas",
      },
      {
        icon: Scale,
        title: "Leverage Points",
        description: "Identify advantages",
      },
      {
        icon: Clock,
        title: "Timing",
        description: "Optimal negotiation timing",
      },
      {
        icon: Briefcase,
        title: "Market Position",
        description: "Industry benchmarking",
      },
    ],
  },
];

export function NegotiationChatbot() {
  const [selectedTactic, setSelectedTactic] = useState(null);

  const handleTacticSelect = (tacticId) => {
    setSelectedTactic(initialTactics.find((t) => t.id === tacticId));
  };

  return (
    <Card className="bg-[#23232F]/90 border-[#2A2A36] mt-8">
      <CardHeader className="border-b border-[#2A2A36]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            <CardTitle
              className="text-lg md:text-xl font-semibold text-white"
            >
              Contract Discount Advisor
            </CardTitle>
          </div>
          {selectedTactic && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTactic(null)}
              className="text-gray-400 hover:text-white hover:bg-[#2A2A36]"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {!selectedTactic ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {initialTactics.map((tactic, index) => (
              <button
                key={tactic.id}
                onClick={() => handleTacticSelect(tactic.id)}
                className={`${tactic.color} ${tactic.borderColor} border rounded-xl p-4 md:p-6 text-left transition-all hover:scale-105 relative overflow-hidden group`}
                id={`7b3n63_${index}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 group-hover:to-black/10 transition-all duration-300"
                  id={`eczl9i_${index}`}
                />

                <div className="relative z-10" id={`b36e3z_${index}`}>
                  <tactic.icon
                    className={`h-8 w-8 md:h-10 md:w-10 ${tactic.textColor} mb-4`}
                    id={`wpre47_${index}`}
                  />

                  <h4
                    className={`text-base md:text-lg font-semibold ${tactic.textColor} mb-2`}
                    id={`ioa0wy_${index}`}
                  >
                    {tactic.title}
                  </h4>
                  <p className="text-sm text-gray-400" id={`sdka6e_${index}`}>
                    {tactic.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-[#2A2A36] rounded-xl p-4 md:p-6">
              <h4
                className={`text-lg md:text-xl font-semibold ${selectedTactic.textColor} mb-4`}
              >
                {selectedTactic.title}
              </h4>
              <p className="text-sm md:text-base text-gray-300">
                {selectedTactic.details}
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {selectedTactic.subCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-[#2A2A36] border border-[#2A2A36] rounded-xl p-4 hover:bg-[#2F2F3A] transition-colors"
                  id={`l7wrgr_${index}`}
                >
                  <card.icon
                    className={`h-6 w-6 ${selectedTactic.textColor} mb-2`}
                    id={`rm02wz_${index}`}
                  />

                  <h5
                    className="font-semibold text-white mb-1"
                    id={`fd01zk_${index}`}
                  >
                    {card.title}
                  </h5>
                  <p className="text-sm text-gray-400" id={`862dyk_${index}`}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
