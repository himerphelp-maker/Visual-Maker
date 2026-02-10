# VisualMaker - Deployment Guide

This guide covers how to deploy the VisualMaker application to production using either **Vercel** or **Netlify**.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment with Vercel](#deployment-with-vercel)
3. [Deployment with Netlify](#deployment-with-netlify)
4. [Post-Deployment Verification](#post-deployment-verification)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- **Git repository**: Your code must be pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- **Node.js**: Version 18+ installed locally
- **Package Manager**: pnpm installed (`npm install -g pnpm`)
- **Account**: A Vercel or Netlify account (both offer free tiers)

### Pre-deployment Checklist

```bash
# 1. Build locally to verify everything works
pnpm install
pnpm build

# 2. Test the build output
pnpm start

# 3. Commit and push changes to your repository
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## Deployment with Vercel

### Option 1: Using Vercel Dashboard (Recommended for Beginners)

#### Step 1: Connect Your Repository

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Vercel to access your repositories
5. Select the repository containing VisualMaker

#### Step 2: Configure Project Settings

Vercel should auto-detect that this is a **Node.js project**. Verify these settings:

- **Framework Preset**: Select "Vite" or "Other" (Vite is automatically detected)
- **Root Directory**: Leave empty (or set to `.` if needed)
- **Build Command**: `pnpm build`
- **Output Directory**: `dist` (Vercel will auto-detect this)
- **Install Command**: `pnpm install`

#### Step 3: Environment Variables (if needed)

If your app uses environment variables:

1. Click **"Environment Variables"** in the project settings
2. Add any required variables (e.g., API endpoints, tokens)
3. For VisualMaker, no special environment variables are required unless you're adding backend features

#### Step 4: Deploy

1. Click **"Deploy"** button
2. Vercel will start the build process
3. Once complete, you'll see a success message with your deployment URL
4. Your app is now live at `https://your-project-name.vercel.app`

### Option 2: Using Vercel CLI (For Advanced Users)

#### Installation

```bash
npm install -g vercel
```

#### Deployment Steps

```bash
# 1. Login to Vercel
vercel login

# 2. Navigate to your project directory
cd path/to/VisualMaker

# 3. Deploy (interactive setup on first run)
vercel

# 4. For production deployment
vercel --prod
```

#### First-time Setup with CLI

When you run `vercel` for the first time, you'll be prompted:

```
? Set up and deploy "~/path/to/VisualMaker"? [Y/n] y
? Which scope do you want to deploy to? (your-username)
? Link to existing project? [y/N] n
? What's your project's name? visualmaker
? In which directory is your code located? ./
? Want to modify these settings? [y/N] n
```

---

## Deployment with Netlify

### Option 1: Using Netlify Dashboard (Recommended)

#### Step 1: Connect Your Repository

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select the VisualMaker repository

#### Step 2: Build Settings

Netlify will detect your build settings. Verify:

- **Owner**: Your account name
- **Branch to deploy**: `main` (or your default branch)
- **Build command**: `pnpm build`
- **Publish directory**: `dist`

If settings are incorrect, you can edit them before deploying.

#### Step 3: Environment Variables (Optional)

1. Click **"Site settings"** → **"Build & deploy"** → **"Environment**
2. Add any environment variables if needed
3. For VisualMaker, no special variables are required

#### Step 4: Deploy

1. Click **"Deploy site"**
2. Netlify will start building and deploying
3. Once complete, you'll receive a URL like `https://visualmaker-abc123.netlify.app`
4. Your site is now live!

### Option 2: Using Netlify CLI

#### Installation

```bash
npm install -g netlify-cli
```

#### Deployment Steps

```bash
# 1. Login to Netlify
netlify login

# 2. Navigate to your project
cd path/to/VisualMaker

# 3. Initialize Netlify (first time only)
netlify init

# This will prompt you to:
# - Choose "Create & configure a new site"
# - Select your team
# - Enter a site name
# - Confirm build settings

# 4. Deploy
netlify deploy --prod
```

#### Connecting an Existing Netlify Site

If you already have a Netlify site:

```bash
# Link to existing site
netlify link

# Select your site from the list
# Then deploy
netlify deploy --prod
```

---

## Post-Deployment Verification

### 1. Test the Live Application

- Open your deployment URL in a browser
- Verify all features work:
  - [ ] Text input in the editor
  - [ ] Real-time diagram rendering
  - [ ] Diagram type switching works
  - [ ] Copy button works
  - [ ] Download as PNG works
  - [ ] Reset button works
  - [ ] All 6 diagram types render correctly

### 2. Check Build Logs

**Vercel**:
- Dashboard → Your Project → "Deployments" tab
- Click the latest deployment to view logs

**Netlify**:
- Site dashboard → "Deploys" tab
- Click a deployment to see build and deploy logs

### 3. Monitor Performance

**Vercel Analytics**:
- Dashboard → Project → "Analytics" tab
- View Web Vitals and performance metrics

**Netlify Analytics**:
- Site dashboard → "Analytics" tab
- View visitor data and performance

---

## Automatic Deployments

Both platforms support automatic deployments when you push to your repository.

### Vercel - Auto Deployment

- **Main branch**: Automatically deployed to production
- **Pull Requests**: Create preview deployments
- **Other branches**: Can create preview deployments if configured

### Netlify - Auto Deployment

- **Primary branch** (main/master): Auto-deploys to production
- **Pull Requests**: Creates preview deploys
- **Branch deploys**: Can enable for other branches in settings

---

## Custom Domain Setup

### Vercel Custom Domain

1. Go to project settings → "Domains"
2. Click "Add Domain"
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Verify domain ownership
6. DNS changes may take 24-48 hours to propagate

### Netlify Custom Domain

1. Site settings → "Domain management"
2. Click "Add custom domain"
3. Enter your domain
4. Confirm you own the domain
5. Update your DNS records (instructions provided)
6. Verify custom domain is connected

---

## Environment-Specific Deployment

### Preview Deployments

Both Vercel and Netlify create preview deployments for pull requests, allowing you to:

- Test changes before merging
- Share previews with collaborators
- Review performance impact

Preview URLs are automatically posted on pull requests.

### Staging Deployment

To create a staging environment:

**Vercel**:
```bash
vercel --target production
# or create a separate project for staging
```

**Netlify**:
1. Create a new site for staging
2. Connect it to a `staging` branch
3. Deploy different branches to different sites

---

## CI/CD Best Practices

### 1. Pre-deployment Checks

Both platforms support running tests before deployment:

```bash
# Add to your build process
pnpm typecheck && pnpm test && pnpm build
```

### 2. Environment Variables Management

- Never commit `.env` files
- Use platform-specific environment variable UI
- Reference `.env.example` for required variables

### 3. Rollback Strategy

**Vercel**: Click a previous deployment and select "Redeploy"
**Netlify**: Click a previous deploy and select "Publish deploy"

---

## Troubleshooting

### Issue: Build Fails with "pnpm not found"

**Vercel**:
1. Go to project settings
2. Under "Build & Development Settings"
3. Set Node.js Version to 18.x or higher
4. Ensure "Install Command" is `pnpm install`

**Netlify**:
1. Site settings → Build & deploy → Build environment
2. Set Node version to 18 or higher in environment variables:
   ```
   Node: 18
   ```

### Issue: Diagram Not Rendering

- Check browser console for errors
- Verify mermaid library is loaded
- Clear browser cache and reload
- Check if JavaScript is enabled

### Issue: Download PNG Not Working

This may occur if:
- Browser has restricted canvas access
- CORS issues with html2canvas
- Large diagrams exceeding memory limits

**Solution**:
- Try a different browser
- Use smaller diagrams
- Check browser console for specific errors

### Issue: Slow Build Times

**Causes**:
- Large dependency tree
- Slow internet connection
- Platform resource constraints

**Solutions**:
- Clear platform cache and rebuild
- Optimize dependencies (`pnpm prune`)
- Check network connectivity
- Upgrade plan for faster builds

### Issue: 404 Errors on Refresh

This can happen with SPAs if the server isn't configured to fallback to index.html.

**Vercel**: Auto-configured for SPAs ✓
**Netlify**: Add `_redirects` file:

```
/* /index.html 200
```

Or use `netlify.toml` (already in project):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Monitoring and Maintenance

### Enable Deployment Notifications

**Vercel**:
- Project settings → "Notifications"
- Configure Slack, email, or webhook notifications

**Netlify**:
- Site settings → "Notifications"
- Set up build notifications via email or integrations

### Regular Updates

```bash
# Check for outdated packages
pnpm outdated

# Update to latest versions
pnpm update

# Commit and push
git add package.json pnpm-lock.yaml
git commit -m "Update dependencies"
git push
```

---

## Scaling and Performance

### Vercel Scaling

- Automatic serverless scaling
- No configuration needed
- Pay-as-you-go for high-volume sites
- Premium plans offer better performance

### Netlify Scaling

- Automatic CDN distribution
- Included in all plans
- Premium plans offer priority support
- Add Edge Functions for custom logic

---

## Cost Considerations

| Platform | Free Tier | Pro Tier |
|----------|-----------|----------|
| **Vercel** | ∞ requests | $20/month |
| **Netlify** | ∞ build minutes | $19/month |

VisualMaker is lightweight and will fit comfortably in both free tiers for most use cases.

---

## Summary

| Task | Vercel | Netlify |
|------|--------|---------|
| Quick Setup | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Custom Domain | Easy | Easy |
| Preview Deploys | Yes | Yes |
| Build Speed | Fast | Fast |
| Free Tier | Generous | Generous |

Both platforms are excellent choices. **Pick Vercel** if you prefer the dashboard experience, or **Netlify** if you like CLI tools.

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Mermaid.js Documentation](https://mermaid.js.org)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

---

## Support

If you encounter deployment issues:

1. Check the build logs on your platform's dashboard
2. Review this troubleshooting section
3. Visit platform documentation
4. Create an issue on your repository

Happy deploying! 🚀
