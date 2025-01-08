"use client"

import React, { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { GaugeChart } from "@/components/gauge-chart";
import { SavingsChart } from "@/components/savings-graph";
import ContractSimulator from "@/components/ContractSimulator";
import { extractContractData } from "@/utils/extractContractData";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardChallenges } from "@/components/Challenges";
import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { LevelExplanationScreen } from "@/components/onboarding/LevelExplanationScreen";
import { GaugeExplanationScreen } from "@/components/onboarding/GaugeExplanationScreen";
import { SavingsExplanationScreen } from "@/components/onboarding/SavingsExplanationScreen";
import { ContractSimulatorExplanationScreen } from "@/components/onboarding/ContractSimulatorExplanationScreen";
import { ChallengesExplanationScreen } from "@/components/onboarding/ChallengesExplanationScreen";
import Confetti from "react-confetti";
import { AnimatePresence } from "framer-motion";
import { OnboardingCompletedCard } from "@/components/onboarding/OnboardingCompletedCard";

export default function Dashboard() {
  const [contractData, setContractData] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showChallengesDropdown, setShowChallengesDropdown] = useState(false);
  const [animateGauge, setAnimateGauge] = useState(false);
  const [animateSavings, setAnimateSavings] = useState(false);
  const [animateContract, setAnimateContract] = useState(false);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [removeBlur, setRemoveBlur] = useState(false);
  const [showOnboardingCompleted, setShowOnboardingCompleted] = useState(false);
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

    const scrollTimer = setTimeout(() => {
      if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);

    const onboardingTimer = setTimeout(() => {
      setShowOnboarding(true);
    }, 2500);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(onboardingTimer);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 5) {
      setShowChallengesDropdown(true);
    } else {
      setShowChallengesDropdown(false);
    }

    setAnimateGauge(currentStep === 2);
    setAnimateSavings(currentStep === 3);
    setAnimateContract(currentStep === 4);
  }, [currentStep]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    setShowChallengesDropdown(false);
    setRemoveBlur(true);
    setAnimateContract(true); // Trigger animation when closing onboarding
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      if (nextStep >= 6) {
        setRemoveBlur(true);
        setTimeout(() => {
          setShowFinalAnimation(true);
          setAnimateGauge(true);
          setAnimateSavings(true);
          setAnimateContract(true);
        }, 100);
        setTimeout(() => {
          setShowConfetti(true);
        }, 1100);
        setTimeout(() => {
          setShowOnboardingCompleted(true);
        }, 1600);
        setTimeout(() => {
          setShowOnboarding(false);
          setShowChallengesDropdown(false);
          setShowFinalAnimation(false);
          setShowConfetti(false);
        }, 8000);
      }
      return nextStep;
    });
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const handleCloseOnboardingCompleted = () => {
    setShowOnboardingCompleted(false);
    setAnimateContract(true); // Trigger animation when closing onboarding completed
  };

  const renderOnboardingScreen = () => {
    if (!showOnboarding) return null;

    switch (currentStep) {
      case 0:
        return (
          <WelcomeScreen
            onClose={handleCloseOnboarding}
            onNext={handleNextStep}
          />
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

  const getBlurClass = (step) => {
    if (removeBlur) return "";
    if (!showOnboarding) return "";
    if (currentStep === 0) return "filter blur-[8px]";
    return currentStep === step ? "" : "filter blur-[8px]";
  };

  return (
    <div className="min-h-screen relative font-montserrat">
      <div
        className={`transition-all duration-300 ${
          showOnboarding && !removeBlur ? "pointer-events-none" : ""
        }`}
      >
        <div ref={headerRef} className="w-full">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className={getBlurClass(1)}>
              <DashboardHeader
                competitiveScore={contractData?.competitiveScore || 75}
                currentXP={120}
                maxXP={300}
              />
            </div>
            <div className={getBlurClass(5)}>
              <DashboardChallenges isOpen={showChallengesDropdown} />
            </div>
          </div>
        </div>

        <div
          ref={dashboardRef}
          id="dashboard"
          className="space-y-6 mt-1 max-w-7xl mx-auto relative"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card
              className={`bg-transparent border-none transition-all duration-300 ${getBlurClass(
                2
              )}`}
            >
              <GaugeChart
                score={contractData?.competitiveScore || 75}
                animate={animateGauge || showFinalAnimation}
              />
            </Card>
            <Card
              className={`bg-transparent border-none transition-all duration-300 ${getBlurClass(
                3
              )}`}
            >
              <SavingsChart
                data={graphData}
                animate={animateSavings || showFinalAnimation}
              />
            </Card>
          </div>
          <Card
            className={`bg-transparent border-none mt-6 transition-all duration-300 ${getBlurClass(
              4
            )}`}
          >
            <ContractSimulator
              data={contractData}
              animate={animateContract || showFinalAnimation}
            />
          </Card>

          <AnimatePresence>
            {showOnboardingCompleted && (
              <OnboardingCompletedCard
                userName="Kushagra"
                onClose={handleCloseOnboardingCompleted}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {showOnboarding && !removeBlur && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#22222E]/20">
          <div className="pointer-events-auto">{renderOnboardingScreen()}</div>
        </div>
      )}

      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti
            width={dashboardRef.current?.offsetWidth || window.innerWidth}
            height={dashboardRef.current?.offsetHeight || window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            style={{
              position: "absolute",
              top: dashboardRef.current?.offsetTop || 0,
              left: dashboardRef.current?.offsetLeft || 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
