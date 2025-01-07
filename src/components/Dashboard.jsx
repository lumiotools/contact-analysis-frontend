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
import { GaugeExplanationScreen } from "./onboarding/GaugeExplanationScreen";
import { SavingsExplanationScreen } from "./onboarding/SavingsExplanationScreen";
import { ContractSimulatorExplanationScreen } from "./onboarding/ContractSimulatorExplanationScreen";
import { ChallengesExplanationScreen } from "./onboarding/ChallengesExplanationScreen";

export default function Dashboard() {
  const [contractData, setContractData] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showChallengesDropdown, setShowChallengesDropdown] = useState(false);
  const [animateGauge, setAnimateGauge] = useState(false);
  const [animateSavings, setAnimateSavings] = useState(false);
  const [animateContract, setAnimateContract] = useState(false);
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

  useEffect(() => {
    // Automatically open challenges dropdown when reaching the final step
    if (currentStep === 5) {
      setShowChallengesDropdown(true);
    } else {
      setShowChallengesDropdown(false);
    }

    // Trigger animations based on the current step
    setAnimateGauge(currentStep === 2);
    setAnimateSavings(currentStep === 3);
    setAnimateContract(currentStep === 4);
  }, [currentStep]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    setShowChallengesDropdown(false);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      if (nextStep >= 6) {
        setShowOnboarding(false);
        setShowChallengesDropdown(false);
      }
      return nextStep;
    });
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const renderOnboardingScreen = () => {
    if (!showOnboarding) return null;

    switch (currentStep) {
      case 0:
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <WelcomeScreen
              onClose={handleCloseOnboarding}
              onNext={handleNextStep}
            />
          </div>
        );
      case 1:
        return (
          <LevelExplanationScreen
            onClose={handleCloseOnboarding}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <GaugeExplanationScreen
            onClose={handleCloseOnboarding}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <SavingsExplanationScreen
            onClose={handleCloseOnboarding}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
          />
        );
      case 4:
        return (
          <ContractSimulatorExplanationScreen
            onClose={handleCloseOnboarding}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
          />
        );
      case 5:
        return (
          <ChallengesExplanationScreen
            onClose={handleCloseOnboarding}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
          />
        );
      default:
        return null;
    }
  };

  const shouldBlurHeader =
    showOnboarding &&
    (currentStep === 0 || currentStep === 2 || currentStep === 5);
  const shouldBlurChallenges = showOnboarding && currentStep !== 5;

  return (
    <div className="min-h-screen relative">
      <div ref={headerRef} className="w-full py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className={shouldBlurHeader ? "filter blur-sm" : ""}>
            <DashboardHeader />
          </div>
          <div
            className={`transition-all duration-300 ${
              shouldBlurChallenges ? "filter blur-sm" : ""
            }`}
          >
            <DashboardChallenges isOpen={showChallengesDropdown} />
          </div>
        </div>
      </div>

      <div ref={dashboardRef} id="dashboard" className="space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            className={`bg-transparent border-none transition-all duration-300 relative ${
              showOnboarding && currentStep !== 2 ? "filter blur-sm" : ""
            }`}
          >
            <GaugeChart
              score={contractData?.competitiveScore || 75}
              animate={animateGauge}
            />
          </Card>
          <Card
            className={`bg-transparent border-none transition-all duration-300 ${
              showOnboarding && currentStep !== 3 ? "filter blur-sm" : ""
            }`}
          >
            <SavingsChart data={graphData} animate={animateSavings} />
          </Card>
        </div>
        <Card
          className={`bg-transparent border-none mt-6 transition-all duration-300 ${
            showOnboarding && currentStep !== 4 ? "filter blur-sm" : ""
          }`}
        >
          <ContractSimulator data={contractData} animate={animateContract} />
        </Card>
      </div>

      {showOnboarding && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="pointer-events-auto">{renderOnboardingScreen()}</div>
        </div>
      )}
    </div>
  );
}
