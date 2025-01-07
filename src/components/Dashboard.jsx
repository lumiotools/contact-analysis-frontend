"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card } from "./ui/card";
import { GaugeChart } from "./gauge-chart";
import { SavingsChart } from "./savings-graph";
import ContractSimulator from "./ContractSimulator";
import { extractContractData } from "@/utils/extractContractData";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardChallenges } from "./Challenges";
import { WelcomeScreen } from "./onboarding/WelcomeScreen";
import { LevelExplanationScreen } from "./onboarding/LevelExplanationScreen";

export default function Dashboard() {
  const [contractData, setContractData] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const dashboardRef = useRef(null);
  const headerRef = useRef(null);

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

    // Scroll to the header component after 2 seconds
    const scrollTimer = setTimeout(() => {
      if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);

    // Show onboarding screen after scrolling
    const onboardingTimer = setTimeout(() => {
      setShowOnboarding(true);
    }, 2500);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(onboardingTimer);
    };
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      if (nextStep >= 5) {
        setShowOnboarding(false);
      }
      return nextStep;
    });
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  return (
    <div className="min-h-screen relative">
      <div
        ref={headerRef}
        className={`w-full py-4 transition-all duration-300 ${
          showOnboarding && currentStep === 0 ? "filter blur-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <DashboardHeader />
          <div
            className={`transition-all duration-300 ${
              showOnboarding ? "filter blur-sm" : ""
            }`}
          >
            <DashboardChallenges />
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          showOnboarding ? "filter blur-sm" : ""
        }`}
      >
        <div ref={dashboardRef} id="dashboard" className="space-y-6 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-transparent border-none">
              <GaugeChart score={contractData?.competitiveScore || 75} />
            </Card>
            <Card className="bg-transparent border-none">
              <SavingsChart data={graphData} />
            </Card>
          </div>
          <Card className="bg-transparent border-none mt-6">
            <ContractSimulator data={contractData} />
          </Card>
        </div>
      </div>

      {showOnboarding && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            {currentStep === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <WelcomeScreen
                  onClose={handleCloseOnboarding}
                  onNext={handleNextStep}
                />
              </div>
            ) : (
              <LevelExplanationScreen
                onClose={handleCloseOnboarding}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                currentStep={currentStep}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
