# Gear Vault Project Specifications

## Problem (Core Idea)

**What problem are we solving ?**

I have a lot of things that I can't keep track of.
I spend too much time looking for them.
I sometimes forget stuff for some activities because I can't find them or I forgot I had them.

Gear Vault will list everything I own so I have a better idea of the things I have.

Have a better idea of where my stuff is.

Have a list of the things I need depending on the activity.

## Users

**Who is this for ?**

- **Me**:
  It's a personal app

- **Bela**:
  It can help her too

- **Elanor**:
  She won't use the app but we have lots of things that belongs to her

The vault can be extended to things
belonging to someone else.

## Features

**What does MVP need ?**

Here is a list of features for Gear Vault.

A. List of items

B. Create, update, delete item

C. **Filter**: category, location, 
subcategory

D. Item should have a name, picture, icon, 
category, brand, quantity, location

E. **Search**

F. **Authentication**

- Email/password

G. Other features

- Dark mode
- View collections (categories)

Needs to be a PWA (Progressive Web App) so it can be used offline and on mobile

## Data

**What are we storing ?**

This is a rough mockup of what the data will look like. This is not set in stone:

**USER**

- ID
- Name

**ITEM**

- name
- category
- subcategory
- description
- picture
- icon
- quantity
- brand
- price/value
- location
- condition
- owners

## Tech stack

**What stack are we using ?**

- Framework Next.js latest / React latest
- SSR pages with dynamic components.
- API routes for backend needs (storing items, file uploads, AI calls)
- One codebase/repo for less overhead
- TypeScript for type safety

## Monetize

**How will this make money ?**

=> NOT SURE YET

## UI/UX

**How this should look and feel ?**

Try to make it feel like the Ghost Recon Breakpoint game.

**General**

- Modern, minimal, developer-focused
- Dark mode by default, light mode optional
- Clean typography, generous whitespace
- Subtle borders and shadows
- Reference: Notion, Linear, Raycast
- Syntax highlighting for codeblocks

**Layout**

- Sidebar + main content (collapsible sidebar)
- Sidebar: Item types with links to items (Snippets, commands, etc), latest collections
- Main: Grid of color coded collection cards based on the items they hold the most of (background color). Items display under collections in color coded cards (border color)
- Individual items open in a quick to access drawer

**Type Colors & Icons**

- Snippet Color: #3b82f6 (blue)
- Snippet Icon: Code
- Prompt Color: #8b5cf6 (purple)
- Prompt Icon: Sparkles
- Command Color: #f97316 (orange)
- Command Icon: Terminal
- Note Color: #fde047 (yellow)
- Note Icon: StickyNote
- File Color: #6b7280 (gray)
- File Icon: File
- Image Color: #ec4899 (pink)
- Image Icon: Image
- Link Color: #10b981 (emerald)
- Link Icon: Link

**Responsive**

- Desktop-first but mobile usable
- Sidebar becomes drawer on mobile

**Micro-interactions:**

- Smooth transitions
- Hover states on cards
- Toast notifications for actions
- Loading skeletons

## Document - Docs and context