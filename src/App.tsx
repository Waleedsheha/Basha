import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Sparkle, Star, MagicWand } from '@phosphor-icons/react';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error('Please enter what you want to ask AI');
      return;
    }

    setIsGenerating(true);
    try {
      const promptText = `You are an expert at improving prompts for AI assistants. Take the user's simple request and transform it into a clear, effective prompt that will get better results from AI.

User's request: ${input}

Create an improved prompt that:
- Is clear and specific
- Includes helpful context
- Asks for the right output format
- Will get better AI results

Return only the improved prompt, ready to use.`;

      const improvedPrompt = await spark.llm(promptText, 'gpt-4o');
      setResult(improvedPrompt);
      toast.success('Your improved prompt is ready!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success('Copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Could not copy. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Toaster />
      
      <div className="w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkle className="text-accent" size={48} weight="duotone" />
            </motion.div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Prompt Improver
            </h1>
          </div>
          <p className="text-muted-foreground text-xl">
            Turn your ideas into better AI prompts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-2 shadow-xl backdrop-blur">
            <CardContent className="p-8">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="input" className="text-lg font-semibold flex items-center gap-2">
                    <Star className="text-accent" size={20} weight="duotone" />
                    What do you want to ask AI?
                  </Label>
                  <Textarea
                    id="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Example: write a function that sorts an array..."
                    rows={6}
                    className="text-base resize-none focus-visible:ring-2 focus-visible:ring-accent transition-all"
                  />
                  <p className="text-sm text-muted-foreground">
                    Press {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + Enter to generate
                  </p>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !input.trim()}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
                  size="lg"
                >
                  {isGenerating ? (
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <MagicWand size={24} />
                      Creating magic...
                    </motion.div>
                  ) : (
                    <>
                      <MagicWand className="mr-2" size={24} />
                      Make it Better
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="mt-8 border-2 border-accent/20 shadow-xl backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkle className="text-accent" size={24} weight="duotone" />
                      <h2 className="text-2xl font-bold">Your Improved Prompt</h2>
                    </div>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={handleCopy}
                      className="border-2 hover:bg-accent/10 hover:border-accent transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2" size={20} weight="bold" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2" size={20} />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20 rounded-xl p-6">
                    <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground">
                      {result}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Copy this and paste it into ChatGPT, Claude, or any AI assistant
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;