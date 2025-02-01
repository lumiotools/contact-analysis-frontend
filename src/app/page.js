"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Gauge,
  LineChart,
  Rocket,
  Zap,
  Timer,
  TrendingUp,
  Target,
  UploadIcon,
  MapPin,
  CheckCircle2,
  Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { LoadingAnimation } from "@/components/loading-animation";
import axios from "axios"
import { parseJson } from "@/utils/parseJson";

export default function IntroPage() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    pdf: null,
    weeklyCharges: "",
  });

  const [uploadingLoading, setUploadLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [targetSpend, setTargetSpend] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pdf || !formData.weeklyCharges || !targetSpend) {
      return;
    }
    setUploadLoading(true);

    try {
      // Create a FormData object
      const data = new FormData();
      data.append("file", formData.pdf);
      data.append("weeklyChargesBand", `${formData.weeklyCharges}`);

      const graphApiBody = {
        target_spend: targetSpend,
        carrier: "UPS",
        tolerance: 0.2,
        top_n: 100,
      };
      const { data: graphResponse } = await axios.post(
        process.env.NEXT_PUBLIC_GRAPH_SERVER_URL + "/analyze_contracts",
        graphApiBody
      );
      const graphApiJsonResponse = JSON.parse(parseJson(graphResponse));
      console.log("graph", graphApiJsonResponse);
      localStorage.setItem("graphData", JSON.stringify(graphApiJsonResponse));
      const { data: discountApiResponse } = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/analyze",
        data
      );
      localStorage.setItem("fileName", JSON.stringify(discountApiResponse.file_name));
      localStorage.setItem("data", JSON.stringify(discountApiResponse.discounts));
      navigate.push("/results");
      setUploadLoading(false);
    } catch (error) {
      console.log(error);
      setUploadLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, pdf: file }));
      setIsUploaded(true);
    }
  };

  useEffect(() => {
    (async () => { })();
  }, []);

  const benefits = [
    {
      icon: BarChart3,
      title: "Smart Analysis",
      description: "AI-powered contract analysis for maximum savings",
    },
    {
      icon: TrendingUp,
      title: "Cost Reduction",
      description: "Average savings of 41% on shipping costs",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get your discount calculations in seconds",
    },
  ];

  if (uploadingLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="h-screen  bg-[#1C1C28] flex items-center justify-center w-full">
      <div className="w-full h-full mx-auto">
        <div className="relative w-full h-full bg-[#23232F]/80  backdrop-blur-xl overflow-x-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 p-12 md:p-16 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 text-orange-500">
                  <span className="text-sm font-medium">New Feature</span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
                    Smart Contract{" "}
                    <span className="text-orange-500">Discounts</span>
                  </h1>

                  <p className="text-xl text-gray-400 max-w-2xl">
                    Leverage AI-powered analysis to automatically calculate and
                    apply the best possible discounts for your shipping
                    contracts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <ArrowUpRight className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Increased Savings
                      </h3>
                      <p className="text-gray-400">Up to 76% cost reduction</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Instant Analysis
                      </h3>
                      <p className="text-gray-400">Results in seconds</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex flex-col items-center w-fit">
                    <span className="text-gray-400 text-lg mb-2 animate-bounce">
                      Scroll down{" "}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Improved Visualization */}
              <div className="relative flex items-center mt-10">
                {/* Main Circle with Percentage */}
                <div className="relative w-[500px] h-[500px] mx-auto">
                  {/* Decorative Rings */}
                  <div className="absolute inset-0 rounded-full border-4 border-orange-500/10 animate-pulse" />

                  <div className="absolute inset-[10%] rounded-full border-4 border-purple-500/10 animate-pulse delay-75" />

                  <div className="absolute inset-[20%] rounded-full border-4 border-orange-500/10 animate-pulse delay-150" />

                  {/* Central Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center z-50">
                      <div className="text-[120px] font-bold text-white leading-none relative z-50">
                        41
                        <span className="text-orange-500">%</span>
                      </div>
                      <div className="text-xl text-gray-400 relative z-50">
                        Average Savings
                      </div>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute inset-0">
                    {/* Top Stat */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2A2A36] p-4 rounded-xl border border-orange-500/20">
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-orange-500" />

                        <div>
                          <div className="text-lg font-bold text-white">
                            76%
                          </div>
                          <div className="text-sm text-gray-400">
                            Max Savings
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Stat */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-7 bg-[#2A2A36] p-4 rounded-xl border border-purple-500/20">
                      <div className="flex items-center gap-3">
                        <Rocket className="h-5 w-5 text-purple-500" />

                        <div>
                          <div className="text-lg font-bold text-white">
                            2.5x
                          </div>
                          <div className="text-sm text-gray-400">
                            ROI Increase
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Stat */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#2A2A36] p-4 rounded-xl border border-orange-500/20">
                      <div className="flex items-center gap-3">
                        <Timer className="h-5 w-5 text-orange-500" />

                        <div>
                          <div className="text-lg font-bold text-white">
                            24/7
                          </div>
                          <div className="text-sm text-gray-400">Analysis</div>
                        </div>
                      </div>
                    </div>

                    {/* Left Stat */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#2A2A36] p-4 rounded-xl border border-purple-500/20">
                      <div className="flex items-center gap-3">
                        <Gauge className="h-5 w-5 text-purple-500" />

                        <div>
                          <div className="text-lg font-bold text-white">
                            100%
                          </div>
                          <div className="text-sm text-gray-400">Automated</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute inset-0">
                    <div className="absolute top-[15%] left-[15%] bg-orange-500/10 p-3 rounded-full">
                      <BarChart3 className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="absolute top-[15%] right-[15%] bg-purple-500/10 p-3 rounded-full">
                      <LineChart className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="absolute bottom-[15%] left-[15%] bg-purple-500/10 p-3 rounded-full">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="absolute bottom-[15%] right-[15%] bg-orange-500/10 p-3 rounded-full">
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen bg-[#1C1C28] flex items-center justify-center w-full">
          <div className="w-full h-full mx-auto">
            <div className="relative w-full h-full bg-[#23232F]/80  backdrop-blur-xl overflow-x-hidden">
              {/* <div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
          /> */}

              <div className="relative z-10 p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                      Contract Discounts
                    </h1>
                    <p className="text-xl text-gray-400">
                      Upload your contract and get instant discount calculations
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Form */}
                    <div className="bg-[#2A2A36] rounded-xl p-8 flex flex-col h-full">
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col h-full"
                      >
                        <div className="flex-1 space-y-8">
                          <div>
                            <Label
                              htmlFor="pdf"
                              className="text-base text-gray-300 mb-4 block"
                            >
                              Upload Contract (PDF)
                            </Label>
                            <div className="relative">
                              <label
                                htmlFor="pdf"
                                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isUploaded
                                  ? "border-green-500 bg-green-500/10"
                                  : "border-gray-600 hover:bg-[#2A2A36]"
                                  }`}
                              >
                                <div className="flex flex-col items-center justify-center py-4">
                                  {isUploaded ? (
                                    <>
                                      <CheckCircle2 className="w-12 h-12 mb-3 text-green-500" />

                                      <p className="text-base text-green-500 mb-1">
                                        {formData.pdf.name}
                                      </p>
                                      <p className="text-sm text-green-500/70">
                                        Click to change file
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <UploadIcon className="w-12 h-12 mb-3 text-orange-500" />

                                      <p className="text-base text-gray-400 mb-1">
                                        <span className="font-semibold text-orange-500">
                                          Click to upload
                                        </span>{" "}
                                        or drag and drop
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        PDF (MAX. 10MB)
                                      </p>
                                    </>
                                  )}
                                </div>
                                <Input
                                  type="file"
                                  accept=".pdf"
                                  className="hidden"
                                  id="pdf"
                                  onChange={handleFileChange}
                                />
                              </label>
                              {/* {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="mt-4">
                              <Progress
                                value={uploadProgress}
                                className="h-1"
                              />

                              <p
                                className="text-sm text-gray-400 mt-2"
                              >
                                Uploading... {uploadProgress}%
                              </p>
                            </div>
                          )} */}
                            </div>
                          </div>

                          <div className="grid grid-cols- gap-6">
                            <div className="space-y-4">
                              <Label
                                htmlFor="weeklyCharges"
                                className="text-base text-gray-300 block"
                              >
                                Weekly Charges ($)
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5" />

                                <Input
                                  type="number"
                                  placeholder="Enter weekly charges"
                                  value={formData.weeklyCharges}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      weeklyCharges: e.target.value,
                                    }))
                                  }
                                  className="pl-10 h-12 bg-[#2A2A36] border-gray-600 text-white placeholder:text-gray-500 rounded-xl"
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <Label
                                htmlFor="zone"
                                className="text-base text-gray-300 block"
                              >
                                Target Spend
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

                                <Input
                                  type="text"
                                  placeholder="Enter yearly contract spend"
                                  value={targetSpend}
                                  onChange={(e) =>
                                    setTargetSpend(e.target.value)
                                  }
                                  className="pl-10 h-12 bg-[#2A2A36] border-gray-600 text-white placeholder:text-gray-500 rounded-xl"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={uploadingLoading}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-black text-lg font-semibold h-14 rounded-xl mt-8"
                        >
                          {uploadingLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Get Discounts"
                          )}
                        </Button>
                      </form>
                    </div>

                    {/* Right Column - Info Cards */}
                    <div className="bg-[#2A2A36] rounded-xl p-8 flex flex-col h-full">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-8">
                          What You'll Get
                        </h2>
                        <div className="space-y-8">
                          {benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-6"
                              id={`3mzvzk_${index}`}
                            >
                              <div
                                className="w-16 h-16 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0"
                                id={`ellxqo_${index}`}
                              >
                                <benefit.icon
                                  className="w-8 h-8 text-orange-500"
                                  id={`uaqbhg_${index}`}
                                />
                              </div>
                              <div className="flex-1" id={`qh86ki_${index}`}>
                                <h3
                                  className="text-lg font-semibold text-white mb-2"
                                  id={`hz9ncg_${index}`}
                                >
                                  {benefit.title}
                                </h3>
                                <p
                                  className="text-base text-gray-400"
                                  id={`rli51e_${index}`}
                                >
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8 pt-8 border-t border-gray-700">
                        <p className="text-sm text-gray-400 text-center">
                          Join thousands of businesses saving on their shipping
                          costs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
