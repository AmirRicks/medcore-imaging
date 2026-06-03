"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackAICall } from "@/lib/observability";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const SYSTEM_PROMPT = `You are Aetherion Medical Imaging AI Assistant, a helpful assistant for medical imaging professionals.

You can help with:
- Explaining segmentation outputs and identified organs
- Explaining dose calculations and radiation safety concepts
- Explaining medical imaging terminology and DICOM metadata
- Generating educational reports about imaging findings
- Explaining CT/MRI scan parameters

You must NEVER:
- Provide diagnoses or treatment recommendations
- Interpret imaging findings as medical advice
- Suggest clinical decisions
- Claim to be a replacement for a physician or radiologist

Always include a disclaimer: "This information is for educational purposes only. Always consult a qualified healthcare provider for medical decisions."`;

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your medical imaging AI assistant. I can help explain segmentation results, dose calculations, imaging terminology, and more. Remember, I'm for educational purposes only.",
      id: "welcome",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input, id: crypto.randomUUID() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();

      trackAICall({
        model: data.model || "unknown",
        prompt: input,
        response: data.content,
        latency: data.latency || 0,
        tokens: data.tokens || 0,
        cost: data.cost || 0,
        success: data.success !== false,
        route: "/assistant",
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content || "I apologize, I'm having trouble responding. Please try again.", id: crypto.randomUUID() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, but I'm experiencing a technical issue. Please try again later.", id: crypto.randomUUID() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-xl glass-card overflow-hidden">
      <div className="border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-cyan-400" />
          <span className="text-sm font-semibold text-foreground">AI Imaging Assistant</span>
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
            Educational Use Only
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                msg.role === "assistant" ? "bg-cyan-500/10" : "bg-teal-500/10"
              )}>
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-cyan-400" />
                ) : (
                  <User className="h-4 w-4 text-teal-400" />
                )}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed",
                msg.role === "assistant"
                  ? "bg-muted/50 border border-border/30"
                  : "bg-cyan-500/10 border border-cyan-500/20"
              )}>
                <p className="text-foreground whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                <Bot className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="rounded-xl bg-muted/50 border border-border/30 px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border/50 p-4">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about segmentation, dose, or imaging terms..."
            className="flex-1 rounded-lg border border-input bg-background/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-2">
          AI-generated — for educational purposes only. Not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
