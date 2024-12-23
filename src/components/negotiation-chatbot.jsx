import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Loader,
  Send,
  LoaderCircle,
  Ship,
  Handshake,
  Clock,
  Scale,
} from "lucide-react";
import { Input } from "./ui/input";
import ReactMarkdown from "react-markdown";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";

const generalQuestions = [
  {
    icon: Handshake,
    message: "What are the best strategies for negotiating a lower rate?",
    color: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/20",
  },
  {
    icon: Clock,
    message:
      "What approach should I take when negotiating rates for a long-term contract?",

    color: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-500/20",
  },
  {
    icon: Scale,
    message: "What are ways to make the negotiation beneficial for both sides?",
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20",
  },
];

export function NegotiationChatbot() {
  const [carriers, setCarriers] = useState(null);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [controller, setController] = useState();

  const chatContainerRef = useRef(null);

  const fetchCarriers = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RATES_NEGOTIATION_CHAT_API_URL}/carriers`
    );
    const data = await response.json();
    setCarriers(data.carriers);
  };

  useEffect(() => {
    fetchCarriers();
  }, []);

  const handleSendMessage = async (message) => {
    setUserMessage("");
    setIsLoading(true);

    setChatHistory([
      ...chatHistory,
      {
        role: "user",
        content: message,
      },
    ]);

    try {
      const controller = new AbortController();
      setController(controller);
      const res = await (
        await fetch(
          process.env.NEXT_PUBLIC_RATES_NEGOTIATION_CHAT_API_URL +
            "/rates-negotiation-chat",
          {
            signal: controller.signal,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              carrier_url: selectedCarrier,
              message,
              chat_history: chatHistory,
            }),
          }
        )
      ).json();

      setChatHistory([
        ...chatHistory,
        {
          role: "user",
          content: message,
        },
        {
          role: "assistant",
          content: res.response,
        },
      ]);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error);
        setChatHistory([
          ...chatHistory,
          {
            role: "user",
            content: message,
          },
          {
            role: "assistant",
            content:
              "Error occurred while processing your query. Please try again.",
          },
        ]);
      }
    }
    setController();
    setIsLoading(false);
  };

  const handleResetChat = () => {
    setChatHistory([]);
    controller?.abort();
  };

  const handleResetCarrier = () => {
    setSelectedCarrier(null);
    handleResetChat();
  };

  useEffect(() => {
    if (!chatContainerRef.current) return;
    if (chatHistory[chatHistory.length - 1]?.role === "user") {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Card className="bg-[#23232F]/90 border-[#2A2A36] mt-8">
      <CardHeader className="border-b border-[#2A2A36]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            <CardTitle className="text-lg md:text-xl font-semibold text-white">
              Rates Negotaition Chat Bot
            </CardTitle>
          </div>
          {chatHistory.length > 0 && (
            <Button
              className="text-orange-500 hover:text-orange-600"
              variant="text"
              onClick={handleResetChat}
            >
              Clear Chat
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-8">
        {selectedCarrier ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Ship className="size-8 text-white" />
                <p className="text-white text-lg font-semibold">
                  {
                    carriers.find(({ value }) => value === selectedCarrier)
                      .label
                  }
                </p>
              </div>

              <Button
                className="text-orange-500 hover:text-orange-600"
                variant="text"
                onClick={handleResetCarrier}
              >
                Cancel Carrier
              </Button>
            </div>

            <div
              className="flex flex-col gap-8 h-[480px] overflow-y-scroll pr-4"
              ref={chatContainerRef}
            >
              {chatHistory.length === 0 &&
                generalQuestions.map(
                  ({
                    icon: Icon,
                    title,
                    message,
                    color,
                    borderColor,
                    textColor,
                  }) => (
                    <button
                      className={`${color} ${borderColor} w-full flex-1 my-4 max-w-screen-sm mx-auto border rounded-xl p-4 md:p-6 text-left transition-all hover:scale-[0.98] relative overflow-hidden space-y-2`}
                      onClick={() => handleSendMessage(message)}
                    >
                      <div className="flex  gap-4">
                        <Icon className={`size-6 md:size-8 ${textColor}`} />
                        <p className={`font-semibold ${textColor}`}>
                          {message}
                        </p>
                      </div>
                    </button>
                  )
                )}
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex gap-2 prose prose-invert max-w-full ${
                    chat.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 rounded-xl max-w-[80%] ${
                      chat.role === "user"
                        ? "bg-orange-500 text-black"
                        : "bg-[#2A2A36] text-white"
                    }`}
                  >
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div
                  className={`flex gap-2 items-center px-4 rounded-xl max-w-[80%] bg-[#2A2A36] text-white`}
                >
                  <LoaderCircle className="size-5 animate-spin" />
                  <p className="py-6">Searching...</p>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  userMessage &&
                  handleSendMessage(userMessage)
                }
                className="flex-1 h-12 bg-[#2A2A36] border-gray-600 text-white placeholder:text-gray-500 rounded-xl"
              />
              <Button
                disabled={isLoading || !userMessage}
                onClick={() => handleSendMessage(userMessage)}
                className="bg-orange-500 hover:bg-orange-600 text-black text-lg font-semibold h-12 rounded-xl"
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Send className="h-6 w-6" />
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-20 space-y-8">
            <h4 className="text-2xl font-bold text-center text-white">
              Select Your Carrier
            </h4>

            <Select onValueChange={setSelectedCarrier}>
              <SelectTrigger className="max-w-md mx-auto h-12 bg-[#2A2A36] border-gray-600 text-white placeholder:text-gray-500 rounded-xl">
                <SelectValue placeholder="Select carrier" />
              </SelectTrigger>
              <SelectContent className="bg-[#23232F] border-[#2A2A36] text-white">
                {carriers?.map((carrier) => (
                  <SelectItem key={carrier.value} value={carrier.value} className="focus:bg-orange-500 focus:text-white">
                    {carrier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
