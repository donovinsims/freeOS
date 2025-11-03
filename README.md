# freeOS - Free iOS & macOS Apps Directory

A curated directory of genuinely free iOS and macOS apps – a searchable, filterable website that solves the problem of wasted research time.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/donovins/freeOS?utm_source=oss&utm_medium=github&utm_campaign=donovins%2FfreeOS&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

## Features

- 🎨 **7 Categories**: Design, Development, Productivity, Security, Automation, Communication, Utilities
- 🔍 **Search & Filter**: Search by name, description, tags. Filter by platform (iOS/macOS/Web) and source
- ✅ **Verified Apps**: Every app is personally verified to be genuinely free
- 🌙 **Dark Mode**: Full dark mode support
- 📱 **Responsive**: Mobile-first design that works on all devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Airtable (API integration)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn
- Airtable account and API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/donovins/freeOS.git
cd freeOS
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Airtable credentials:
```
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=Apps
```

4. Set up Airtable:
   - Create a new Airtable base
   - Create a table named "Apps" (or update `AIRTABLE_TABLE_NAME` in `.env.local`)
   - Add the following fields to your table:
     - App Name (Single line text)
     - Slug (Single line text)
     - Icon (Attachment)
     - Short Description (Long text)
     - Full Description (Long text)
     - Category (Single select: design, development, productivity, security, automation, communication, utilities)
     - Platform (Multiple select: iOS, macOS, Web)
     - Primary URL (URL)
     - URL Type (Single select: App Store, GitHub, Website, Direct Download)
     - Tags (Multiple select)
     - Installation Notes (Long text)
     - Last Verified (Date)
     - Verified By (Single line text)
     - Quality Score (Number)
     - Featured (Checkbox)
     - Status (Single select: Published, Pending Review, Archived)
     - Submitter Email (Email)
     - Submitter Name (Single line text)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
freeOS/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── submit/            # Submit app page
│   ├── search/            # Search results page
│   ├── apps/[slug]/       # App detail pages
│   └── [category]/        # Category pages
├── components/            # React components
│   ├── ui/               # UI components
│   └── forms/            # Form components
├── lib/                  # Utilities and helpers
│   ├── airtable.ts       # Airtable client
│   ├── search.ts         # Search/filter logic
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS and global styles
└── public/               # Static assets
```

## Adding Sample Apps

To add 10-20 sample apps across all categories to your Airtable base:

1. Make sure your `.env.local` file is configured with your Airtable credentials
2. Run the sample apps script:
```bash
npm run add-sample-apps
```

This will add curated sample apps including:
- Design: Figma, GIMP, Photopea
- Development: VS Code, iTerm2, Postman
- Productivity: Obsidian, TickTick, Logseq
- Security: Bitwarden, ProtonVPN
- Automation: Rectangle, Raycast, Maccy
- Communication: Signal, Discord
- Utilities: VLC, ImageOptim, HandBrake

Alternatively, you can:
- Use the Airtable UI to manually add apps
- Use the Submit App form on the website (apps will be in "Pending Review" status)

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

The site will automatically deploy on every push to the main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
