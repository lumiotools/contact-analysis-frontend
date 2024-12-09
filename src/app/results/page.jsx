"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NegotiationChatbot } from "@/components/negotiation-chatbot";
import DiscountDetails from "@/components/discount-details";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SavingsMetrics from "@/components/SavingsMetrics";
import { LoadingAnimation } from "@/components/loading-animation";

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
      className={`border ${getBorderColor(
        service.discount
      )} rounded-xl overflow-hidden mb-4`}
    >
      <div
        className={`p-6 bg-[#2A2A36] cursor-pointer ${getHoverEffect(
          service.discount
        )}`}
        onClick={onToggle}
      >
        <div className="grid grid-cols-3 items-center">
          <div>
            <h3 className="font-bold text-white">{service.name}</h3>
          </div>
          <div className="text-center text-gray-400">{service.weightRange}</div>
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <span
                className={`font-bold text-lg ${getDiscountColor(
                  service.discount
                )}`}
              >
                {service.discount}{new String(service.discount).endsWith('%') ? "": new String(service.discount).includes("No") ?"":"%"}
              </span>
              <div className="w-32 h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    service.discount
                  )} transition-all duration-500 ease-in-out`}
                  style={{ width: `${new String(service.discount).endsWith('%') ? service.discount:`${service.discount}%` }` }}
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
        <div className="p-6 bg-[#23232F] space-y-4 animate-in slide-in-from-top duration-200">
          <DiscountDetails currentDiscount={service.discount} />
        </div>
      )}
    </div>
  );
}

export default function DiscountResults() {
  const navigate = useRouter();
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState({});

  const handleRowToggle = (index) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };

  const fetchData = async () => {
    let data = window.localStorage.getItem("data");

    if (!data) {
      navigate.replace("/");
      return;
    }

    data = JSON.parse(data);
    let finalData = {};

    if(!Array.isArray(data)){
      setLoading(false);
      return;
    }

    data.forEach((response) => {
      finalData = { ...finalData, ...response };
    });

    if (finalData) {
      setAnalysis(finalData);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    // setTimeout(() => {
      fetchData();
    // }, 2000);
  }, []);

  const domesticAirServiceLevels = [];
  const domesticGroundServiceLevels = [];
  const internationalServiceLevels = [];
  const accessorialCharge = [];

  // Process domesticAir data
  if (analysis.domesticAir) {
    Object.keys(analysis.domesticAir["Domestic Air Service Level"]).forEach(
      (service) => {
        const serviceData =
          analysis.domesticAir["Domestic Air Service Level"][service];
        if (serviceData.Letter) {
          domesticAirServiceLevels.push({
            name: `${service} Letter`,
            weightRange: serviceData.Letter["Weight Range"],
            discount:
              Number(serviceData.Letter["Current UPS"]?.replace("%", "")) || 0,
          });
        }
        if (serviceData.Package) {
          domesticAirServiceLevels.push({
            name: `${service} Package`,
            weightRange: serviceData.Package["Weight Range"],
            discount:
              Number(serviceData.Package["Current UPS"]?.replace("%", "")) || 0,
          });
        }
      }
    );
  }

  // Process domesticGround data
  if (analysis.domesticGround1) {
    Object.keys(
      analysis.domesticGround1["DOMESTIC GROUND SERVICE LEVEL"]
    ).forEach((service) => {
      domesticGroundServiceLevels.push({
        name: service,
        weightRange: "All",
        discount: Number(
          analysis.domesticGround1["DOMESTIC GROUND SERVICE LEVEL"][service][
            "Current UPS"
          ]?.replace("%", "")
        ),
      });
    });
  }

// Process international data
if (analysis.international1) {
  Object.keys(
    analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"]
  ).forEach((service) => {
    const exportData =
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][
        service
      ];
    if (exportData.Letter) {
      internationalServiceLevels.push({
        name: `Export ${service} Letter`,
        weightRange: exportData.Letter["Weight Range"],
        discount:
          (exportData.Letter["Current UPS"] ?? "No Discount") +
          (exportData.Letter["Incentives Off Effective Rates"] ? 
            ` + ${exportData.Letter["Incentives Off Effective Rates"]}` : "")
      });
    }
    if (exportData.Package) {
      internationalServiceLevels.push({
        name: `Export ${service} Package`,
        weightRange: exportData.Package["Weight Range"],
        discount:
          (exportData.Package["Current UPS"] ?? "No Discount") +
          (exportData.Package["Incentives Off Effective Rates"] ? 
            ` + ${exportData.Package["Incentives Off Effective Rates"]}` : "")
      });
    }
  });
}


  // Process accessorial charges
  if (analysis.accesorials) {
    analysis.accesorials.forEach((accessorial) => {
      accessorialCharge.push({
        name: accessorial.ACCESSORIAL_CHARGE,
        weightRange: accessorial.TERM,
        discount: accessorial.CURRENT_UPS || "No Discount",
      });
    });
  }

  // if (loading) {
  //   return <LoadingAnimation />;
  // }

  return (
    <div className="h-screen bg-[#1C1C28] flex items-center justify-center w-full">
      <div className="w-full h-full max-w-[1800px] mx-auto">
        <div className="relative h-full w-full bg-[#23232F]/90 backdrop-blur-xl border border-[#2A2A36] overflow-x-hidden">
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <Button
              variant="ghost"
              className="absolute left-8 top-8 text-gray-400 hover:bg-gray-800/50 hover:text-white"
              onClick={() => navigate.push("/")}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>

            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Discount Results
              </h1>

              <div className="space-y-10">
                <SavingsMetrics />

                <div className="space-y-6">
                  <p className="text-2xl font-bold text-white text-center">
                    Domestic Air Service Levels
                  </p>
                  {domesticAirServiceLevels.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
                    />
                  ))}

                  <p className="text-2xl font-bold text-white text-center">
                    Domestic Ground Service Levels
                  </p>
                  {domesticGroundServiceLevels.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
                    />
                  ))}

                  <p className="text-2xl font-bold text-white text-center">
                    International Service Levels
                  </p>
                  {internationalServiceLevels.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
                    />
                  ))}

                  <p className="text-2xl font-bold text-white text-center">
                    Accessorial Charges
                  </p>
                  {accessorialCharge.map((charge, index) => (
                    <DiscountRow
                      key={index}
                      service={charge}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
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
