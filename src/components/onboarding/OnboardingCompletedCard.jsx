"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

export const OnboardingCompletedCard = ({ userName, onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    const timer = setTimeout(() => {
      onClose()
    }, 5500)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearTimeout(timer)
    }
  }, [onClose])

  const position = {
    top: `${dimensions.height + 500}px`, // 120px from bottom of viewport
    left: `${dimensions.width - 424}px`, // 400px card width + 24px right margin
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        exit: { duration: 0.2, ease: "easeOut" },
      }}
      style={position}
      className="fixed z-50"
    >
      <Card className="bg-white text-gray-800 shadow-lg w-[400px] border-0 italic">
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
          <h3 className="text-lg font-semibold mb-2">Onboarding Completed!</h3>
          <p className="text-base text-gray-600">
            🎉 Congratulations, {userName}! You&apos;ve completed your onboarding
            tour, start exploring and get started with your first challenge.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
