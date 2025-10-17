import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error('Please enter what you want AI to do');
      return;
    }

    setIsGenerating(true);
    try {
      const improvedPrompt = await spark.llm(`You are an expert at improving prompts for AI assistants. Take the user's simple request and transform it into a clear, effective prompt that will get better results from AI.

User's request: ${input}

Create an improved prompt that:
- Is clear and specific
- Includes helpful context
- Asks for the right output format
- Will get better AI results

Return only the improved prompt, ready to use.`, 'gpt-4o');
      setResult(improvedPrompt);
      toast.success('Your improved prompt is ready');
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
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Could not copy. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const characterCount = input.length;
  const characterLimit = 1000;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <Toaster />
      
      <div className="w-full max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-7xl font-bold tracking-tight text-white">
            Basha
          </h1>
          <p className="text-xl text-white/80 font-medium">
            What do you want AI to do?
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Textarea
              id="input"
              value={input}
              onChange={(e) => {
                if (e.target.value.length <= characterLimit) {
                  setInput(e.target.value);
                }
              }}
              onKeyDown={handleKeyPress}
              placeholder="Describe what you need..."
              rows={4}
              className="text-lg resize-y min-h-[120px] max-h-[400px] bg-white/5 text-white border-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 focus-visible:border-white/40 placeholder:text-white/30 rounded-2xl px-6 py-5 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            />
            <div className="text-right text-sm text-white/40">
              {characterCount}/{characterLimit}
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !input.trim()}
            className="w-full h-14 text-lg font-semibold bg-white text-black hover:bg-white/90 disabled:bg-white/10 disabled:text-white/30 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isGenerating ? 'Processing...' : 'Tamam'}
          </Button>
        </div>

        {result && (
          <div className="space-y-6 border-t border-white/20 pt-12">
            <div className="space-y-4">
              <Textarea
                value={result}
                readOnly
                rows={12}
                className="text-lg resize-none bg-white/5 text-white border-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 rounded-2xl px-6 py-5 backdrop-blur-sm"
              />
              <Button 
                onClick={handleCopy}
                variant="outline"
                className="w-full h-14 text-lg font-semibold bg-transparent text-white border-2 border-white/30 hover:bg-white hover:text-black rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;