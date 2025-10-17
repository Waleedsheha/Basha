import { useKV } from '@github/spark/hooks';
import { useState, useEffect } from 'react';
import { Project, Template } from '@/lib/types';
import { ProjectDialog } from '@/components/ProjectDialog';
import { PromptGenerator } from '@/components/PromptGenerator';
import { ArchitecturePlanner } from '@/components/ArchitecturePlanner';
import { TemplateLibrary } from '@/components/TemplateLibrary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TreeStructure, FileText, Trash, Sparkle } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [projects, setProjects] = useKV<Project[]>('ai-architect-projects', []);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'templates' | 'project'>('templates');

  const projectsList = projects || [];
  const selectedProject = projectsList.find(p => p.id === selectedProjectId);

  useEffect(() => {
    if (projectsList.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projectsList[0].id);
      setActiveView('project');
    }
  }, [projectsList.length, selectedProjectId]);

  const handleCreateProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setProjects((current) => [...(current || []), newProject]);
    setSelectedProjectId(newProject.id);
    setActiveView('project');
    toast.success(`Project "${newProject.name}" created!`);
  };

  const handleSelectTemplate = (template: Template) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: template.name,
      description: template.description,
      category: template.category,
      techStack: template.techStack,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setProjects((current) => [...(current || []), newProject]);
    setSelectedProjectId(newProject.id);
    setActiveView('project');
    toast.success(`Project created from template!`);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects((current) => (current || []).filter(p => p.id !== projectId));
      if (selectedProjectId === projectId) {
        setSelectedProjectId(null);
        setActiveView('templates');
      }
      toast.success('Project deleted');
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <Toaster />
      
      <aside className="w-80 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-2">
            <Sparkle className="text-accent" size={32} weight="fill" />
            <h1 className="text-2xl font-bold tracking-tight">AI App Architect</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Plan, prompt, and architect AI applications
          </p>
        </div>

        <div className="p-4 border-b">
          <ProjectDialog onSave={handleCreateProject} />
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="mb-4">
                <Button
                  variant={activeView === 'templates' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('templates')}
                >
                  <FileText className="mr-2" />
                  Template Library
                </Button>
              </div>

              {projectsList.length > 0 && (
                <>
                  <Separator className="mb-4" />
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Your Projects
                    </h3>
                    {projectsList.map((project) => (
                      <div
                        key={project.id}
                        className={`group flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors ${
                          selectedProjectId === project.id && activeView === 'project'
                            ? 'bg-muted'
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setActiveView('project');
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{project.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {project.category.replace('-', ' ')}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                        >
                          <Trash size={14} className="text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="p-4 border-t bg-muted/30">
          <div className="text-xs text-muted-foreground">
            <div className="font-medium mb-1">Next-Gen AI Planning</div>
            <div>Powered by GPT-4 and modern best practices</div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-5xl mx-auto p-6">
            {activeView === 'templates' ? (
              <TemplateLibrary onSelectTemplate={handleSelectTemplate} />
            ) : selectedProject ? (
              <>
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {selectedProject.name}
                      </h1>
                      <p className="text-muted-foreground">{selectedProject.description}</p>
                    </div>
                    <ProjectDialog
                      project={selectedProject}
                      onSave={(data) => {
                        setProjects((current) =>
                          (current || []).map((p) =>
                            p.id === selectedProject.id
                              ? { ...p, ...data, updatedAt: Date.now() }
                              : p
                          )
                        );
                        toast.success('Project updated');
                      }}
                      trigger={<Button variant="outline">Edit Project</Button>}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary" className="capitalize">
                      {selectedProject.category.replace('-', ' ')}
                    </Badge>
                    {selectedProject.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Tabs defaultValue="prompts" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="prompts" className="gap-2">
                      <Lightbulb size={18} />
                      Prompt Generator
                    </TabsTrigger>
                    <TabsTrigger value="architecture" className="gap-2">
                      <TreeStructure size={18} />
                      Architecture Planner
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="prompts">
                    <PromptGenerator project={selectedProject} />
                  </TabsContent>

                  <TabsContent value="architecture">
                    <ArchitecturePlanner project={selectedProject} />
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to AI App Architect</CardTitle>
                  <CardDescription>
                    Create a new project or select a template to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <ProjectDialog onSave={handleCreateProject} />
                    <Button variant="outline" onClick={() => setActiveView('templates')}>
                      Browse Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

export default App;