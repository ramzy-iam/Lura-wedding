# 💍 Lura Wedding - Interactive Wedding Website

An elegant and modern website created to celebrate a special wedding, offering an immersive experience for guests with interactive features and responsive design.

## 🌐 Live Application

**Visit the site:** [https://lura-wedding.vercel.app](https://lura-wedding.vercel.app)

## ✨ Features

- **🎨 Modern Design**: Elegant and responsive user interface
- **📱 Mobile-First**: Optimized for all devices
- **🖼️ Photo Gallery**: Photo collection with interactive zoom
- **💬 Comments Section**: Guests can leave messages
- **📅 Agenda**: Detailed event schedule
- **👗 Dress Code**: Visual guide for outfits
- **🌸 Smooth Animations**: Enhanced user experience
- **🔒 Moderation**: Comment validation system
- **⚡ Performance**: Fast loading with Next.js 15

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom components with Shadcn/ui
- **Images**: Optimization with react-medium-image-zoom
- **Animations**: Custom CSS transitions

## 📦 Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd lura-wedding
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment configuration**

```bash
cp .env.example .env.local
```

4. **Configure the database**

```bash
# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate deploy
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗂️ Project Structure

```
src/
├── app/                 # Next.js App Router pages and routes
├── components/          # Reusable React components
│   ├── sections/        # Main site sections
│   ├── forms/          # Interactive forms
│   ├── ui/             # Base UI components
│   └── comments/       # Comments system
├── hooks/              # Custom hooks
├── lib/                # Utilities and configurations
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## 🎨 Site Sections

- **Hero**: Homepage with main image
- **Garden**: Venue presentation
- **History**: Couple's story
- **Agenda**: Day's schedule
- **Outfits**: Clothing suggestions
- **Dress Code**: Detailed guide
- **Gallery**: Couple's photos
- **Comments**: Guest messages
- **Contact**: Practical information

## 🚀 Available Scripts

```bash
npm run dev          # Start in development mode
npm run build        # Build for production
npm run start        # Start in production mode
npm run lint         # Check code with ESLint
```

## 📱 Responsive Design

The site is fully responsive and optimized for:

- 📱 Mobile (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔧 Customization

The site can be easily customized by modifying:

- Data in `src/components/sections/data/`
- Images in `public/images/`
- Colors in `src/app/globals.css`
- Section content in `src/components/sections/`

## 🌟 Performance

- ⚡ **Core Web Vitals** optimized
- 🖼️ **Images** optimized with Next.js Image
- 📦 **Bundle** optimized with code splitting
- 🔄 **Smart cache** for static resources

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is under private license for the Lura Wedding event.

---

💝 _Created with love to celebrate a unique moment_ 💝
