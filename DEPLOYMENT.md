# Deployment Guide

## Option 1: Vercel (Recommended - Free & Fast)

1. Go to https://vercel.com
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your `course-platform-nextjs` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"
7. Your live site will be available at: `https://your-project-name.vercel.app`

## Option 2: Netlify (Alternative)

1. Go to https://netlify.com
2. Drag and drop your project folder
3. Or connect your GitHub repository
4. Build command: `npm run build`
5. Publish directory: `.next`

## Option 3: GitHub Pages (Free Static Hosting)

1. In your GitHub repo, go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: /root
5. Save and wait for deployment

## Environment Variables for Production

Add these in your deployment platform:
```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Live Link After Deployment

Once deployed, your course platform will be accessible at:
- **Vercel**: `https://course-platform-nextjs.vercel.app`
- **Netlify**: `https://your-project-name.netlify.app`
- **GitHub Pages**: `https://your-username.github.io/course-platform-nextjs`

## Test URLs to Check After Deployment

- Homepage: `https://your-domain.com/`
- Course 1: `https://your-domain.com/courses/1`
- Course 2: `https://your-domain.com/courses/2`
- Course 3: `https://your-domain.com/courses/3`
- Sitemap: `https://your-domain.com/sitemap.xml`
- Robots: `https://your-domain.com/robots.txt`
