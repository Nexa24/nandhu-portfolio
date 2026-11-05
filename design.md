---
name: design-system-folira-lite-copy-framer
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards for Folira Lite (copy) – Framer. Use when creating or updating UI rules, component specifications, or design-system documentation.
version: "1.0"
tags: [design-system, ui, accessibility, tokens, folira-lite-copy-framer]
---

<!-- AI_DESIGN_TASTE_MANAGED_START -->

# Folira Lite (copy) – Framer

## Mission
Deliver implementation-ready design-system guidance for Folira Lite (copy) – Framer that ensures consistency, accessibility, and efficient implementation across dashboard web app interfaces.

## Brand
- Product/brand: Folira Lite (copy) – Framer
- URL: https://framer.com/projects/Folira-Lite-copy--xj1lzeQJjstovzVwGpqy-gFeQi?node=p1b4fbjCC&view=preview
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Inter Variable UI`, `font.family.stack=Inter Variable UI, Inter, system-ui, -apple-system, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif, emoji, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`, `font.size.base=12px`, `font.weight.base=450`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=12px`
- Color palette: `color.text.primary=#ffffff`, `color.text.secondary=#999999`, `color.text.tertiary=#0099ff`, `color.surface.base=#000000`, `color.surface.muted=#1f1f1f`, `color.surface.raised=#171717`, `color.surface.strong=#2e2e2e`
- Spacing scale: `space.1=1px`, `space.2=7px`, `space.3=10px`, `space.4=20px`
- Radius/shadow/motion tokens: `radius.xs=8px` | `motion.duration.instant=150ms`, `motion.duration.fast=200ms`

## Design Tokens

### Colors
`color.text.primary=#ffffff`, `color.text.secondary=#999999`, `color.text.tertiary=#0099ff`, `color.surface.base=#000000`, `color.surface.muted=#1f1f1f`, `color.surface.raised=#171717`, `color.surface.strong=#2e2e2e`

**Usage Guidelines:**
- Always use semantic token names, never hard-coded hex values
- Maintain WCAG 2.2 AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Define light and dark mode variants where applicable

### Typography
**Primary Font Family:** Inter Variable UI

`font.size.xs=12px`

**Typography Rules:**
- Use consistent font weights (typically 400, 500, 600)
- Maintain readable line heights (1.2 for headlines, 1.5-1.6 for body)
- Limit to 2-3 font weights per view

### Spacing
`space.1=1px`, `space.2=7px`, `space.3=10px`, `space.4=20px`

**Spacing Principles:**
- Use consistent spacing from the defined scale
- Avoid one-off spacing values
- Apply spacing tokens for margins, padding, and gaps

## Accessibility
**Target:** WCAG 2.2 AA compliance

**Required Practices:**
- Keyboard navigation support for all interactive elements
- Visible focus indicators (minimum 2px outline, high contrast)
- Touch targets minimum 44×44px
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text (18px+)
- Screen reader compatibility with proper ARIA labels
- Skip links for main content navigation
- Form inputs with associated labels

**Testing Requirements:**
- Test with keyboard only (Tab, Enter, Space, Arrow keys)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify color contrast with automated tools
- Test responsive behavior at multiple breakpoints

## Component Specifications

**Detected Components:** buttons (16), inputs (5)

### Required Component States
Every interactive component must define:
1. **default:** Initial appearance
2. **hover:** Mouse pointer over element
3. **focus-visible:** Keyboard focus indicator
4. **active:** Element being pressed/clicked
5. **disabled:** Non-interactive state
6. **loading:** Async operation in progress (where applicable)
7. **error:** Validation or error state (where applicable)

### Component Anatomy Template
For each component, specify:
- **Structure:** HTML semantic elements and hierarchy
- **Tokens:** Which design tokens apply (colors, spacing, typography, radius)
- **Variants:** Size variants (sm, md, lg) and style variants (primary, secondary, outline)
- **Behavior:** Interaction patterns and state transitions
- **Responsive:** Breakpoint-specific adjustments
- **Accessibility:** ARIA attributes, keyboard shortcuts, screen reader text

### Common Components

**Buttons:**
- Minimum 44×44px touch target
- Clear hover, focus-visible, active, and disabled states
- Loading state with spinner or text change
- Disabled state with reduced opacity (0.5-0.6)
- Variants: primary (filled), secondary (outline), tertiary (text)

**Form Inputs:**
- Associated label (visible or aria-label)
- Clear focus indicator
- Error state with descriptive message
- Placeholder text for format guidance
- Support for keyboard navigation

**Cards:**
- Consistent padding using spacing tokens
- Optional elevation for hierarchy
- Responsive width behavior
- Interactive cards need hover/focus states

**Navigation:**
- Current page indicator
- Keyboard navigation (Tab, Arrow keys)
- Mobile responsive (hamburger menu pattern)
- Skip link for main content

## Writing Tone
Professional, clear, action-oriented. Be concise and specific.

**Writing Principles:**
- Use active voice
- Be concise and specific
- Avoid jargon unless necessary
- Write for international audiences (avoid idioms)

**UI Copy Standards:**
- Button labels: Verb + noun (e.g., "Save Changes", "Delete Account")
- Error messages: Explain what happened and how to fix it
- Empty states: Explain why empty and suggest next action
- Loading states: Indicate progress and expected duration

## Rules: Do
- Use semantic design tokens exclusively
- Define all component states explicitly (default, hover, focus-visible, active, disabled, loading, error)
- Document keyboard interactions
- Include responsive behavior specifications
- Write testable accessibility criteria
- Provide code examples for complex patterns
- Version control design token changes
- Document breaking changes
- Maintain WCAG 2.2 AA contrast ratios
- Test with keyboard navigation and screen readers

