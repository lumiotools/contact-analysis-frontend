// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Montserrat } from "next/font/google";

// const montserrat = Montserrat({ subsets: ["latin"] });

// export function GaugeChart({ score = 60, animate = false }) {
//   const [animatedScore, setAnimatedScore] = useState(0);
//   const requestRef = useRef();
//   const startTimeRef = useRef();

//   const radius = 170;
//   const strokeWidth = 55;
//   const circumference = 2 * Math.PI * radius;
//   const arc = circumference * 0.5;

//   const svgSize = (radius + strokeWidth) * 2;
//   const centerPoint = svgSize / 2;

//   const animateChart = (time) => {
//     if (startTimeRef.current === undefined) {
//       startTimeRef.current = time;
//     }

//     const elapsed = time - startTimeRef.current;
//     const duration = 2000; // 2 seconds
//     const progress = Math.min(elapsed / duration, 1);
//     const currentScore = progress * score;

//     setAnimatedScore(currentScore);

//     if (progress < 1) {
//       requestRef.current = requestAnimationFrame(animateChart);
//     }
//   };

//   useEffect(() => {
//     if (animate) {
//       setAnimatedScore(0);
//       startTimeRef.current = undefined;
//       requestRef.current = requestAnimationFrame(animateChart);
//     } else {
//       setAnimatedScore(score);
//     }

//     return () => {
//       if (requestRef.current) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, [animate, score]);

//   const normalizedScore = animatedScore / 100;
//   const offset = arc - arc * normalizedScore;

//   const innerRadius = radius - 70;
//   const dotCount = 30;
//   const dotRadius = 0.1;
//   const dots = Array.from({ length: dotCount }).map((_, i) => {
//     const angle = (Math.PI * i) / (dotCount - 1);
//     const x = centerPoint + innerRadius * Math.cos(angle);
//     const y = centerPoint + innerRadius * Math.sin(angle);
//     return { x, y };
//   });

//   const lineStartX =
//     centerPoint +
//     (radius - strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
//   const lineStartY =
//     centerPoint +
//     (radius - strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);
//   const lineEndX =
//     centerPoint +
//     (radius + strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
//   const lineEndY =
//     centerPoint +
//     (radius + strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);

//   return (
//     <div
//       className={`${montserrat.className} h-[450px] flex flex-col items-center bg-[#2A2A36] rounded-2xl border-2 border-[#464653] p-6`}
//     >
//       <h2 className="text-xl font-bold text-white tracking-wide">
//         HOW COMPETITIVE ARE YOU?
//       </h2>

//       <div className="relative w-full ">
//         <svg
//           className="absolute rotate-180"
//           viewBox={`0 0 ${svgSize} ${svgSize}`}
//           width="450"
//           height="450"
//           preserveAspectRatio="xMidYMid meet"
//         >
//           {/* Dots */}
//           {dots.map((dot, i) => (
//             <circle
//               key={i}
//               cx={dot.x}
//               cy={dot.y}
//               r={dotRadius}
//               fill="none"
//               stroke="rgba(255, 179, 35, 1)"
//               strokeWidth="1"
//             />
//           ))}

//           {/* Background arc */}
//           <circle
//             cx={centerPoint}
//             cy={centerPoint}
//             r={radius}
//             fill="none"
//             stroke="url(#darkGradient)"
//             strokeWidth={strokeWidth}
//             strokeDasharray={`${arc} ${circumference}`}
//             strokeLinecap="butt"
//           />

//           {/* Foreground arc */}
//           <circle
//             cx={centerPoint}
//             cy={centerPoint}
//             r={radius}
//             fill="none"
//             stroke="url(#lightGradient)"
//             strokeWidth={strokeWidth}
//             strokeDasharray={`${arc} ${circumference}`}
//             strokeDashoffset={offset}
//             strokeLinecap="butt"
//           />

//           {/* Indicator line */}
//           <line
//             x1={lineStartX}
//             y1={lineStartY}
//             x2={lineEndX}
//             y2={lineEndY}
//             stroke="white"
//             strokeWidth="3"
//           />

//           {/* Gradients */}
//           <defs>
//             <linearGradient
//               id="lightGradient"
//               x1="0%"
//               y1="0%"
//               x2="100%"
//               y2="0%"
//             >
//               <stop offset="0%" stopColor="#FFD572" />
//               <stop offset="100%" stopColor="#FEBD38" />
//             </linearGradient>

//             <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#6b4b0f" />
//               <stop offset="100%" stopColor="#593F0C" />
//             </linearGradient>
//           </defs>
//         </svg>

//         <div className="absolute left-1/2 -translate-x-1/2 translate-y-44 text-center w-full space-y-1">
//           <div className="ml-4 text-[44px] font-semibold text-[#FFB800] tabular-nums tracking-tight">
//             {Math.round(animatedScore)}
//             <span className="text-[40px]">/100</span>
//           </div>
//           <p className="text-[24px] font-normal text-[#E2E2E2]">
//             Top 10% among peers!
//           </p>
//         </div>
//       </div>

