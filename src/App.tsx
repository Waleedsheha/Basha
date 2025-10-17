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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <Toaster />
      
      <div className="w-full max-w-2xl space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold tracking-tight text-white">
            Dear.Dr
          </h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="input" className="block text-lg text-white font-medium">
              What do you want AI to do?
            </label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your request here..."
              rows={8}
              className="text-base resize-none bg-black text-white border-white focus-visible:ring-white focus-visible:ring-offset-0 placeholder:text-gray-500"
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !input.trim()}
            className="w-full h-12 text-base font-medium bg-white text-black hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-600"
          >
            {isGenerating ? 'Processing...' : 'Make it Better'}
          </Button>
        </div>

        {result && (
          <div className="space-y-4 border-t border-white pt-12">
            <div className="space-y-4">
              <Textarea
                value={result}
                readOnly
                rows={12}
                className="text-base resize-none bg-black text-white border-white focus-visible:ring-white focus-visible:ring-offset-0"
              />
              <Button 
                onClick={handleCopy}
                variant="outline"
                className="w-full h-12 text-base font-medium bg-black text-white border-white hover:bg-white hover:text-black"
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