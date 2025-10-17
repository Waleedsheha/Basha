# Planning Guide

An intelligent workspace for architecting AI applications through structured prompt generation, requirement planning, and technical specification.

**Experience Qualities**:
1. **Professional** - Clean, sophisticated interface that inspires confidence in serious technical work with clear information hierarchy
2. **Efficient** - Streamlined workflows that reduce cognitive load and accelerate the planning process from concept to specification
3. **Intelligent** - Context-aware AI assistance that adapts to project complexity and provides relevant architectural guidance

**Complexity Level**: Light Application (multiple features with basic state)
  - Multi-step workflow with state management for projects, prompt templates, and architectural plans without requiring user accounts or complex backend infrastructure

## Essential Features

### Project Creation & Management
- **Functionality**: Create, edit, and organize AI application projects with metadata (name, description, category, tech stack)
- **Purpose**: Provides structured context for all downstream prompt generation and architectural planning
- **Trigger**: User clicks "New Project" button or selects existing project from sidebar
- **Progression**: Click New Project → Enter project details form → AI suggests improvements → Save → Project appears in sidebar
- **Success criteria**: Projects persist between sessions, can be selected/edited, and maintain associated prompts/plans

### AI Prompt Generator
- **Functionality**: Generate optimized prompts for various AI tasks (code generation, architecture design, testing, documentation) with best practices built-in
- **Trigger**: User selects "Generate Prompt" within a project context
- **Progression**: Select prompt type → Fill in context fields → AI generates structured prompt → User refines → Copy to clipboard
- **Success criteria**: Generated prompts follow best practices, include proper context, and produce better AI outputs than ad-hoc prompts

### Architecture Planner
- **Functionality**: Create detailed technical architecture plans including system design, data models, API specifications, and component hierarchy
- **Trigger**: User clicks "Plan Architecture" for a project
- **Progression**: Input requirements → AI analyzes and generates architecture → Interactive visualization → Export as markdown/diagram
- **Success criteria**: Produces comprehensive, technically sound architecture documents that developers can immediately act on

### Template Library
- **Functionality**: Pre-built templates for common AI application patterns (chatbot, code assistant, content generator, data analyzer)
- **Purpose**: Accelerate planning by starting from proven patterns rather than blank slate
- **Trigger**: User selects "Use Template" when creating new project
- **Progression**: Browse templates → Preview template → Customize for specific needs → Generate project with pre-filled structure
- **Success criteria**: Templates save 60%+ of planning time and include all essential components for each pattern

### Export & Integration
- **Functionality**: Export complete specifications in multiple formats (Markdown, JSON, PDF-ready) with proper formatting
- **Purpose**: Enables seamless handoff to development teams and integration with other tools
- **Trigger**: User clicks export button from any completed plan
- **Progression**: Select export format → Configure options → Generate file → Download or copy to clipboard
- **Success criteria**: Exported files are properly formatted and immediately usable in development workflows

## Edge Case Handling
- **Empty States**: Guide users with examples and suggestions when no projects exist yet
- **Long-Running AI Calls**: Show progress indicators and allow cancellation for lengthy generation tasks
- **Invalid Inputs**: Validate required fields with inline feedback before allowing generation
- **Browser Refresh**: Persist all work-in-progress using KV storage to prevent data loss
- **Offline Mode**: Cache last AI responses and show clear messaging when connectivity is lost

## Design Direction
The design should feel cutting-edge and professional—like a tool used by senior architects at leading tech companies. A rich but uncluttered interface serves the complex functionality, with progressive disclosure keeping power features accessible without overwhelming new users.

## Color Selection
Triadic color scheme creating visual distinction between different functional areas while maintaining professional cohesion