//       <p className="text-[18px] leading-relaxed text-[#B5B5B5] tracking-wide text-center mt-auto">
//         {"You're only "}
//         <span className="text-[#FFB323] font-semibold">7</span>
//         {" points away from"}
//         <br />
//         {"being in the Top "}
//         <span className="text-[#FFB323] font-semibold">5%</span>!
//       </p>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Montserrat } from 'next/font/google';
// import { motion, AnimatePresence } from "framer-motion";

// const montserrat = Montserrat({ subsets: ["latin"] });

// export function GaugeChart({ score = 60, animate = false }) {
//   const [animatedScore, setAnimatedScore] = useState(0);
//   const [showText, setShowText] = useState(false);
//   const requestRef = useRef();
//   const startTimeRef = useRef();

//   const radius = 170;
//   const strokeWidth = 55;
//   const circumference = 2 * Math.PI * radius;
//   const arc = circumference * 0.5;

//   const svgSize = (radius + strokeWidth) * 2;
//   const centerPoint = svgSize / 2;

//   const animateChart = (time) => {
//     if (startTimeRef.current === undefined) {
//       startTimeRef.current = time;
//     }

//     const elapsed = time - startTimeRef.current;
//     const duration = 2000; // 2 seconds
//     const progress = Math.min(elapsed / duration, 1);
//     const currentScore = progress * score;

//     setAnimatedScore(currentScore);

//     if (progress < 1) {
//       requestRef.current = requestAnimationFrame(animateChart);
//     } else {
//       setShowText(true);
//     }
//   };

//   useEffect(() => {
//     if (animate) {
//       setAnimatedScore(0);
//       setShowText(false);
//       startTimeRef.current = undefined;
//       requestRef.current = requestAnimationFrame(animateChart);
//     } else {
//       setAnimatedScore(score);
//       setShowText(true);
//     }

//     return () => {
//       if (requestRef.current) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, [animate, score]);

//   const normalizedScore = animatedScore / 100;
//   const offset = arc - arc * normalizedScore;

//   const innerRadius = radius - 70;
//   const dotCount = 30;
//   const dotRadius = 0.1;
//   const dots = Array.from({ length: dotCount }).map((_, i) => {
//     const angle = (Math.PI * i) / (dotCount - 1);
//     const x = centerPoint + innerRadius * Math.cos(angle);
//     const y = centerPoint + innerRadius * Math.sin(angle);
//     return { x, y };
//   });

//   const lineStartX =
//     centerPoint +
//     (radius - strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
//   const lineStartY =
//     centerPoint +
//     (radius - strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);
//   const lineEndX =
//     centerPoint +
//     (radius + strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
//   const lineEndY =
//     centerPoint +
//     (radius + strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);

//   return (
//     <div
//       className={`${montserrat.className} h-[450px] flex flex-col items-center bg-[#2A2A36] rounded-2xl border-2 border-[#464653] p-6`}
//     >
//       <h2 className="text-xl font-bold text-white tracking-wide">
//         HOW COMPETITIVE ARE YOU?
//       </h2>

//       <div className="relative w-full ">
//         <svg
//           className="absolute rotate-180"
//           viewBox={`0 0 ${svgSize} ${svgSize}`}
//           width="450"
//           height="450"
//           preserveAspectRatio="xMidYMid meet"
//         >
//           {/* Dots */}
//           {dots.map((dot, i) => (
//             <circle
//               key={i}
//               cx={dot.x}
//               cy={dot.y}
//               r={dotRadius}
//               fill="none"
//               stroke="rgba(255, 179, 35, 1)"
//               strokeWidth="1"
//             />
//           ))}

//           {/* Background arc */}
//           <circle
//             cx={centerPoint}
//             cy={centerPoint}
//             r={radius}
//             fill="none"
//             stroke="url(#darkGradient)"
//             strokeWidth={strokeWidth}
//             strokeDasharray={`${arc} ${circumference}`}
//             strokeLinecap="butt"
//           />

//           {/* Foreground arc */}
//           <circle
//             cx={centerPoint}
//             cy={centerPoint}
//             r={radius}
//             fill="none"
//             stroke="url(#lightGradient)"
//             strokeWidth={strokeWidth}
//             strokeDasharray={`${arc} ${circumference}`}
//             strokeDashoffset={offset}
//             strokeLinecap="butt"
//           />

//           {/* Indicator line */}
//           <line
//             x1={lineStartX}
//             y1={lineStartY}
//             x2={lineEndX}
//             y2={lineEndY}
//             stroke="white"
//             strokeWidth="3"
//           />

//           {/* Gradients */}
//           <defs>
//             <linearGradient
//               id="lightGradient"
//               x1="0%"
//               y1="0%"
//               x2="100%"
//               y2="0%"
//             >
//               <stop offset="0%" stopColor="#FFD572" />
//               <stop offset="100%" stopColor="#FEBD38" />
//             </linearGradient>

//             <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#6b4b0f" />
//               <stop offset="100%" stopColor="#593F0C" />
//             </linearGradient>
//           </defs>
//         </svg>

