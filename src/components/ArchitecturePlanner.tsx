import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Project, ArchitecturePlan } from '@/lib/types';
import { generateArchitecture } from '@/lib/ai';
import { TreeStructure, Copy, Check, Download } from '@phosphor-icons/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ArchitecturePlannerProps {
  project: Project;
}

export function ArchitecturePlanner({ project }: ArchitecturePlannerProps) {
  const [requirements, setRequirements] = useState('');
  const [architecture, setArchitecture] = useState<ArchitecturePlan['architecture'] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!requirements.trim()) {
      toast.error('Please provide requirements for the architecture');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateArchitecture(requirements, project);
      setArchitecture(result);
      toast.success('Architecture plan generated successfully!');
    } catch (error) {
      toast.error('Failed to generate architecture plan');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!architecture) return;
    
    const markdown = formatAsMarkdown();
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleExport = () => {
    if (!architecture) return;
    
    const markdown = formatAsMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-architecture.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Architecture plan exported!');
  };

  const formatAsMarkdown = (): string => {
    if (!architecture) return '';
    
    return `# ${project.name} - Architecture Plan

## Overview
${architecture.overview}

## Components

${architecture.components.map(comp => `### ${comp.name}
${comp.description}

**Dependencies:** ${comp.dependencies.length > 0 ? comp.dependencies.join(', ') : 'None'}
`).join('\n')}

## Data Model
${architecture.dataModel}

## API Specification
${architecture.apiSpec}

## Technical Considerations
${architecture.techConsiderations}
`;
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreeStructure className="text-accent" />
            Architecture Planner
          </CardTitle>
          <CardDescription>
            Generate comprehensive technical architecture for your AI application
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Describe your application requirements, features, constraints, and goals in detail..."
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !requirements.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <div className="animate-pulse-glow mr-2">Generating Architecture...</div>
              </>
            ) : (
              <>
                <TreeStructure className="mr-2" />
                Generate Architecture
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {architecture && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Architecture Plan</CardTitle>
              <div className="flex gap-2">
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
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="mr-2" />
                  Export MD
                </Button>
              </div>
            </div>
            <CardDescription>
              Comprehensive architecture specification for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={['overview', 'components']} className="w-full">
              <AccordionItem value="overview">
                <AccordionTrigger className="text-lg font-semibold">
                  Overview
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-sm">{architecture.overview}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="components">
                <AccordionTrigger className="text-lg font-semibold">
                  Components ({architecture.components.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4">
                    {architecture.components.map((comp, index) => (
                      <div key={index} className="bg-muted rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2">{comp.name}</h4>
                        <p className="text-sm mb-3">{comp.description}</p>
                        {comp.dependencies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs text-muted-foreground">Dependencies:</span>
                            {comp.dependencies.map((dep, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-model">
                <AccordionTrigger className="text-lg font-semibold">
                  Data Model
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm">{architecture.dataModel}</pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="api-spec">
                <AccordionTrigger className="text-lg font-semibold">
                  API Specification
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm">{architecture.apiSpec}</pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tech-considerations">
                <AccordionTrigger className="text-lg font-semibold">
                  Technical Considerations
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-sm">{architecture.techConsiderations}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
