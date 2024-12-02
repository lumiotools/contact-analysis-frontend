"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NegotiationChatbot } from "@/components/negotiation-chatbot";
import DiscountDetails from "@/components/discount-details";
import ContractAnalysis from "@/components/contract-analysis";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Trophy,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SavingsMetrics from "@/components/SavingsMetrics";

const serviceData = [
  {
    name: "Next Day Air Letter",
    weightRange: "All",
    discount: 72,
    negotiationTactic:
      "Use value-added services to highlight competitive pricing",
    details: "Leverage high-volume shipping patterns to negotiate better rates",
  },
  {
    name: "3 Day Select Package",
    weightRange: "All",
    discount: 62,
    negotiationTactic: "Bundle with other services for increased savings",
    details: "Consider long-term commitment for better discount rates",
  },
  {
    name: "2nd Day Air AM CWT",
    weightRange: "All",
    discount: 0,
    negotiationTactic: "Focus on service reliability metrics",
    details:
      "Highlight consistent shipping volumes to negotiate initial discounts",
  },
];

function DiscountRow({ service, isActive, onToggle }) {
  const getDiscountColor = (discount) => {
    if (discount >= 65) return "text-green-400";
    if (discount >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getProgressColor = (discount) => {
    if (discount >= 65) return "bg-green-400";
    if (discount >= 40) return "bg-orange-400";
    return "bg-red-400";
  };

  const getBorderColor = (discount) => {
    if (discount >= 65) return "border-green-500/20";
    if (discount >= 40) return "border-orange-500/20";
    return "border-red-500/20";
  };

  const getHoverEffect = (discount) => {
    if (discount >= 65) return "hover:bg-green-500/5";
    if (discount >= 40) return "hover:bg-orange-500/5";
    return "hover:bg-red-500/5";
  };

  return (
    <div
      className={`border ${getBorderColor(service.discount)} rounded-xl overflow-hidden mb-4`}
    >
      <div
        className={`p-6 bg-[#2A2A36] cursor-pointer ${getHoverEffect(
          service.discount,
        )}`}
        onClick={onToggle}
      >
        <div className="grid grid-cols-3 items-center">
          <div>
            <h3 className="font-bold text-white">
              {service.name}
            </h3>
          </div>
          <div className="text-center text-gray-400">
            {service.weightRange}
          </div>
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <span
                className={`font-bold text-lg ${getDiscountColor(
                  service.discount,
                )}`}
              >
                {service.discount}%
              </span>
              <div
                className="w-32 h-2 bg-[#1C1C28] rounded-full overflow-hidden"
              >
                <div
                  className={`h-full ${getProgressColor(
                    service.discount,
                  )} transition-all duration-500 ease-in-out`}
                  style={{ width: `${service.discount}%` }}
                />
              </div>
            </div>
            {isActive ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isActive && (
        <div
          className="p-6 bg-[#23232F] space-y-4 animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm text-gray-400 mb-2">
                Negotiation Tactic
              </h4>
              <p className="text-white">
                {service.negotiationTactic}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400 mb-2">
                Additional Details
              </h4>
              <p className="text-white">
                {service.details}
              </p>
            </div>
          </div>
          <DiscountDetails currentDiscount={service.discount} />
        </div>
      )}
    </div>
  );
}

export default function DiscountResults() {
  // const location = useLocation();
  const location={};
  const navigate = useRouter();
  const { formData } = location?.state || {};
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const handleRowToggle = (index) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };


  useEffect(()=>{
    console.log(localStorage.getItem('data'));
  },[])

  return (
    <div
      className="h-screen bg-[#1C1C28] flex items-center justify-center w-full"
    >
      <div className="w-full h-full max-w-[1800px] mx-auto">
        <div
          className="relative h-full w-full bg-[#23232F]/90 backdrop-blur-xl border border-[#2A2A36] overflow-x-hidden"
        >
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
          />

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <Button
              variant="ghost"
              className="absolute left-8 top-8 text-gray-400 hover:bg-gray-800/50 hover:text-white"
              onClick={() => navigate.push("/contract-discounts")}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1
                  className="text-4xl lg:text-5xl font-bold text-white mb-4"
                >
                  Discount Results
                </h1>
                <p className="text-xl text-gray-400">
                  Here's your calculated contract discount
                </p>
              </div>

              <div className="space-y-10">
                {/* <div className="grid grid-cols-3 gap-6">
                  <div
                    className="bg-[#2A2A36] rounded-2xl p-6 relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10"
                    />
                    <div className="relative z-10 text-left">
                      <h3
                        className="text-lg font-semibold text-white mb-3"
                      >
                        Average Potential Savings
                      </h3>
                      <div
                        className="text-5xl font-bold text-orange-500 mb-3"
                      >
                        41%
                      </div>
                      <p className="text-xs text-gray-400">
                        Based on your weekly charges
                      </p>
                    </div>
                  </div>

                  <div
                    className="bg-[#2A2A36] rounded-2xl p-6 relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                    />
                    <div className="relative z-10 text-left">
                      <Trophy
                        className="h-6 w-6 text-blue-500 mb-3"
                      />
                      <h3
                        className="text-lg font-semibold text-white mb-3"
                      >
                        Your Rank
                      </h3>
                      <div
                        className="text-5xl font-bold text-blue-500 mb-3"
                      >
                        18
                        <span className="text-xl">
                          th
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Out of 25 companies in the pool
                      </p>
                    </div>
                  </div>

                  <div
                    className="bg-[#2A2A36] rounded-2xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-700">
                      <DollarSign
                        className="h-6 w-6 text-green-500 mb-2"
                      />
                      <h4
                        className="text-sm text-gray-400 mb-1 text-left"
                      >
                        Your Total Savings
                      </h4>
                      <div
                        className="text-2xl font-bold text-green-500 text-left"
                      >
                        $15,000
                      </div>
                    </div>
                    <div className="p-4">
                      <TrendingUp
                        className="h-6 w-6 text-orange-500 mb-2"
                      />
                      <h4
                        className="text-sm text-gray-400 mb-1 text-left"
                      >
                        Best Discount Available
                      </h4>
                      <div
                        className="text-2xl font-bold text-orange-500 text-left"
                      >
                        72%
                      </div>
                    </div>
                  </div>
                </div> */}


                  <SavingsMetrics/>

                {/* Contract Analysis Component */}
                <ContractAnalysis />

                <div className="space-y-6">
                  <div
                    className="flex justify-between text-sm text-gray-400 px-6"
                  >
                    <div className="flex-1">
                      Service Name
                    </div>
                    <div className="flex-1 text-center">
                      Weight Range
                    </div>
                    <div className="flex-1 text-right">
                      Discount
                    </div>
                  </div>

                  {serviceData.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
                      id={`2m4i8h_${index}`}
                    />
                  ))}
                </div>

                <NegotiationChatbot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