## Rules: Don't
- Do not use hard-coded color values or spacing
- Do not hide focus indicators
- Do not create touch targets smaller than 44×44px
- Do not use color alone to convey information
- Do not mix different corner radius values in same component
- Do not override system tokens without documentation
- Do not ship components without accessibility review
- Do not introduce one-off spacing or typography exceptions
- Do not use ambiguous labels or non-descriptive actions

## Guideline Authoring Workflow

When creating component guidelines:

1. Define Intent: One-sentence description of component purpose
2. Specify Tokens: List all applicable design tokens
3. Document Anatomy: HTML structure and semantic elements
4. Define Variants: Size and style variations
5. Specify States: All interactive states with visual changes
6. Detail Behavior: User interactions and state transitions
7. Add Accessibility: ARIA attributes, keyboard support, screen reader text
8. Include Examples: Code snippets for common use cases
9. List Anti-patterns: Common mistakes to avoid
10. Create QA Checklist: Testable acceptance criteria

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior
- Include spacing and typography token requirements
- Include long-content, overflow, and empty-state handling
- Include known page component density: buttons (16), inputs (5)

- Extraction diagnostics: Low sample size: fewer than 30 visible elements were extracted. Limited typography variety detected; size scale may need manual refinement. Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates

Before shipping component guidelines:

- Every non-negotiable rule must use "must"
- Every recommendation should use "should"
- Every accessibility rule must be testable in implementation
- Teams should prefer system consistency over local visual exceptions
- All design tokens are defined and documented
- Component has all required states (default, hover, focus-visible, active, disabled, loading, error)
- Keyboard navigation is specified
- Touch targets meet 44×44px minimum
- Color contrast ratios verified (WCAG 2.2 AA)
- Responsive behavior documented
- ARIA attributes specified where needed
- Code examples provided
- Anti-patterns documented
- QA checklist included

## Edge Cases & Considerations

**Long Content:**
- Text truncation with ellipsis or wrapping strategy
- Scrollable regions with visible scroll indicators
- Maximum widths for readability

**Empty States:**
- Helpful messaging explaining why empty
- Clear call-to-action for next step
- Appropriate illustration or icon

**Loading States:**
- Skeleton screens for content loading
- Spinners for actions in progress
- Progress indicators for multi-step processes

**Error Handling:**
- Inline validation for forms
- Toast notifications for system errors
- Error boundaries for component failures

---

**Extraction Metadata:**
- Extracted from: https://framer.com/projects/Folira-Lite-copy--xj1lzeQJjstovzVwGpqy-gFeQi?node=p1b4fbjCC&view=preview
- Extraction date: 2026-10-13T12:17:43.920Z
- Elements analyzed: 12 of 803

<!-- AI_DESIGN_TASTE_MANAGED_END -->

---
name: design-system-folira-lite-copy-framer
description: >
  Apply the Folira Lite (copy) – Framer design system when building or updating UI.
  Use when creating components, choosing colors or typography,
  or reviewing designs for marketing interfaces.
---

# Folira Lite (copy) – Framer — Design System Skill

## When to Use

- Building new UI components for Folira Lite (copy) – Framer.
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for marketing pages.
- Checking designs against the extracted token set.

## Context

- **Product:** Folira Lite (copy) – Framer — https://framer.com/projects/Folira-Lite-copy--xj1lzeQJjstovzVwGpqy-gFeQi?node=p1b4fbjCC&view=preview
- **Surface:** marketing
- **Audience:** Business decision-makers and potential customers
- **Character:** Conversion-focused marketing presence with a rich, diverse color palette and a complementary two-font typographic system.

## Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| color-2 | `#888888` | Text Secondary |
| color-4 | `#999999` | Text Secondary |
| color-3 | `#0099FF` | Accent |
| color-1 | `#1F1F1F` | Background Dark |
| color-5 | `#FFFFFF` | Text Light |

### Typography

**Font stack:** Inter Variable UI, Times

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 9px | Captions, metadata |
| text-sm | 12px | Labels, secondary text |
| text-base | 16px | Body text (default) |

**Weight scale:** 400 · 450 · 550
**Line heights:** 12px · 30px · 10px

### Spacing

**Base unit:** 4px

`space-1: 1px` · `space-2: 5px` · `space-3: 7px` · `space-4: 8px` · `space-5: 10px` · `space-6: 20px` · `space-7: 50px` · `space-8: 89px` · `space-9: 218px` · `space-10: 444px`

### Shapes

**Border radius:** `radius-sm: 5px` · `radius-md: 8px` · `radius-lg: 10px` · `radius-full: 9999px`

### Elevation

_None detected._

### Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `color 0.1s`
- **duration-fast:** `background-color 0.15s, transform 0.12s`
- **duration-fast:** `background-color 0.15s, box-shadow 0.15s, color 0.15s`
- **duration-fast:** `background-color 0.15s, color 0.15s`
- **duration-fast:** `border-color 0.15s, background-color 0.15s`
- **duration-fast:** `fill 0.15s, stroke 0.15s, transform 0.1s`
- **duration-base:** `background-color 0.2s`
- **duration-base:** `transform 0.2s`

## Component Inventory

- **Buttons:** 16 detected
- **Inputs:** 5 detected
- **Forms:** 1 detected
- **Images:** 36 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 4px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (5px, 8px, 10px, 9999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or documenting a component for this system:

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

Component guidelines must contain, in order:

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.