//         <AnimatePresence>
//           {showText && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               transition={{ duration: 0.5 }}
//               className="absolute -left-1/5 -translate-x-1/2 translate-y-40 text-center w-full space-y-1"
//             >
//               <div className="ml-4 text-[44px] font-semibold text-[#FFB800] tabular-nums tracking-tight">
//                 {Math.round(animatedScore)}
//                 <span className="text-[40px]">/100</span>
//               </div>
//               <p className="text-[24px] font-normal text-[#E2E2E2]">
//                 Top 10% among peers!
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <AnimatePresence>
//         {showText && (
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-[18px] leading-relaxed text-[#B5B5B5] tracking-wide text-center mt-auto"
//           >
//             {"You're only "}
//             <span className="text-[#FFB323] font-semibold">7</span>
//             {" points away from"}
//             <br />
//             {"being in the Top "}
//             <span className="text-[#FFB323] font-semibold">5%</span>!
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Montserrat } from 'next/font/google';
import { motion, AnimatePresence } from "framer-motion";

const montserrat = Montserrat({ subsets: ["latin"] });

export function GaugeChart({ score = 60, animate = false }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showText, setShowText] = useState(false);
  const [circleAnimationComplete, setCircleAnimationComplete] = useState(false);
  const requestRef = useRef();
  const startTimeRef = useRef();

  const radius = 170;
  const strokeWidth = 55;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.5;

  const svgSize = (radius + strokeWidth) * 2;
  const centerPoint = svgSize / 2;

  const animateChart = (time) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }

    const elapsed = time - startTimeRef.current;
    const duration = 2000; // 2 seconds
    const progress = Math.min(elapsed / duration, 1);
    const currentScore = progress * score;

    setAnimatedScore(currentScore);

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animateChart);
    } else {
      setCircleAnimationComplete(true);
    }
  };

  useEffect(() => {
    if (animate) {
      setAnimatedScore(0);
      setShowText(false);
      setCircleAnimationComplete(false);
      startTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animateChart);
    } else {
      setAnimatedScore(score);
      setShowText(true);
      setCircleAnimationComplete(true);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, score]);

  useEffect(() => {
    if (circleAnimationComplete) {
      setTimeout(() => setShowText(true), 100);
    }
  }, [circleAnimationComplete]);

  const normalizedScore = animatedScore / 100;
  const offset = arc - arc * normalizedScore;

  const innerRadius = radius - 70;
  const dotCount = 30;
  const dotRadius = 0.1;
  const dots = Array.from({ length: dotCount }).map((_, i) => {
    const angle = (Math.PI * i) / (dotCount - 1);
    const x = centerPoint + innerRadius * Math.cos(angle);
    const y = centerPoint + innerRadius * Math.sin(angle);
    return { x, y };
  });

  const lineStartX =
    centerPoint +
    (radius - strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
  const lineStartY =
    centerPoint +
    (radius - strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);
  const lineEndX =
    centerPoint +
    (radius + strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
  const lineEndY =
    centerPoint +
    (radius + strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);

  return (
    <div
      className={`${montserrat.className} h-[450px] flex flex-col items-center bg-[#2A2A36] rounded-2xl border-2 border-[#464653] p-6`}
    >
      <h2 className="text-xl font-bold text-white tracking-wide">
        HOW COMPETITIVE ARE YOU?
      </h2>

      <div className="relative w-full">
        <svg
          className="absolute rotate-180"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          width="450"
          height="450"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Dots */}
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dotRadius}
              fill="none"
              stroke="rgba(255, 179, 35, 1)"
              strokeWidth="1"
            />
          ))}

          {/* Background arc */}
          <circle
            cx={centerPoint}
            cy={centerPoint}
            r={radius}
            fill="none"
            stroke="url(#darkGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc} ${circumference}`}
            strokeLinecap="butt"
          />

          {/* Foreground arc */}
          <circle
            cx={centerPoint}
            cy={centerPoint}
            r={radius}
            fill="none"
            stroke="url(#lightGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
          />

          {/* Indicator line */}
          <line
            x1={lineStartX}
            y1={lineStartY}
            x2={lineEndX}
            y2={lineEndY}
            stroke="white"
            strokeWidth="3"
          />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="lightGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FFD572" />
              <stop offset="100%" stopColor="#FEBD38" />
            </linearGradient>

            <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b4b0f" />
              <stop offset="100%" stopColor="#593F0C" />
            </linearGradient>
          </defs>
        </svg>

        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="absolute top-48 -translate-x-1/2 -translate-y-1/2 text-center w-full space-y-1"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="ml-4 text-[44px] font-semibold text-[#FFB800] tabular-nums tracking-tight"
              >
                {Math.round(animatedScore)}
                <span className="text-[40px]">/100</span>
              </motion.div>
              <p className="text-[24px] font-normal text-[#E2E2E2]">
                Top 10% among peers!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[18px] leading-relaxed text-[#B5B5B5] tracking-wide text-center mt-auto"
          >
            {"You're only "}
            <span className="text-[#FFB323] font-semibold">7</span>
            {" points away from"}
            <br />
            {"being in the Top "}
            <span className="text-[#FFB323] font-semibold">5%</span>!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

