import { Template } from './types';

export const templates: Template[] = [
  {
    id: 'chatbot-1',
    name: 'Conversational AI Chatbot',
    category: 'chatbot',
    description: 'A context-aware chatbot with conversation history, streaming responses, and personality customization.',
    techStack: ['react', 'node'],
    requirements: `
# Core Requirements
- Real-time streaming responses with token-by-token display
- Conversation history with session persistence
- Context window management (last 10 messages)
- Customizable AI personality and tone
- Message retry and edit functionality
- Export conversation as markdown/text
- Rate limiting and error handling
    `.trim(),
    architectureOverview: `
# Architecture Overview

## Frontend Components
- ChatInterface: Main conversation UI
- MessageList: Displays chat history with typing indicators
- InputBox: Message composition with multiline support
- SettingsPanel: Configure personality and model settings

## State Management
- useKV for conversation history persistence
- React state for current streaming message
- Context for global settings

## AI Integration
- Use spark.llm() for generation
- Implement streaming with character-by-character display
- Build conversation context from history
    `.trim()
  },
  {
    id: 'code-assistant-1',
    name: 'Code Generation Assistant',
    category: 'code-assistant',
    description: 'Generate, explain, and refactor code with syntax highlighting and multiple language support.',
    techStack: ['react', 'node'],
    requirements: `
# Core Requirements
- Multi-language code generation (Python, JavaScript, Java, etc.)
- Code explanation with inline comments
- Refactoring suggestions with before/after diff
- Syntax highlighting for output
- Copy to clipboard functionality
- Code validation and testing suggestions
- Save generated snippets to library
    `.trim(),
    architectureOverview: `
# Architecture Overview

## Frontend Components
- CodeEditor: Monaco-style editor for input/output
- LanguageSelector: Dropdown for target language
- ActionPanel: Generate, Explain, Refactor buttons
- SnippetLibrary: Saved code collection

## Code Processing
- Syntax highlighting with react-syntax-highlighter
- Diff visualization for refactoring
- Code validation via language-specific parsers

## AI Integration
- Specialized prompts for each action type
- Context includes language, framework, and style preferences
    `.trim()
  },
  {
    id: 'content-generator-1',
    name: 'Content Generation Engine',
    category: 'content-generator',
    description: 'Generate blog posts, marketing copy, and social media content with tone and style controls.',
    techStack: ['react'],
    requirements: `
# Core Requirements
- Multiple content types (blog, social media, email, ad copy)
- Tone adjustment (professional, casual, enthusiastic, etc.)
- Length control (short, medium, long)
- SEO optimization suggestions
- Headline/title generation
- Bulk generation with variations
- Export in multiple formats (HTML, Markdown, plain text)
    `.trim(),
    architectureOverview: `
# Architecture Overview

## Frontend Components
- ContentTypeSelector: Choose content format
- ToneControls: Adjust voice and style
- InputForm: Topic, keywords, and requirements
- OutputPanel: Display and edit generated content
- VariationsView: Multiple versions side-by-side

## Content Processing
- Template-based prompt construction
- Word count and readability metrics
- SEO keyword density analysis

## AI Integration
- Dynamic prompts based on content type and tone
- Iterative generation for variations
    `.trim()
  },
  {
    id: 'data-analyzer-1',
    name: 'Data Analysis & Insights',
    category: 'data-analyzer',
    description: 'Upload data, generate visualizations, and get AI-powered insights and recommendations.',
    techStack: ['react', 'python'],
    requirements: `
# Core Requirements
- CSV/JSON data upload and parsing
- Automated data profiling and statistics
- AI-generated insights and patterns
- Interactive visualizations (charts, graphs)
- Natural language query interface
- Export analysis reports
- Data cleaning suggestions
    `.trim(),
    architectureOverview: `
# Architecture Overview

## Frontend Components
- DataUploader: File upload and preview
- DataTable: Interactive data grid
- VisualizationPanel: Charts with D3/Recharts
- InsightsPanel: AI-generated findings
- QueryInterface: Natural language data queries

## Data Processing
- Client-side CSV parsing
- Statistical calculations
- Data type inference

## AI Integration
- Data profiling prompts with sample data
- Natural language to data query translation
- Insight generation from statistics
    `.trim()
  }
];

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(t => t.category === category);
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}
