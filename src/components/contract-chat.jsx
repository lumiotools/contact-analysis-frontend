import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Loader,
  Send,
  LoaderCircle,
  BarChart3,
  Check,
  CreditCard,
  Wrench,
} from "lucide-react";
import { Input } from "./ui/input";
import ReactMarkdown from "react-markdown";

const generalQuestions = [
  {
    icon: BarChart3,
    title: "Incentives and Pricing Structure",
    message:
      "What discounts or incentives are offered under the agreement, and how are they applied?",
    color: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/20",
  },
  {
    icon: Check,
    title: "Eligibility and Account Details",
    message:
      "What are the criteria for accounts or locations to qualify for the services and incentives described in the agreement?",

    color: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-500/20",
  },
  {
    icon: CreditCard,
    title: "Payment Terms and Methods",
    message:
      "What are the payment terms, deadlines, and acceptable methods of payment specified in the agreement?",
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Wrench,
    title: "Compliance and Obligations",
    message:
      "What obligations or compliance requirements must the customer meet to maintain the terms and incentives of the agreement?",

    color: "bg-red-500/10",
    textColor: "text-red-500",
    borderColor: "border-red-500/20",
  },
];

export function ContractChat() {
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [controller, setController] = useState();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    setFileName(JSON.parse(localStorage.getItem("fileName")));
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
        await fetch(process.env.NEXT_PUBLIC_CONTRACT_CHAT_API_URL, {
          signal: controller.signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName,
            message,
            chat_history: chatHistory,
          }),
        })
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

  useEffect(() => {
    if (!chatContainerRef.current) return;
    if (chatHistory[chatHistory.length - 1]?.role === "user") {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Card className="bg-[#23232F]/90 border-[#2A2A36] mt-8" id="contact-chat-bot">
      <CardHeader className="border-b border-[#2A2A36]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            <CardTitle className="text-lg md:text-xl font-semibold text-white">
              Contract Chat Bot
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
                  className={`${color} ${borderColor} max-w-screen-sm mx-auto border rounded-xl p-4 md:p-6 text-left transition-all hover:scale-[0.98] relative overflow-hidden space-y-2`}
                  onClick={() => handleSendMessage(message)}
                >
                  <div className="flex  gap-4">
                    <Icon className={`size-6 md:size-8 ${textColor}`} />
                    <p className={`font-semibold ${textColor}`}>{message}</p>
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
              <p className="py-6">Searching in contract...</p>
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
              e.key === "Enter" && userMessage && handleSendMessage(userMessage)
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
      </CardContent>
    </Card>
  );
}
