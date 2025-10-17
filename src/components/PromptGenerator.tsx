import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project, PromptType } from '@/lib/types';
import { generatePrompt } from '@/lib/ai';
import { Lightbulb, Copy, Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PromptGeneratorProps {
  project: Project;
}

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

export function PromptGenerator({ project }: PromptGeneratorProps) {
  const [promptType, setPromptType] = useState<PromptType>('code-generation');
  const [context, setContext] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
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
      const prompt = await generatePrompt({
        type: promptType,
        project,
        specificContext: context,
        additionalRequirements: additionalRequirements || undefined,
      });
      setGeneratedPrompt(prompt);
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
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-accent" />
            Generate AI Prompt
          </CardTitle>
          <CardDescription>
            Create optimized prompts for AI-assisted development tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
            <Label htmlFor="context">Context</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe what you need help with. Be specific about features, requirements, or problems..."
              rows={5}
              className="font-mono text-sm"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="additional">Additional Requirements (Optional)</Label>
            <Textarea
              id="additional"
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              placeholder="Any specific constraints, preferences, or additional context..."
              rows={3}
              className="font-mono text-sm"
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !context.trim()}
            className="w-full"
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
        <Card>
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
  );
}