- **Primary Color**: Deep indigo `oklch(0.35 0.15 270)` - Represents intelligence, depth, and technical sophistication
- **Secondary Colors**: Steel blue `oklch(0.55 0.12 240)` for supporting UI elements and muted sections
- **Accent Color**: Vibrant cyan `oklch(0.70 0.15 200)` - Energetic highlight for CTAs, active states, and AI-generated content
- **Foreground/Background Pairings**:
  - Background (White `oklch(0.98 0 0)`): Dark indigo text `oklch(0.20 0.08 270)` - Ratio 12.5:1 ✓
  - Card (Light gray `oklch(0.96 0.005 270)`): Primary text `oklch(0.20 0.08 270)` - Ratio 11.8:1 ✓
  - Primary (Deep indigo `oklch(0.35 0.15 270)`): White text `oklch(0.98 0 0)` - Ratio 8.2:1 ✓
  - Secondary (Steel blue `oklch(0.55 0.12 240)`): White text `oklch(0.98 0 0)` - Ratio 4.8:1 ✓
  - Accent (Vibrant cyan `oklch(0.70 0.15 200)`): Dark text `oklch(0.20 0.08 270)` - Ratio 7.5:1 ✓
  - Muted (Light lavender `oklch(0.92 0.02 270)`): Muted text `oklch(0.45 0.08 270)` - Ratio 5.2:1 ✓

## Font Selection
Typography should convey precision and modernity appropriate for technical documentation while remaining highly readable for extended work sessions

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight letter-spacing/-0.02em
  - H2 (Section Header): Inter SemiBold/24px/normal letter-spacing
  - H3 (Subsection): Inter Medium/18px/normal letter-spacing
  - Body (Content): Inter Regular/15px/relaxed line-height/1.6
  - Caption (Metadata): Inter Regular/13px/text-muted-foreground
  - Code (Technical): JetBrains Mono Regular/14px/line-height/1.5

## Animations
Purposeful micro-interactions reinforce the feeling of an intelligent, responsive system—subtle enough for professional use but present enough to feel modern and alive

- **Purposeful Meaning**: Smooth transitions communicate AI "thinking" states, while quick snaps confirm user actions
- **Hierarchy of Movement**:
  - Critical: AI generation states with gentle pulse animations (500ms)
  - Important: Page transitions and modal appearances with slide-fade (300ms)
  - Supportive: Button hovers and selection highlights with quick color transitions (150ms)
  - Ambient: Subtle gradient shifts in backgrounds suggesting ongoing intelligence (2000ms loop)

## Component Selection
- **Components**:
  - Sidebar: Project navigation with collapsible sections
  - Card: Container for prompts, plans, and templates with subtle shadows
  - Dialog: Modal forms for creating/editing projects and configurations
  - Tabs: Switch between different views (Prompts, Architecture, Export)
  - Textarea: Multi-line inputs for requirements and context with auto-resize
  - Select: Dropdown for template types, tech stacks, and export formats
  - Badge: Tag categories, status indicators, and tech stack labels
  - Button: Primary actions with loading states during AI generation
  - Accordion: Collapsible sections in architecture plans for better organization
  - Scroll Area: Handle long content in sidebars and plan outputs
  
- **Customizations**:
  - Custom Monaco-style code editor component for viewing generated prompts with syntax highlighting
  - Visual architecture diagram component using D3 for interactive system visualization
  - AI thinking indicator with animated gradient progress bar
  
- **States**:
  - Buttons: Distinct hover with scale(1.02), active with scale(0.98), loading with spinner, disabled with reduced opacity
  - Inputs: Focus with accent border and subtle glow, error with destructive border, success with accent checkmark
  - Cards: Hover with elevated shadow, selected with accent border and background tint
  
- **Icon Selection**:
  - Lightbulb for prompt generation
  - Tree Structure for architecture planning
  - Stack for tech stack selection
  - Copy for clipboard actions
  - Download for exports
  - Plus for creating new items
  - File for projects
  
- **Spacing**:
  - Page padding: p-6 (24px) on desktop, p-4 (16px) on mobile
  - Card padding: p-6 for content cards, p-4 for list items
  - Section gaps: gap-6 for major sections, gap-4 for related items, gap-2 for tight groupings
  - Form fields: gap-4 between fields, gap-2 between label and input
  
- **Mobile**:
  - Sidebar collapses to bottom sheet drawer on mobile
  - Two-column layouts stack vertically on mobile
  - Reduced padding (p-4 → p-3) and text sizes for better mobile density
  - Touch-friendly button sizes (min-h-11) and increased tap targets
  - Sticky headers for long scrolling content
