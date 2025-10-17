export type ProjectCategory = 
  | 'chatbot'
  | 'code-assistant'
  | 'content-generator'
  | 'data-analyzer'
  | 'custom';

export type PromptType =
  | 'code-generation'
  | 'architecture-design'
  | 'testing'
  | 'documentation'
  | 'refactoring'
  | 'debugging';

export type TechStack =
  | 'react'
  | 'vue'
  | 'angular'
  | 'node'
  | 'python'
  | 'java'
  | 'go'
  | 'rust'
  | 'other';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  techStack: TechStack[];
  createdAt: number;
  updatedAt: number;
}

export interface GeneratedPrompt {
  id: string;
  projectId: string;
  type: PromptType;
  context: string;
  generatedPrompt: string;
  createdAt: number;
}

export interface ArchitecturePlan {
  id: string;
  projectId: string;
  requirements: string;
  architecture: {
    overview: string;
    components: Array<{
      name: string;
      description: string;
      dependencies: string[];
    }>;
    dataModel: string;
    apiSpec: string;
    techConsiderations: string;
  };
  createdAt: number;
}

export interface Template {
  id: string;
  name: string;
  category: ProjectCategory;
  description: string;
  techStack: TechStack[];
  requirements: string;
  architectureOverview: string;
}
