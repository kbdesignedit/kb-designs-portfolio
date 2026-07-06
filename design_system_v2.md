# KB Designs: High-End Editorial Design System

## 1. Typography Strategy (The "Creative Fabrica" Approach)
The core of this aesthetic relies on extreme contrast and intentional layering. We will use three distinct typefaces to create a premium, custom-branded feel.

*   **Primary Headline (The "Badass Professional"):** `Kingdom` (Serif). Used in ALL CAPS for massive, authoritative headlines. It provides the structure and high-end editorial feel.
*   **Signature Accent (The "Down to Earth / Fun"):** `RanessaScript` or `camelia-beauty`. Used sparingly as an overlapping accent layer. It breaks the grid, adds warmth, and feels like a personal signature.
*   **Body Copy (The "Clean Foundation"):** `Hailey` (Sans-serif). Clean, highly legible, and modern. It grounds the design and ensures readability.

**Implementation Rule:** Headlines will often feature a massive `Kingdom` word with a smaller `RanessaScript` word overlapping it, creating a layered, custom-logo effect for section headers.

## 2. Color Palette (Boho-Southern-Moody)
Moving away from stark black and white to a richer, earthier palette that feels grounded but edgy.

*   **Base Background (Light):** `#F4F0EA` (Warm Alabaster) - Replaces stark white. Feels organic and soft.
*   **Base Background (Dark):** `#23211F` (Smoked Onyx) - Replaces pure black. A deep, warm charcoal that feels moody and sophisticated.
*   **Primary Accent:** `#8C6239` (Aged Leather) - A rich, southern cognac brown used for buttons, badges, and key highlights.
*   **Secondary Accent:** `#C2A878` (Desert Sand) - A lighter, muted gold for subtle borders, secondary text, and background textures.
*   **Text Primary (on Light):** `#1A1816` (Deep Espresso)
*   **Text Primary (on Dark):** `#F4F0EA` (Warm Alabaster)

## 3. Layout & Grid Strategy (Editorial Asymmetry)
We will abandon the standard "centered box" web layout in favor of an editorial, magazine-style grid.

*   **The Grid:** A 12-column CSS Grid system.
*   **Asymmetry:** Elements will intentionally span uneven columns (e.g., an image spanning columns 2-7, with text spanning columns 6-11) to create dynamic tension.
*   **Layering:** Images and text blocks will overlap. We will use negative margins and absolute positioning to break elements out of their containers.
*   **Whitespace:** Massive, intentional whitespace (padding) between sections to let the dense, layered compositions breathe.

## 4. Image Strategy
Images must support the "moody-boho" vibe.

*   **Hero:** A layered typographic composition. No single dominant image. Instead, we might use a subtle, moody texture or a very abstract, cropped image element.
*   **About:** `portrait-southern.jpg` (The warm, clay-wall portrait). It perfectly captures the confident, down-to-earth, southern aesthetic.
*   **Editorial Strip:** A collage of `lifestyle-western.jpg` and `katlyn-laughing.jpg`, overlapping each other rather than sitting in a neat row.

## 5. Micro-Interactions
*   **Smooth Reveals:** Elements fade and slide up gently as they enter the viewport.
*   **Hover States:** Images will have a subtle scale effect; buttons will feature a sophisticated color fill transition rather than a simple color swap.
