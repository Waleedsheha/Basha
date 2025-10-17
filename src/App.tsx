import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Copy, Check, Sparkle } from '@phosphor-icons/react';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

type PromptType = 'code-generation' | 'architecture-design' | 'testing' | 'documentation' | 'refactoring' | 'debugging';

const promptTypes: { value: PromptType; label: string; description: string }[] = [
  { 
    value: 'code-generation', 
    label: 'Code Generation',
    description: 'Generate code snippets and implementations'
  },
  { 
    value: 'architecture-design', 
    label: 'Architecture Design',
    description: 'Design system architecture and component structure'
  },
  { 
    value: 'testing', 
    label: 'Testing',
    description: 'Create unit tests, integration tests, and test strategies'
  },
  { 
    value: 'documentation', 
    label: 'Documentation',
    description: 'Generate technical documentation and guides'
  },
  { 
    value: 'refactoring', 
    label: 'Refactoring',
    description: 'Improve code quality and structure'
  },
  { 
    value: 'debugging', 
    label: 'Debugging',
    description: 'Identify and fix bugs and issues'
  },
];

function App() {
  const [promptType, setPromptType] = useState<PromptType>('code-generation');
  const [context, setContext] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) {
      toast.error('Please provide context for the prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const selectedTypeInfo = promptTypes.find(t => t.value === promptType);
      
      const systemPrompt = spark.llmPrompt`You are an expert at crafting effective prompts for AI coding assistants. Generate a well-structured, detailed prompt that will help an AI assistant understand exactly what the user needs.

Prompt Type: ${promptType}
Type Description: ${selectedTypeInfo?.description}
User Context: ${context}

Create an optimized prompt that:
- Clearly states the objective
- Provides necessary context and constraints
- Specifies the expected output format
- Includes any relevant technical details
- Uses best practices for AI prompt engineering

Return only the generated prompt, ready to be copied and used.`;

      const result = await spark.llm(systemPrompt, 'gpt-4o');
      setGeneratedPrompt(result);
      toast.success('Prompt generated successfully!');
    } catch (error) {
      toast.error('Failed to generate prompt');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const selectedType = promptTypes.find(t => t.value === promptType);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster />
      
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkle className="text-accent" size={40} weight="fill" />
            <h1 className="text-4xl font-bold tracking-tight">AI Prompt Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Create optimized prompts for AI-assisted development
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-accent" />
              Generate AI Prompt
            </CardTitle>
            <CardDescription>
              Describe what you need and get a well-crafted prompt
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="prompt-type">Prompt Type</Label>
              <Select value={promptType} onValueChange={(v) => setPromptType(v as PromptType)}>
                <SelectTrigger id="prompt-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {promptTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedType && (
                <p className="text-sm text-muted-foreground">{selectedType.description}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="context">What do you need help with?</Label>
              <Textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Describe what you need in detail. Be specific about features, requirements, constraints, or problems you're trying to solve..."
                rows={8}
                className="font-mono text-sm resize-none"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !context.trim()}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-pulse-glow mr-2">Generating...</div>
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2" />
                  Generate Prompt
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Prompt</CardTitle>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>
                Use this optimized prompt with your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
                  {generatedPrompt}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;