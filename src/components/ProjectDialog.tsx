import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Project, ProjectCategory, TechStack } from '@/lib/types';
import { Plus, X } from '@phosphor-icons/react';
import { useState } from 'react';

interface ProjectDialogProps {
  project?: Project;
  onSave: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  trigger?: React.ReactNode;
}

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'chatbot', label: 'Chatbot' },
  { value: 'code-assistant', label: 'Code Assistant' },
  { value: 'content-generator', label: 'Content Generator' },
  { value: 'data-analyzer', label: 'Data Analyzer' },
  { value: 'custom', label: 'Custom' },
];

const techStackOptions: { value: TechStack; label: string }[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'other', label: 'Other' },
];

export function ProjectDialog({ project, onSave, trigger }: ProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [category, setCategory] = useState<ProjectCategory>(project?.category || 'custom');
  const [techStack, setTechStack] = useState<TechStack[]>(project?.techStack || []);

  const handleSave = () => {
    if (!name.trim()) return;
    
    onSave({
      name: name.trim(),
      description: description.trim(),
      category,
      techStack,
    });
    
    setOpen(false);
    if (!project) {
      setName('');
      setDescription('');
      setCategory('custom');
      setTechStack([]);
    }
  };

  const addTechStack = (tech: TechStack) => {
    if (!techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
    }
  };

  const removeTechStack = (tech: TechStack) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full">
            <Plus className="mr-2" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Create New Project'}</DialogTitle>
          <DialogDescription>
            Define your AI application project details to get started with prompts and architecture planning.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My AI Assistant"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A conversational AI that helps users..."
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as ProjectCategory)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Tech Stack</Label>
            <Select onValueChange={(v) => addTechStack(v as TechStack)}>
              <SelectTrigger>
                <SelectValue placeholder="Add technology..." />
              </SelectTrigger>
              <SelectContent>
                {techStackOptions.map(tech => (
                  <SelectItem 
                    key={tech.value} 
                    value={tech.value}
                    disabled={techStack.includes(tech.value)}
                  >
                    {tech.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {techStack.map(tech => (
                  <Badge key={tech} variant="secondary" className="gap-1">
                    {techStackOptions.find(t => t.value === tech)?.label}
                    <button
                      onClick={() => removeTechStack(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {project ? 'Save Changes' : 'Create Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
