import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export const OnboardingCompletedCard = ({ userName, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 55000); // Close after 5.5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        exit: { duration: 0.2, ease: "easeOut" }, // Faster exit animation
      }}
      className="absolute bottom-6 -right-32 z-50"
    >
      <Card className="bg-white text-gray-800 shadow-lg w-[400px] border-0">
        <motion.div
          initial={{ backgroundColor: "white" }}
          animate={{ backgroundColor: "white" }}
          className="absolute inset-0 rounded-lg"
        />
        <CardContent className="p-6 relative">
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute -top-8 right-2 text-[#FFB323] hover:text-[#FFB323] hover:bg-transparent p-0 text-base font-semibold italic"
          >
            Cancel
          </Button>
          <h3 className="text font-semibold mb-2">Onboarding Completed!</h3>
          <p className="text-base text-gray-600">
            🎉 Congratulations, {userName}! You've completed your onboarding
            tour, start exploring and get started with your first challenge.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
