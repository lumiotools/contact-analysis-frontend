"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NegotiationChatbot } from "@/components/negotiation-chatbot";
import DiscountDetails from "@/components/discount-details";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import SavingsMetrics from "@/components/SavingsMetrics";
import { combineData } from "@/utils/combineData";
import { ContractChat } from "@/components/contract-chat";
import Dashboard from "@/components/Dashboard";

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
                ~ {service.discount}
                {new String(service.discount).endsWith("%")
                  ? ""
                  : new String(service.discount).includes("No")
                  ? ""
                  : "%"}
              </span>
              <div className="w-32 h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    service.discount
                  )} transition-all duration-500 ease-in-out`}
                  style={{
                    width: `${
                      new String(service.discount).endsWith("%")
                        ? service.discount
                        : `${service.discount}%`
                    }`,
                  }}
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
          <DiscountDetails
            currentDiscount={service.discount}
            serviceName={service.name}
          />
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
  const [graphData, setGraphData] = useState([]);

  const handleRowToggle = (index) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };

  const fetchData = async () => {
    let data = window.localStorage.getItem("data");
    let graphData = localStorage.getItem("graphData");
    if (!data || !graphData) {
      navigate.replace("/");
      return;
    }

    data = JSON.parse(data);
    const gData = JSON.parse(graphData);
    setGraphData(gData);
    let finalData = {};

    if (!Array.isArray(data)) {
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

  //domestic res and comm

  if (analysis.domesticGround1) {
    const groundData1 =
      analysis.domesticGround1["DOMESTIC GROUND SERVICE LEVEL"];

    // Get Commercial and Residential Current UPS from domesticGround1
    let commercialCurrentUPS = 0;
    let residentialCurrentUPS = 0;

    if (groundData1["UPS® Ground - Commercial Package - Prepaid"]) {
      commercialCurrentUPS =
        Number(
          groundData1["UPS® Ground - Commercial Package - Prepaid"][
            "Current UPS"
          ]?.replace("%", "")
        ) || 0;
    }

    if (groundData1["UPS® Ground - Residential Package - Prepaid"]) {
      residentialCurrentUPS =
        Number(
          groundData1["UPS® Ground - Residential Package - Prepaid"][
            "Current UPS"
          ]?.replace("%", "")
        ) || 0;
    }

    // Process domesticGround2 to add incentives
    if (
      analysis.domesticGround2 &&
      analysis.domesticGround2["DOMESTIC GROUND SERVICE LEVEL"]
    ) {
      const groundData2 =
        analysis.domesticGround2["DOMESTIC GROUND SERVICE LEVEL"];

      const commercialIncentivesKey =
        "UPS® Ground - Commercial Package - Prepaid - Incentives Off Effective Rates";
      const residentialIncentivesKey =
        "UPS® Ground - Residential Package - Prepaid - Incentives Off Effective Rates";

      // Collect all incentives to find the minimum non-null incentive
      let allIncentives = [];

      [commercialIncentivesKey, residentialIncentivesKey].forEach((key) => {
        if (groundData2[key]) {
          const incentiveData = groundData2[key];
          Object.values(incentiveData).forEach((value) => {
            if (typeof value === "string" && value.endsWith("%")) {
              const val = parseFloat(value.replace("%", ""));
              if (!isNaN(val)) {
                allIncentives.push(val);
              }
            }
          });
        }
      });

      // If no non-null incentives found, fallback to a known minimum (e.g., 53)
      const minIncentive =
        allIncentives.length > 0 ? Math.min(...allIncentives) : 53;

      // Commercial weight ranges
      if (groundData2[commercialIncentivesKey]) {
        const commercialIncentives = groundData2[commercialIncentivesKey];
        Object.keys(commercialIncentives).forEach((weightRange) => {
          const incStr = commercialIncentives[weightRange];
          let incentiveVal = minIncentive;
          if (incStr && incStr.endsWith("%")) {
            incentiveVal = parseFloat(incStr.replace("%", "")) || minIncentive;
          }
          const total = commercialCurrentUPS + incentiveVal;
          domesticGroundServiceLevels.push({
            name: "UPS® Ground - Commercial Package - Prepaid",
            weightRange: weightRange,
            discount: total,
          });
        });
      }

      // Residential weight ranges
      if (groundData2[residentialIncentivesKey]) {
        const residentialIncentives = groundData2[residentialIncentivesKey];
        Object.keys(residentialIncentives).forEach((weightRange) => {
          const incStr = residentialIncentives[weightRange];
          let incentiveVal = minIncentive;
          if (incStr && incStr.endsWith("%")) {
            incentiveVal = parseFloat(incStr.replace("%", "")) || minIncentive;
          }
          const total = residentialCurrentUPS + incentiveVal;
          domesticGroundServiceLevels.push({
            name: "UPS® Ground - Residential Package - Prepaid",
            weightRange: weightRange,
            discount: total,
          });
        });
      }
    }

    // Display domesticGround3 as is
    if (
      analysis.domesticGround3 &&
      analysis.domesticGround3["DOMESTIC GROUND SERVICE LEVEL"] &&
      analysis.domesticGround3["DOMESTIC GROUND SERVICE LEVEL"]["Ground CWT"]
    ) {
      const cwtData =
        analysis.domesticGround3["DOMESTIC GROUND SERVICE LEVEL"]["Ground CWT"];
      const cwtDiscount =
        Number(
          cwtData["Discount"]?.replace("%", "") ||
            cwtData["Current UPS"]?.replace("%", "")
        ) || 0;
      domesticGroundServiceLevels.push({
        name: "Ground CWT",
        weightRange: cwtData["Weight Range"] || "All",
        discount: cwtDiscount,
      });
    }
  }

  // Process international data
  if (analysis.response5) {
    const internationalData = analysis.response5["INTERNATIONAL SERVICE LEVEL"];

    const processDirection = (direction) => {
      const directionData = internationalData[direction];

      // Gather all non-null incentives for this direction
      const incentivesArray = [];
      Object.keys(directionData).forEach((service) => {
        const data = directionData[service];
        ["Letter", "Document", "Pak", "Package"].forEach((type) => {
          if (data[type]) {
            const incentiveStr = data[type]["Incentives Off Effective Rates"];
            if (incentiveStr && incentiveStr.endsWith("%")) {
              const incentiveVal = parseFloat(incentiveStr.replace("%", ""));
              if (!isNaN(incentiveVal)) {
                incentivesArray.push(incentiveVal);
              }
            }
          }
        });
      });

      // Find the minimum non-null incentive, default to 0 if none found
      const minIncentive =
        incentivesArray.length > 0 ? Math.min(...incentivesArray) : 0;

      // Now process each service and type to sum Current UPS and incentive
      Object.keys(directionData).forEach((service) => {
        const data = directionData[service];

        ["Letter", "Document", "Pak", "Package"].forEach((type) => {
          if (data[type]) {
            const currentUPSStr = data[type]["Current UPS"];
            const incentiveStr = data[type]["Incentives Off Effective Rates"];

            // Parse Current UPS
            let currentUPSVal = 0;
            if (currentUPSStr && currentUPSStr.endsWith("%")) {
              currentUPSVal = parseFloat(currentUPSStr.replace("%", ""));
            }

            // Parse Incentive or use min if null
            let incentiveVal = minIncentive;
            if (incentiveStr && incentiveStr.endsWith("%")) {
              const parsedIncentive = parseFloat(incentiveStr.replace("%", ""));
              if (!isNaN(parsedIncentive)) {
                incentiveVal = parsedIncentive;
              }
            }

            // Sum them
            const total = currentUPSVal + incentiveVal;
            const formattedTotal = isNaN(total)
              ? "No Discount"
              : `${total.toFixed(2)}%`;

            internationalServiceLevels.push({
              name: `${direction} ${service} ${type}`,
              weightRange: data[type]["Weight Range"],
              discount: formattedTotal,
            });
          }
        });
      });
    };

    // Process both Export and Import
    if (internationalData["Export"]) {
      processDirection("Export");
    }
    if (internationalData["Import"]) {
      processDirection("Import");
    }
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

  console.log("analysis", analysis);
  console.log("analysis graph", graphData);
  console.log("com", combineData(analysis, graphData));
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
              {/* <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Discount Results
              </h1> */}

              <div className="space-y-10">
                <SavingsMetrics />

                <Dashboard></Dashboard>

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
                    Domestic Ground Service Levels (Coming Soon)
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

                <ContractChat/>

                <NegotiationChatbot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
