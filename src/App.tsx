import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useRef, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { Copy, Trash, Sparkle } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useKV<Message[]>('chat-messages', []);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error('Please enter what you want AI to do');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages((current) => [...(current || []), userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      const currentMessages = messages || [];
      const conversationContext = currentMessages
        .slice(-4)
        .map(m => `${m.type === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n\n');

      const contextPart = conversationContext ? `Previous conversation context:\n${conversationContext}\n\n` : '';
      const userRequest = `Current user request: ${userMessage.content}`;
      
      const promptText = `You are an expert AI prompt engineer. Your job is to transform user requests into highly effective, clear prompts that will get superior results from AI assistants.

${contextPart}${userRequest}

Analyze the user's intent and create an optimized prompt that:
- Is crystal clear and specific about the desired outcome
- Includes relevant context and constraints
- Specifies the format and structure of the expected output
- Uses precise language that minimizes ambiguity
- Incorporates best practices for the type of task requested
- Considers edge cases and potential misunderstandings

If the user is refining a previous prompt, build upon the conversation history to create an even better version.

Return ONLY the improved prompt, ready to use. Make it professional, detailed, and effective.`;

      const improvedPrompt = await spark.llm(promptText, 'gpt-4o');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: improvedPrompt,
        timestamp: Date.now()
      };

      setMessages((current) => [...(current || []), assistantMessage]);
      toast.success('Prompt generated');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
      textareaRef.current?.focus();
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Could not copy. Please try again.');
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.success('Chat cleared');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const characterCount = input.length;
  const characterLimit = 1000;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Toaster />
      
      <div className="flex-none border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkle className="w-8 h-8 text-white" weight="fill" />
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Basha
            </h1>
          </div>
          {messages && messages.length > 0 && (
            <Button
              onClick={handleClearChat}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Trash className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="max-w-4xl mx-auto px-6 py-8">
            {!messages || messages.length === 0 ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4 max-w-md">
                  <Sparkle className="w-16 h-16 text-white/40 mx-auto" weight="duotone" />
                  <h2 className="text-2xl font-semibold text-white/90">
                    What do you want AI to do?
                  </h2>
                  <p className="text-white/50">
                    Describe your task and I'll generate an optimized prompt for you
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-6 py-4 ${
                          message.type === 'user'
                            ? 'bg-white text-black'
                            : 'bg-white/5 text-white border border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                          {message.type === 'assistant' && (
                            <Button
                              onClick={() => handleCopy(message.content)}
                              variant="ghost"
                              size="sm"
                              className="flex-none h-8 w-8 p-0 hover:bg-white/10 text-white/60 hover:text-white"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] rounded-2xl px-6 py-4 bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 text-white/60">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-white/60 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-white/60 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-white/60 rounded-full"
                          />
                        </div>
                        <span className="text-sm">Generating...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-none border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="space-y-3">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                id="input"
                value={input}
                onChange={(e) => {
                  if (e.target.value.length <= characterLimit) {
                    setInput(e.target.value);
                  }
                }}
                onKeyDown={handleKeyPress}
                placeholder="Describe what you need..."
                rows={1}
                className="text-base resize-none min-h-[56px] max-h-[200px] bg-white/5 text-white border-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 focus-visible:border-white/40 placeholder:text-white/30 rounded-2xl px-6 py-4 pr-24 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-3">
                <span className="text-xs text-white/40">
                  {characterCount}/{characterLimit}
                </span>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !input.trim()}
                  size="sm"
                  className="h-9 px-4 bg-white text-black hover:bg-white/90 disabled:bg-white/10 disabled:text-white/30 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {isGenerating ? 'Wait...' : 'Tamam'}
                </Button>
              </div>
            </div>
            <p className="text-xs text-white/40 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;