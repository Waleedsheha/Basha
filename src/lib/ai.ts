import { PromptType, Project } from './types';

export interface PromptContext {
  type: PromptType;
  project: Project;
  specificContext: string;
  additionalRequirements?: string;
}

export async function generatePrompt(context: PromptContext): Promise<string> {
  const { type, project, specificContext, additionalRequirements } = context;
  
  const baseContext = `
Project: ${project.name}
Description: ${project.description}
Category: ${project.category}
Tech Stack: ${project.techStack.join(', ')}
  `.trim();

  let systemPrompt = '';
  
  switch (type) {
    case 'code-generation':
      systemPrompt = spark.llmPrompt`You are an expert prompt engineer. Generate an optimized prompt for AI code generation.

${baseContext}

Specific Context:
${specificContext}

${additionalRequirements ? `Additional Requirements:\n${additionalRequirements}` : ''}

Create a comprehensive, well-structured prompt that:
1. Clearly defines the coding task
2. Specifies the exact tech stack and frameworks
3. Includes code style and best practices expectations
4. Defines input/output requirements
5. Specifies error handling needs
6. Includes testing considerations

Format the output as a ready-to-use prompt that can be directly sent to an AI coding assistant.`;
      break;
      
    case 'architecture-design':
      systemPrompt = spark.llmPrompt`You are an expert prompt engineer. Generate an optimized prompt for AI architecture design.

${baseContext}

Specific Context:
${specificContext}

${additionalRequirements ? `Additional Requirements:\n${additionalRequirements}` : ''}

Create a comprehensive, well-structured prompt that:
1. Defines the system scope and boundaries
2. Specifies scalability and performance requirements
3. Identifies key technical constraints
4. Requests component breakdown and relationships
5. Asks for data flow and storage considerations
6. Includes security and deployment requirements

Format the output as a ready-to-use prompt for getting detailed architecture recommendations.`;
      break;
      
    case 'testing':
      systemPrompt = spark.llmPrompt`You are an expert prompt engineer. Generate an optimized prompt for AI-assisted testing.

${baseContext}

Specific Context:
${specificContext}

${additionalRequirements ? `Additional Requirements:\n${additionalRequirements}` : ''}

Create a comprehensive, well-structured prompt that:
1. Specifies the code/feature to be tested
2. Defines test coverage expectations (unit, integration, e2e)
3. Identifies edge cases and error scenarios
4. Requests test framework and library usage
5. Includes mock/stub requirements
6. Specifies assertion patterns and best practices

Format the output as a ready-to-use prompt for generating comprehensive tests.`;
      break;
      
    case 'documentation':
      systemPrompt = spark.llmPrompt`You are an expert prompt engineer. Generate an optimized prompt for AI documentation generation.

${baseContext}

Specific Context:
${specificContext}

${additionalRequirements ? `Additional Requirements:\n${additionalRequirements}` : ''}

Create a comprehensive, well-structured prompt that:
1. Identifies what needs to be documented (API, code, architecture, user guide)
2. Specifies the target audience (developers, end-users, stakeholders)
3. Defines documentation format and style
4. Requests examples and use cases
5. Includes troubleshooting and FAQ sections
6. Specifies versioning and maintenance considerations

Format the output as a ready-to-use prompt for generating clear, comprehensive documentation.`;
      break;
      
    case 'refactoring':
      systemPrompt = spark.llmPrompt`You are an expert prompt engineer. Generate an optimized prompt for AI code refactoring.

${baseContext}

Specific Context:
${specificContext}

${additionalRequirements ? `Additional Requirements:\n${additionalRequirements}` : ''}

Create a comprehensive, well-structured prompt that:
1. Identifies the code quality issues to address
2. Specifies refactoring goals (performance, readability, maintainability)
3. Defines patterns and principles to follow (SOLID, DRY, etc.)
4. Requests before/after explanations
5. Ensures behavior preservation
6. Includes testing recommendations

Format the output as a ready-to-use prompt for safe, effective code refactoring.`;
      break;
      
    case 'debugging':
      systemPrompt = spark.llmPrompt`You are an expert prompt engineer. Generate an optimized prompt for AI-assisted debugging.

${baseContext}

Specific Context:
${specificContext}

${additionalRequirements ? `Additional Requirements:\n${additionalRequirements}` : ''}

Create a comprehensive, well-structured prompt that:
1. Describes the bug or error clearly
2. Includes relevant error messages and stack traces
3. Provides context about when the issue occurs
4. Specifies the expected vs actual behavior
5. Requests step-by-step debugging approach
6. Asks for root cause analysis and prevention strategies

Format the output as a ready-to-use prompt for effective bug resolution.`;
      break;
  }
  
  return await spark.llm(systemPrompt, 'gpt-4o');
}

export async function generateArchitecture(requirements: string, project: Project): Promise<any> {
  const prompt = spark.llmPrompt`You are a senior software architect. Design a comprehensive technical architecture for the following project.

Project: ${project.name}
Description: ${project.description}
Category: ${project.category}
Tech Stack: ${project.techStack.join(', ')}

Requirements:
${requirements}

Provide a detailed architecture including:
1. High-level overview and system design philosophy
2. Component breakdown with clear responsibilities and dependencies
3. Data model design with entities and relationships
4. API specification with key endpoints
5. Technical considerations including scalability, security, and deployment

Return your response as a JSON object with this exact structure:
{
  "overview": "string - comprehensive architecture overview",
  "components": [
    {
      "name": "string - component name",
      "description": "string - component purpose and functionality",
      "dependencies": ["string array - names of other components this depends on"]
    }
  ],
  "dataModel": "string - detailed data model description",
  "apiSpec": "string - API endpoints and specifications",
  "techConsiderations": "string - scalability, security, deployment, and other technical considerations"
}`;

  const response = await spark.llm(prompt, 'gpt-4o', true);
  return JSON.parse(response);
}
