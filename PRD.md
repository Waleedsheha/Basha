# Planning Guide

A simple tool that takes your rough ideas and turns them into better prompts for AI assistants.

**Experience Qualities**:
1. **Simple** - No technical jargon, just type what you want
2. **Visual** - Beautiful gradients and smooth animations that feel modern
3. **Instant** - Get improved prompts in seconds with one click

**Complexity Level**: Micro Tool (single-purpose)
  - Ultra-focused app that does one thing perfectly: improves AI prompts

## Essential Features

### Prompt Improvement
- **Functionality**: User types a simple request, AI transforms it into a better, more effective prompt
- **Purpose**: Help anyone get better results from AI assistants without needing to be a "prompt engineering expert"
- **Trigger**: User types their idea and clicks "Make it Better" or presses Cmd/Ctrl+Enter
- **Progression**: Type idea → Click button → AI improves it → Copy and use
- **Success criteria**: Generated prompts are clearer, more specific, and produce noticeably better AI results

## Edge Case Handling
- **Empty Input**: Show friendly error message and disable button
- **AI Processing**: Show engaging loading animation with "Creating magic..." message
- **Copy Action**: Give instant feedback with "Copied!" confirmation
- **Errors**: Display simple, non-technical error messages

## Design Direction
The design should feel magical and delightful—like a modern, polished tool that makes AI more accessible. Beautiful gradients, smooth animations, and clear typography create an experience that feels premium yet approachable.

## Color Selection
Vibrant gradient scheme with purple/indigo and cyan creating an energetic, modern feel

- **Primary Color**: Rich purple `oklch(0.45 0.20 270)` - Represents intelligence and creativity
- **Secondary Colors**: Deep blue `oklch(0.60 0.18 250)` for depth and variety
- **Accent Color**: Vibrant cyan `oklch(0.70 0.20 200)` - Energetic highlight for CTAs and magic moments
- **Foreground/Background Pairings**:
  - Background (Soft white `oklch(0.99 0.005 270)`): Dark text `oklch(0.20 0.08 270)` - Ratio 14:1 ✓
  - Card (Light gray `oklch(0.98 0.008 270)`): Primary text `oklch(0.20 0.08 270)` - Ratio 13:1 ✓
  - Primary (Purple `oklch(0.45 0.20 270)`): White text `oklch(0.98 0 0)` - Ratio 7.8:1 ✓
  - Accent (Cyan `oklch(0.70 0.20 200)`): Dark text `oklch(0.15 0.08 270)` - Ratio 9.2:1 ✓

## Font Selection
Inter for clarity and modern feel - easy to read, friendly, and professional

- **Typographic Hierarchy**:
  - H1 (Title): Inter Bold/48px/tight tracking with gradient
  - H2 (Section): Inter Bold/24px/normal
  - Body (Description): Inter Regular/20px for tagline, 16px for content
  - Labels: Inter Semibold/18px/normal
  - Hints: Inter Regular/14px/muted color

## Animations
Delightful, purposeful animations that create a sense of magic without being distracting

- **Purposeful Meaning**: 
  - Icon wobble on page load (welcoming)
  - Gradient background flow (alive and dynamic)
  - Pulsing opacity during AI generation (working)
  - Smooth card appearances with scale and fade (polished)
  
- **Hierarchy of Movement**:
  - Page load: Staggered fade-in with upward motion (600ms)
  - AI generation: Pulsing text animation (1500ms loop)
  - Result appearance: Fade + slide up (400ms)
  - Button interactions: Quick color transitions (150ms)

## Component Selection
- **Components**:
  - Card: Clean containers with subtle borders and shadows
  - Textarea: Large, comfortable input with focus ring
  - Button: Prominent gradient button with icon
  - Toast: Success/error notifications via Sonner
  
- **States**:
  - Button: Gradient background with opacity change on hover, disabled with lower opacity, loading with pulsing text
  - Textarea: Accent-colored focus ring (2px), smooth transition
  - Results: Gradient background container with accent border
  
- **Icon Selection**:
  - Sparkle for main branding (duotone for depth)
  - Star for input label
  - MagicWand for the action button
  - Copy for clipboard action
  - Check for confirmation
  
- **Spacing**:
  - Container: max-w-4xl centered with p-4
  - Cards: p-8 for generous breathing room
  - Sections: gap-6 between major elements, gap-3 for related items
  - Title area: mb-12 for strong separation
  
- **Mobile**:
  - Fully responsive with single column
  - Reduced title size (text-4xl → text-3xl)
  - Maintained touch-friendly button sizes (h-14)
  - Optimized spacing for smaller screens
