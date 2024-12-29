import { v4 as uuidv4 } from "uuid";

export function extractContractData(data) {
  const services = data.map((item) => ({
    id: uuidv4(),
    name: item["Service Level"],
    currentDiscount: `${Math.round(item["Average Discount"])}%`,
    defaultValue: Math.round(item["Average Discount"]),
    projectedSavings: `$${(
      (item["Max Discount"] - item["Average Discount"]) *
      1000
    ).toFixed(1)}k`,
    category: getCategoryFromName(item["Service Level"]),
  }));

  const totalPotentialSavings = services.reduce(
    (sum, item) =>
      sum + parseFloat(item.projectedSavings.replace("$", "").replace("k", "")),
    0
  );
  const currentSaving = services.reduce(
    (sum, item) => sum + (parseFloat(item.currentDiscount) / 100) * 1000,
    0
  );

  return {
    services,
    totalPotentialSavings: `$${totalPotentialSavings.toFixed(0)}k`,
    currentSaving: `$${currentSaving.toFixed(0)}k`,
    competitiveScore: Math.round(Math.random() * 20 + 70), // Random score between 70-90
  };
}

function getCategoryFromName(name) {
  if (!name) return "standard"; // Default category if name is null or undefined
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes("next day") || lowercaseName.includes("express"))
    return "express";
  if (lowercaseName.includes("ground")) return "ground";
  if (
    lowercaseName.includes("international") ||
    lowercaseName.includes("import") ||
    lowercaseName.includes("export")
  )
    return "international";
  if (lowercaseName.includes("commercial")) return "commercial";
  return "standard";
}
