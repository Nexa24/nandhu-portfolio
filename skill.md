---
version: alpha
name: Folira Lite (copy) – Framer
description: Design system extracted from https://framer.com/projects/Folira-Lite-copy--xj1lzeQJjstovzVwGpqy-gFeQi?node=p1b4fbjCC&view=preview
colors:
  text-primary: "#ffffff"
  text-secondary: "#999999"
  text-tertiary: "#0099ff"
  surface-base: "#000000"
  surface-muted: "#1f1f1f"
  surface-raised: "#171717"
  surface-strong: "#2e2e2e"
typography:
  xs:
    fontFamily: Inter Variable UI
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xs: 8px
spacing:
  1: 1px
  2: 7px
  3: 10px
  4: 20px
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.text-primary}"
    rounded: 8px
    padding: 12px
---

# Folira Lite (copy) – Framer

## Mission
Create implementation-ready, token-driven UI guidance for Folira Lite (copy) – Framer that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

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

## Overview

A clean, functional, implementation-oriented interface designed for Folira Lite (copy) – Framer.

**Target Audience:** authenticated users and operators

**Product Surface:** dashboard web app

This design system prioritizes accessibility, consistency, and implementation efficiency. All components follow WCAG 2.2 AA standards with keyboard-first interactions and clear focus indicators.

## Colors

The color palette is organized into semantic categories for consistent application across the interface.

**Text Colors:**
- **text.primary** (`#ffffff`): Primary text and headlines
- **text.secondary** (`#999999`): Secondary text and captions
- **text.tertiary** (`#0099ff`): Tertiary text and metadata

**Surface Colors:**
- **surface.base** (`#000000`): Base background surface
- **surface.muted** (`#1f1f1f`): Semantic color token
- **surface.raised** (`#171717`): Elevated surface elements
- **surface.strong** (`#2e2e2e`): Semantic color token

## Typography

**Primary Font:** Inter Variable UI

The typography scale provides a consistent hierarchy for all text elements.

- **xs** (`12px`): Weight 400, Line height 1.5


## Layout

The layout system uses a consistent spacing scale for margins, padding, and gaps.

**Spacing Scale:**
- **1:** 1px
- **2:** 7px
- **3:** 10px
- **4:** 20px

**Grid System:** Use a responsive grid with consistent gutters and margins. Mobile layouts should stack vertically with appropriate spacing.

## Elevation & Depth

Elevation is achieved through subtle shadows and tonal layers.

**Recommended approach:**
- Use minimal shadows for depth
- Prefer tonal backgrounds over heavy shadows
- Maintain clear visual hierarchy through layering

## Shapes

All interactive elements use consistent corner radii:

- **xs:** 8px - Corner radius token


## Components

**Detected Components:** buttons (16), inputs (5)

### Component Guidelines

**Buttons:**
- Use primary style for main actions
- Secondary style for alternative actions
- Maintain minimum 44×44px touch target
- Include default, hover, focus-visible, active, disabled, loading, and error states

**Inputs:**
- Clear focus indicators required
- Label positioning must be consistent
- Error states with descriptive messages
- Support for keyboard navigation

**Cards:**
- Consistent padding and spacing
- Optional elevation for hierarchy
- Responsive behavior for different viewports

All components must define:
- Default, hover, focus-visible, active, disabled, loading, and error states
- Keyboard interaction patterns
- Touch target sizes (minimum 44×44px)
- Responsive behavior
- Accessibility requirements

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required
- Contrast constraints required (4.5:1 for normal text, 3:1 for large text)
- Touch targets minimum 44×44px
- Screen reader compatibility with proper ARIA labels

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error
- Component behavior should specify responsive and edge-case handling
- Interactive components must document keyboard, pointer, and touch behavior
- Accessibility acceptance criteria must be testable in implementation
- Maintain WCAG AA contrast ratios
- Provide clear focus indicators for all interactive elements

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators
- Do not introduce one-off spacing or typography exceptions
- Do not use ambiguous labels or non-descriptive actions
- Do not ship component guidance without explicit state rules
- Do not mix different corner radius values in the same component
- Do not create touch targets smaller than 44×44px
- Do not use color alone to convey information

## Guideline Authoring Workflow
1. Restate design intent in one sentence
2. Define foundations and semantic tokens
3. Define component anatomy, variants, interactions, and state behavior
4. Add accessibility acceptance criteria with pass/fail checks
5. Add anti-patterns, migration notes, and edge-case handling
6. End with a QA checklist

## Required Output Structure
- Context and goals
- Design tokens and foundations (YAML front matter + descriptions)
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
- Every non-negotiable rule must use "must"
- Every recommendation should use "should"
- Every accessibility rule must be testable in implementation
- Teams should prefer system consistency over local visual exceptions

---

**Extraction Metadata:**
- Source: https://framer.com/projects/Folira-Lite-copy--xj1lzeQJjstovzVwGpqy-gFeQi?node=p1b4fbjCC&view=preview
- Extracted: 2026-10-13T12:18:04.250Z
- Elements sampled: 12 of 803

# Folira Lite (copy) – Framer

## Overview

**Product:** Folira Lite (copy) – Framer
**URL:** https://framer.com/projects/Folira-Lite-copy--xj1lzeQJjstovzVwGpqy-gFeQi?node=p1b4fbjCC&view=preview
**Surface type:** marketing
**Audience:** Business decision-makers and potential customers
**Brand character:** Conversion-focused marketing presence with a rich, diverse color palette and a complementary two-font typographic system.

> **Note:** Surface detection confidence is low. Verify the inferred audience and brand context before relying on this file.

### Design Principles

- Consistency over novelty — reuse existing patterns before inventing new ones.
- Token-driven — every visual decision references a token, not a magic number.
- Accessible by default — compliance is a baseline, not a feature.

## Colors

| Token | Value | Role |
|-------|-------|------|
| color-2 | `#888888` | Text Secondary |
| color-4 | `#999999` | Text Secondary |
| color-3 | `#0099FF` | Accent |
| color-1 | `#1F1F1F` | Background Dark |
| color-5 | `#FFFFFF` | Text Light |

## Typography

**Font stack:** Inter Variable UI, Times

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 9px | Captions, metadata |
| text-sm | 12px | Labels, secondary text |
| text-base | 16px | Body text (default) |

**Weight scale:** 400 · 450 · 550
**Line heights:** 12px · 30px · 10px

## Spacing

**Base unit:** 4px

`space-1: 1px` · `space-2: 5px` · `space-3: 7px` · `space-4: 8px` · `space-5: 10px` · `space-6: 20px` · `space-7: 50px` · `space-8: 89px` · `space-9: 218px` · `space-10: 444px`

## Shapes

**Border radius:** `radius-sm: 5px` · `radius-md: 8px` · `radius-lg: 10px` · `radius-full: 9999px`

## Elevation

_None detected._

## Motion

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

## Components

- **Buttons:** 16 detected
- **Inputs:** 5 detected
- **Forms:** 1 detected
- **Images:** 36 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (5px, 8px, 10px, 9999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 16 detected
- **Inputs:** 5 detected
- **Forms:** 1 detected
- **Images:** 36 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.