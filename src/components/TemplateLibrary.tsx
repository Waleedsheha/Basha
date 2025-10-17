import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Template } from '@/lib/types';
import { templates } from '@/lib/templates';
import { FileText, Stack } from '@phosphor-icons/react';
import { useState } from 'react';

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template) => void;
}

export function TemplateLibrary({ onSelectTemplate }: TemplateLibraryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const categoryColors: Record<string, string> = {
    chatbot: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    'code-assistant': 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    'content-generator': 'bg-green-500/10 text-green-700 border-green-500/20',
    'data-analyzer': 'bg-orange-500/10 text-orange-700 border-orange-500/20',
  };

  return (
    <>
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Template Library</h2>
          <p className="text-muted-foreground">
            Start with proven patterns and best practices for common AI application types
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="mt-1">{template.description}</CardDescription>
                  </div>
                  <FileText className="text-accent" size={24} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className={categoryColors[template.category] || ''}>
                    {template.category.replace('-', ' ')}
                  </Badge>
                  {template.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedTemplate(template)}
                >
                  Preview
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => onSelectTemplate(template)}
                >
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>{selectedTemplate?.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="grid gap-6 pr-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Stack size={18} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate?.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {selectedTemplate?.requirements}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Architecture Overview</h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {selectedTemplate?.architectureOverview}
                  </pre>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setSelectedTemplate(null)}
            >
              Close
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                if (selectedTemplate) {
                  onSelectTemplate(selectedTemplate);
                  setSelectedTemplate(null);
                }
              }}
            >
              Use This Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
