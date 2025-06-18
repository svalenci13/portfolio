# Sebastian Valencia - Portfolio

A modern, minimalist portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🎨 **Modern Design**: Clean, minimalist aesthetic inspired by dris.one
- ⚡ **Next.js 15**: Latest React framework with App Router
- 🎯 **TypeScript**: Full type safety
- 🎨 **Tailwind CSS**: Utility-first styling
- 🧩 **shadcn/ui**: Beautiful, accessible components
- 📱 **Responsive**: Mobile-first design
- ✨ **Animations**: Smooth interactions and micro-animations
- 🚀 **Performance**: Optimized for speed and Core Web Vitals

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter (body), JetBrains Mono (headings), Playfair Display (logo)
- **Deployment**: Vercel

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/             # shadcn/ui components
│   ├── blinking-dot.tsx
│   ├── work-experience.tsx
│   └── project-list.tsx
└── lib/
    └── utils.ts        # Utility functions
```

## Customization

### Personal Information
Update the personal details in `src/app/page.tsx`:
- Name and introduction
- Work experience in `src/components/work-experience.tsx`
- Projects in `src/components/project-list.tsx`
- Contact links in the header

### Styling
- Colors and theme: `tailwind.config.ts`
- Global styles: `src/app/globals.css`
- Component-specific styles: Tailwind classes in components

### Adding Components
Use shadcn/ui to add new components:
```bash
npx shadcn@latest add [component-name]
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Performance

This portfolio is optimized for:
- ⚡ Fast loading times
- 📱 Mobile performance
- 🔍 SEO optimization
- ♿ Accessibility standards

## License

MIT License - feel free to use this as a template for your own portfolio!

---

Built with ❤️ using modern web technologies
