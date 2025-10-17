# Planning Guide

A simple, focused tool for generating optimized AI prompts using AI itself.

**Experience Qualities**:
1. **Simple** - Clean, minimal interface with a single clear purpose
2. **Fast** - Quick generation with immediate copy-to-clipboard functionality
3. **Intelligent** - AI-powered prompt optimization for better results

**Complexity Level**: Micro Tool (single-purpose)
  - Single-page application focused exclusively on prompt generation with no complex state management

## Essential Features

### AI Prompt Generation
- **Functionality**: Takes user's request description and prompt type (code, architecture, testing, etc.) and uses AI to generate an optimized, well-structured prompt
- **Purpose**: Helps users create better prompts for AI assistants, resulting in higher quality outputs
- **Trigger**: User enters context and clicks "Generate Prompt"
- **Progression**: Select prompt type → Enter description → Click generate → AI creates optimized prompt → Copy to clipboard
- **Success criteria**: Generated prompts are comprehensive, well-structured, and produce better AI results than user's original description

## Edge Case Handling
- **Empty Input**: Disable generate button and show validation error if context is empty
- **Long Generation**: Show loading state during AI processing
- **Copy Failures**: Handle clipboard API errors gracefully with toast notifications
- **Network Issues**: Display clear error messages when AI calls fail

## Design Direction
The design should feel modern and minimal—a clean, focused tool that gets out of the way and lets users accomplish one thing perfectly. Minimal interface serves the single purpose without distractions.

## Color Selection
Triadic color scheme with vibrant accent creating visual interest while maintaining professionalism

- **Primary Color**: Deep indigo `oklch(0.35 0.15 270)` - Intelligence and technical sophistication
- **Secondary Colors**: Steel blue `oklch(0.55 0.12 240)` for card backgrounds
- **Accent Color**: Vibrant cyan `oklch(0.70 0.15 200)` - Energetic highlight for CTAs and AI elements
- **Foreground/Background Pairings**:
  - Background (White `oklch(0.98 0 0)`): Dark indigo text `oklch(0.20 0.08 270)` - Ratio 12.5:1 ✓
  - Card (Light gray `oklch(0.96 0.005 270)`): Primary text `oklch(0.20 0.08 270)` - Ratio 11.8:1 ✓
  - Primary (Deep indigo `oklch(0.35 0.15 270)`): White text `oklch(0.98 0 0)` - Ratio 8.2:1 ✓
  - Accent (Vibrant cyan `oklch(0.70 0.15 200)`): Dark text `oklch(0.20 0.08 270)` - Ratio 7.5:1 ✓

## Font Selection
Inter for its excellent readability and modern feel, JetBrains Mono for code/technical content

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/36px/tight tracking/-0.02em
  - H2 (Card Title): Inter SemiBold/20px/normal
  - Body (Content): Inter Regular/15px/line-height/1.6
  - Caption (Helper text): Inter Regular/14px/text-muted-foreground
  - Code (Generated prompts): JetBrains Mono Regular/14px/line-height/1.5

## Animations
Subtle, purposeful animations that feel modern without being distracting

- **Purposeful Meaning**: Gentle pulse during AI generation, smooth transitions for state changes
- **Hierarchy of Movement**:
  - AI generation: Pulse glow animation (2000ms)
  - Button interactions: Quick hover/press states (150ms)
  - Toast notifications: Slide in/out (300ms)

## Component Selection
- **Components**:
  - Card: Container for main interface with subtle shadows
  - Select: Dropdown for prompt type selection
  - Textarea: Large multi-line input for context
  - Button: Primary action with loading states
  - Toast: Notifications for success/error feedback
  
- **States**:
  - Buttons: Hover with subtle scale, disabled with reduced opacity, loading with pulse animation
  - Textarea: Focus with accent border glow
  - Generated output: Copy button with check confirmation state
  
- **Icon Selection**:
  - Sparkle for branding/title
  - Lightbulb for prompt generation
  - Copy for clipboard action
  - Check for confirmation
  
- **Spacing**:
  - Container: max-w-3xl centered with p-4 padding
  - Card padding: p-6 for content
  - Form gaps: gap-6 between major sections, gap-2 between labels and inputs
  
- **Mobile**:
  - Single column layout works naturally on mobile
  - Reduced text sizes and padding for mobile (p-3)
  - Touch-friendly button sizes (min-h-11)
