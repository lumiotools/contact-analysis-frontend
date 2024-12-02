"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  UploadIcon,
  DollarSign,
  MapPin,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContractDiscounts() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    pdf: null,
    weeklyCharges: "",
    zone: "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate.push("/results", { state: { formData } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, pdf: file }));
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploaded(true);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

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

  return (
    <div
      className="h-screen bg-[#1C1C28] flex items-center justify-center w-full"
    >
      <div className="w-full h-full mx-auto">
        <div
          className="relative w-full h-full bg-[#23232F]/80  backdrop-blur-xl border border-[#2A2A36] overflow-x-hidden"
        >
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
          />

          <div className="relative z-10 p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h1
                  className="text-4xl lg:text-5xl font-bold text-white mb-3"
                >
                  Contract Discounts
                </h1>
                <p className="text-xl text-gray-400">
                  Upload your contract and get instant discount calculations
                </p>
              </div>

              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              >
                {/* Left Column - Form */}
                <div
                  className="bg-[#2A2A36] rounded-xl p-8 flex flex-col h-full"
                >
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
                            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                              isUploaded
                                ? "border-green-500 bg-green-500/10"
                                : "border-gray-600 hover:bg-[#2A2A36]"
                            }`}
                          >
                            <div
                              className="flex flex-col items-center justify-center py-4"
                            >
                              {isUploaded ? (
                                <>
                                  <CheckCircle2
                                    className="w-12 h-12 mb-3 text-green-500"
                                  />

                                  <p
                                    className="text-base text-green-500 mb-1"
                                  >
                                    {formData.pdf.name}
                                  </p>
                                  <p
                                    className="text-sm text-green-500/70"
                                  >
                                    Click to change file
                                  </p>
                                </>
                              ) : (
                                <>
                                  <UploadIcon
                                    className="w-12 h-12 mb-3 text-orange-500"
                                  />

                                  <p
                                    className="text-base text-gray-400 mb-1"
                                  >
                                    <span
                                      className="font-semibold text-orange-500"
                                    >
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p
                                    className="text-sm text-gray-500"
                                  >
                                    PDF (MAX. 10MB)
                                  </p>
                                </>
                              )}
                            </div>
                            <Input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                          {uploadProgress > 0 && uploadProgress < 100 && (
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
                          )}
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
                            <DollarSign
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5"
                            />

                            <Input
                              type="number"
                              placeholder="Enter charges"
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

                        {/* <div className="space-y-4">
                          <Label
                            htmlFor="zone"
                            className="text-base text-gray-300 block"
                          >
                            Zone/Place
                          </Label>
                          <div className="relative">
                            <MapPin
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5"
                            />

                            <Input
                              type="text"
                              placeholder="Enter zone"
                              value={formData.zone}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  zone: e.target.value,
                                }))
                              }
                              className="pl-10 h-12 bg-[#2A2A36] border-gray-600 text-white placeholder:text-gray-500 rounded-xl"
                            />
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black text-lg font-semibold h-14 rounded-xl mt-8"
                    >
                      Get Discounts
                    </Button>
                  </form>
                </div>

                {/* Right Column - Info Cards */}
                <div
                  className="bg-[#2A2A36] rounded-xl p-8 flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h2
                      className="text-2xl font-bold text-white mb-8"
                    >
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
                  <div
                    className="mt-8 pt-8 border-t border-gray-700"
                  >
                    <p
                      className="text-sm text-gray-400 text-center"
                    >
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
  );
}
