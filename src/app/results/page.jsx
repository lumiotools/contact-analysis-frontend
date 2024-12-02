"use client";
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
                {service.discount}%
              </span>
              <div className="w-32 h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    service.discount
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
        <div className="p-6 bg-[#23232F] space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm text-gray-400 mb-2">Negotiation Tactic</h4>
              <p className="text-white">{service.negotiationTactic}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400 mb-2">Additional Details</h4>
              <p className="text-white">{service.details}</p>
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
  const location = {};
  const navigate = useRouter();
  const { formData } = location?.state || {};
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const [analysis, setAnalysis] = useState({
    ...{
      domesticAir: {
        "Domestic Air Service Level": {
          "Next Day Air": {
            Letter: {
              "Weight Range": "All",
              "Current UPS": "61.00%",
            },
            Package: {
              "Weight Range": "All",
              "Current UPS": "61.00%",
            },
          },
          "Next Day Air Saver": {
            Letter: {
              "Weight Range": "All",
              "Current UPS": "61.00%",
            },
            Package: {
              "Weight Range": "All",
              "Current UPS": "61.00%",
            },
          },
          "2nd Day AM": {
            Letter: {
              "Weight Range": "All",
              "Current UPS": "59.00%",
            },
            Package: {
              "Weight Range": "All",
              "Current UPS": "59.00%",
            },
          },
          "2nd Day Air": {
            Letter: {
              "Weight Range": "All",
              "Current UPS": "59.00%",
            },
            Package: {
              "Weight Range": "All",
              "Current UPS": "59.00%",
            },
          },
          "3 Day Select": {
            Package: {
              "Weight Range": "All",
              "Current UPS": "51.00%",
            },
          },
          "Next Day Air CWT": {
            "Weight Range": "All",
            "Current UPS": null,
          },
          "Next Day Air Saver CWT": {
            "Weight Range": "All",
            "Current UPS": null,
          },
          "2nd Day AM CWT": {
            "Weight Range": "All",
            "Current UPS": null,
          },
          "2nd Day Air CWT": {
            "Weight Range": "All",
            "Current UPS": null,
          },
          "3 Day Select CWT": {
            "Weight Range": "All",
            "Current UPS": null,
          },
        },
      },
      accesorials: [
        {
          ACCESSORIAL_CHARGE: "DAS Comm",
          TERM: "Air",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "DAS Ext Comm",
          TERM: "Air",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "DAS Resi",
          TERM: "Air",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "DAS Ext Resi",
          TERM: "Air",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "DAS Comm",
          TERM: "Ground",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "DAS Ext Comm",
          TERM: "Ground",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "DAS Resi",
          TERM: "Ground",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "DAS Ext Resi",
          TERM: "Ground",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "Residential Fee",
          TERM: "Air",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "Residential Fee",
          TERM: "Ground",
          CURRENT_UPS: null,
        },
        {
          ACCESSORIAL_CHARGE: "Additional Handling - ALL",
          TERM: "Domestic",
          CURRENT_UPS: "25.00% Off",
        },
        {
          ACCESSORIAL_CHARGE: "Additional Handling - ALL",
          TERM: "Export",
          CURRENT_UPS: "25.00% Off",
        },
        {
          ACCESSORIAL_CHARGE: "Duty and Tax Forwarding",
          TERM: "Export",
          CURRENT_UPS: "100.00% Off Effective Rates",
        },
      ],
    },
    ...{
      domesticGround1: {
        "DOMESTIC GROUND SERVICE LEVEL": {
          "UPS® Ground - Commercial Package - Prepaid": {
            "Weight Range": "All",
            "Current UPS": "11.00%",
          },
          "UPS® Ground - Residential Package - Prepaid": {
            "Weight Range": "All",
            "Current UPS": "11.00%",
          },
        },
      },
      domesticGround2: {
        "DOMESTIC GROUND SERVICE LEVEL": {
          "UPS® Ground - Commercial Package - Prepaid - Incentives Off Effective Rates":
            {
              "1-5 lbs": "34.00%",
              "6-10 lbs": "34.00%",
              "11-20 lbs": "34.00%",
              "21-30 lbs": "34.00%",
              "31-50 lbs": "34.00%",
              "51-70 lbs": "34.00%",
              "71-150 lbs": "34.00%",
              "151 lbs+": "34.00%",
            },
          "UPS® Ground - Residential Package - Prepaid - Incentives Off Effective Rates":
            {
              "1-5 lbs": "20.00%",
              "6-10 lbs": "22.00%",
              "11-20 lbs": "25.00%",
              "21-30 lbs": "27.00%",
              "31-50 lbs": "30.00%",
              "51-70 lbs": "30.00%",
              "71-150 lbs": "30.00%",
              "151 lbs+": "30.00%",
            },
        },
      },
      domesticGround3: {
        "DOMESTIC GROUND SERVICE LEVEL": {
          "Ground CWT": {
            "Weight Range": "All",
            "Current UPS": "21.00%",
            Discount: "21.00%",
            Tier: "04",
          },
        },
      },
    },
    ...{
      international1: {
        "INTERNATIONAL SERVICE LEVEL": {
          Export: {
            "UPS Worldwide Express®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
              Pak: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
            },
            "UPS Worldwide Saver®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
              Pak: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
            },
            "UPS Worldwide Expedited®": {
              Document: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
              },
            },
            "UPS® Standard to Canada": {
              "Weight Range": "All",
              "Current UPS": "19.00%",
            },
            "UPS® Standard to Mexico": {
              "Weight Range": "All",
              "Current UPS": "15.20%",
            },
          },
          Import: {
            "UPS Worldwide Express®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
              },
            },
            "UPS Worldwide Saver®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
              },
            },
            "UPS Worldwide Expedited®": {
              Package: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
              },
            },
            "UPS® Standard from Canada": {
              "Weight Range": "All",
              "Current UPS": "19.00%",
            },
            "UPS® Standard from Mexico": {
              "Weight Range": "All",
              "Current UPS": "16.00%",
            },
          },
        },
      },
      international2: {
        "International Service Level": {
          "Export UPS Worldwide Express®": {
            "Letter - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "53.00%",
            },
            "Document - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": null,
            },
            "Pak - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": null,
            },
            "Package - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "60.00%",
            },
          },
          "Export UPS Worldwide Saver®": {
            "Letter - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "53.00%",
            },
            "Document - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": null,
            },
            "Pak - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": null,
            },
            "Package - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "60.00%",
            },
          },
          "Export UPS Worldwide Expedited®": {
            "Document - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": null,
            },
            "Package - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "60.00%",
            },
          },
          "Import UPS Worldwide Express®": {
            "Letter - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "33.00%",
            },
            "Document - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "33.00%",
            },
            "Package - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "33.00%",
            },
          },
          "Import UPS Worldwide Saver®": {
            "Letter - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "33.00%",
            },
            "Document - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "33.00%",
            },
            "Package - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "33.00%",
            },
          },
          "Import UPS Worldwide Expedited®": {
            "Package - Incentives Off Effective Rates": {
              "Weight Range": "All",
              "Current UPS": "33.00%",
            },
          },
        },
      },
      response5: {
        "INTERNATIONAL SERVICE LEVEL": {
          Export: {
            "UPS Worldwide Express®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": "53.00%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": null,
              },
              Pak: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": null,
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": "60.00%",
              },
            },
            "UPS Worldwide Saver®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": "53.00%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": null,
              },
              Pak: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": null,
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": "60.00%",
              },
            },
            "UPS Worldwide Expedited®": {
              Document: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": null,
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "15.20%",
                "Incentives Off Effective Rates": "60.00%",
              },
            },
            "UPS® Standard to Canada": {
              "Weight Range": "All",
              "Current UPS": "19.00%",
            },
            "UPS® Standard to Mexico": {
              "Weight Range": "All",
              "Current UPS": "15.20%",
            },
          },
          Import: {
            "UPS Worldwide Express®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
                "Incentives Off Effective Rates": "33.00%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
                "Incentives Off Effective Rates": "33.00%",
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
                "Incentives Off Effective Rates": "33.00%",
              },
            },
            "UPS Worldwide Saver®": {
              Letter: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
                "Incentives Off Effective Rates": "33.00%",
              },
              Document: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
                "Incentives Off Effective Rates": "33.00%",
              },
              Package: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
                "Incentives Off Effective Rates": "33.00%",
              },
            },
            "UPS Worldwide Expedited®": {
              Package: {
                "Weight Range": "All",
                "Current UPS": "16.00%",
                "Incentives Off Effective Rates": "33.00%",
              },
            },
            "UPS® Standard from Canada": {
              "Weight Range": "All",
              "Current UPS": "19.00%",
            },
            "UPS® Standard from Mexico": {
              "Weight Range": "All",
              "Current UPS": "16.00%",
            },
          },
        },
      },
    },
  });

  const domesticAirServiceLevels = [];
  const domesticGroundServiceLevels = [];
  const internationalServiceLevels = [];
  const accessorialCharge = [];

  Object.keys(analysis.domesticAir["Domestic Air Service Level"]).forEach(
    (service) => {
      if (analysis.domesticAir["Domestic Air Service Level"][service]?.Letter) {
        domesticAirServiceLevels.push({
          name: service + " Letter",
          weightRange: "All",
          discount: Number(
            analysis.domesticAir["Domestic Air Service Level"][
              service
            ]?.Letter?.["Current UPS"].replace("%", "")
          ),
        });
        domesticAirServiceLevels.push({
          name: service + " Package",
          weightRange: "All",
          discount: Number(
            analysis.domesticAir["Domestic Air Service Level"][
              service
            ]?.Package?.["Current UPS"].replace("%", "")
          ),
        });
      } else if (
        analysis.domesticAir["Domestic Air Service Level"][service]?.Package
      ) {
        domesticAirServiceLevels.push({
          name: service,
          weightRange: "All",
          discount: Number(
            analysis.domesticAir["Domestic Air Service Level"][
              service
            ]?.Package?.["Current UPS"].replace("%", "")
          ),
        });
      }
    }
  );

  Object.keys(
    analysis.domesticGround1["DOMESTIC GROUND SERVICE LEVEL"]
  ).forEach((service, index) => {
    const weightObject = Object.values(
      analysis.domesticGround2["DOMESTIC GROUND SERVICE LEVEL"]
    )[index];

    Object.keys(weightObject).forEach((weight) => {
      domesticGroundServiceLevels.push({
        name: service,
        weightRange: weight,
        discount:
          Number(weightObject[weight]?.replace("%", "")) +
          Number(
            analysis.domesticGround1["DOMESTIC GROUND SERVICE LEVEL"][service][
              "Current UPS"
            ]?.replace("%", "")
          ),
      });
    });
  });

  Object.keys(
    analysis.domesticGround3["DOMESTIC GROUND SERVICE LEVEL"]
  ).forEach((service) => {
    domesticGroundServiceLevels.push({
      name: service,
      weightRange: "All",
      discount: Number(
        analysis.domesticGround3["DOMESTIC GROUND SERVICE LEVEL"][service]?.[
          "Current UPS"
        ].replace("%", "")
      ),
    });
  });

  Object.keys(
    analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"]
  ).forEach((service) => {
    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][service]
        ?.Letter
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Export " + service
        ]?.["Letter - Incentives Off Effective Rates"]?.[
          "Current UPS"
        ]?.replace("%", "")
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }

      internationalServiceLevels.push({
        name: "Export " + service + " Letter",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][
              service
            ]?.Letter?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }
    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][service]
        ?.Document
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Export " + service
        ]?.["Document - Incentives Off Effective Rates"]?.[
          "Current UPS"
        ]?.replace("%", "")
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }

      internationalServiceLevels.push({
        name: "Export " + service + " Document",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][
              service
            ]?.Document?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }

    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][service]
        ?.Pak
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Export " + service
        ]?.["Pak - Incentives Off Effective Rates"]?.["Current UPS"]?.replace(
          "%",
          ""
        )
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }

      internationalServiceLevels.push({
        name: "Export " + service + " Pak",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][
              service
            ]?.Pak?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }

    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][service]
        ?.Package
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Export " + service
        ]?.["Package - Incentives Off Effective Rates"]?.[
          "Current UPS"
        ]?.replace("%", "")
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Export " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }
      internationalServiceLevels.push({
        name: "Export " + service + " Package",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][
              service
            ]?.Package?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }

    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][
        service
      ]?.["Current UPS"]
    ) {
      const additionalDiscount = Math.min(
        Number(
          analysis.international2["International Service Level"][
            "Export " + service
          ]?.["Letter - Incentives Off Effective Rates"]?.[
            "Current UPS"
          ]?.replace("%", "")
        ) || 0,
        Number(
          analysis.international2["International Service Level"][
            "Export " + service
          ]?.["Document - Incentives Off Effective Rates"]?.[
            "Current UPS"
          ]?.replace("%", "")
        ) || 0,
        Number(
          analysis.international2["International Service Level"][
            "Export " + service
          ]?.["Pak - Incentives Off Effective Rates"]?.["Current UPS"]?.replace(
            "%",
            ""
          )
        ) || 0,
        Number(
          analysis.international2["International Service Level"][
            "Export " + service
          ]?.["Package - Incentives Off Effective Rates"]?.[
            "Current UPS"
          ]?.replace("%", "")
        ) || 0
      );

      internationalServiceLevels.push({
        name: "Export " + service,
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Export"][
              service
            ]?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }
  });

  Object.keys(
    analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"]
  ).forEach((service) => {
    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][service]
        ?.Letter
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Import " + service
        ]?.["Letter - Incentives Off Effective Rates"]?.[
          "Current UPS"
        ]?.replace("%", "")
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }

      internationalServiceLevels.push({
        name: "Import " + service + " Letter",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][
              service
            ]?.Letter?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }
    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][service]
        ?.Document
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Import " + service
        ]?.["Document - Incentives Off Effective Rates"]?.[
          "Current UPS"
        ]?.replace("%", "")
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }

      internationalServiceLevels.push({
        name: "Import " + service + " Document",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][
              service
            ]?.Document?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }

    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][service]
        ?.Pak
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Import " + service
        ]?.["Pak - Incentives Off Effective Rates"]?.["Current UPS"]?.replace(
          "%",
          ""
        )
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }

      internationalServiceLevels.push({
        name: "Import " + service + " Pak",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][
              service
            ]?.Pak?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }

    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][service]
        ?.Package
    ) {
      let additionalDiscount = Number(
        analysis.international2["International Service Level"][
          "Import " + service
        ]?.["Package - Incentives Off Effective Rates"]?.[
          "Current UPS"
        ]?.replace("%", "")
      );

      if (!additionalDiscount) {
        additionalDiscount = Math.min(
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Letter - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Document - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Pak - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0,
          Number(
            analysis.international2["International Service Level"][
              "Import " + service
            ]?.["Package - Incentives Off Effective Rates"]?.[
              "Current UPS"
            ]?.replace("%", "")
          ) || 0
        );
      }

      internationalServiceLevels.push({
        name: "Import " + service + " Package",
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][
              service
            ]?.Package?.["Current UPS"].replace("%", "")
          ) + Number(additionalDiscount),
      });
    }

    if (
      analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][
        service
      ]?.["Current UPS"]
    ) {
      const additionalDiscount = Math.min(
        Number(
          analysis.international2["International Service Level"][
            "Import " + service
          ]?.["Letter - Incentives Off Effective Rates"]?.[
            "Current UPS"
          ]?.replace("%", "")
        ) || 0,
        Number(
          analysis.international2["International Service Level"][
            "Import " + service
          ]?.["Document - Incentives Off Effective Rates"]?.[
            "Current UPS"
          ]?.replace("%", "")
        ) || 0,
        Number(
          analysis.international2["International Service Level"][
            "Import " + service
          ]?.["Pak - Incentives Off Effective Rates"]?.["Current UPS"]?.replace(
            "%",
            ""
          )
        ) || 0,
        Number(
          analysis.international2["International Service Level"][
            "Import " + service
          ]?.["Package - Incentives Off Effective Rates"]?.[
            "Current UPS"
          ]?.replace("%", "")
        ) || 0
      );

      internationalServiceLevels.push({
        name: "Import " + service,
        weightRange: "All",
        discount:
          Number(
            analysis.international1["INTERNATIONAL SERVICE LEVEL"]["Import"][
              service
            ]?.["Current UPS"]?.replace("%", "")
          ) + Number(additionalDiscount),
      });
    }
  });

  analysis.accesorials.forEach((accessorial) => {
    // if (accessorial.CURRENT_UPS)
    accessorialCharge.push({
      name: accessorial.ACCESSORIAL_CHARGE,
      weightRange: accessorial.TERM,
      discount: accessorial.CURRENT_UPS ?? 0,
    });
  });

  const handleRowToggle = (index) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };

  const fetchData = async () => {
    const data = window.localStorage.getItem("data");

    if (!data) {
      navigate.replace("/");
    }

    const responses = await Promise.all([
      fetch(process.env.NEXT_PUBLIC_DOMESTIC_ACCESORIALS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: data.file_name_1,
          weeklyChargesBand: data.exactWeeklyBandRange,
        }),
      }),
      fetch(process.env.NEXT_PUBLIC_DOMESTIC_GROUND_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: data.file_name_1,
          weeklyChargesBand: data.exactWeeklyBandRange,
        }),
      }),

      fetch(process.env.NEXT_PUBLIC_INTERNATIONAL_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: data.file_name_2,
          weeklyChargesBand: data.exactWeeklyBandRange,
        }),
      }),
    ]);

    const responseJson = await Promise.all(
      responses.map((response) => response.json())
    );

    const finalData = [
      ...responseJson[0],
      ...responseJson[1],
      ...responseJson[2],
    ];

    setAnalysis(finalData);
  };

  useEffect(() => {
    fetchData();
    console.log(analysis);
  }, []);

  return (
    <div className="h-screen bg-[#1C1C28] flex items-center justify-center w-full">
      <div className="w-full h-full max-w-[1800px] mx-auto">
        <div className="relative h-full w-full bg-[#23232F]/90 backdrop-blur-xl border border-[#2A2A36] overflow-x-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

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
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
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

                {/* Contract Analysis Component */}
                <ContractAnalysis />

                <div className="space-y-6">
                  {/* {serviceData.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
                      id={`2m4i8h_${index}`}
                    />
                  ))} */}

                  <p className="text-2xl font-bold text-white text-center">
                    Domestic Air Service Levels
                  </p>

                  <div className="flex justify-between text-sm text-gray-400 px-6">
                    <div className="flex-1">Service Name</div>
                    <div className="flex-1 text-center">Weight Range</div>
                    <div className="flex-1 text-right">Discount</div>
                  </div>
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

                  <div className="flex justify-between text-sm text-gray-400 px-6">
                    <div className="flex-1">Service Name</div>
                    <div className="flex-1 text-center">Weight Range</div>
                    <div className="flex-1 text-right">Discount</div>
                  </div>
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

                  <div className="flex justify-between text-sm text-gray-400 px-6">
                    <div className="flex-1">Service Name</div>
                    <div className="flex-1 text-center">Weight Range</div>
                    <div className="flex-1 text-right">Discount</div>
                  </div>
                  {internationalServiceLevels.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
                    />
                  ))}

                  <p className="text-2xl font-bold text-white text-center">
                    Accessorial Charge
                  </p>

                  <div className="flex justify-between text-sm text-gray-400 px-6">
                    <div className="flex-1">Service Name</div>
                    <div className="flex-1 text-center">Term</div>
                    <div className="flex-1 text-right">Discount</div>
                  </div>
                  {accessorialCharge.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
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
