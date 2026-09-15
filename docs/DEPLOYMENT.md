# GitHub Pages & Production Deployment

1. Set `VITE_SITE_URL` and Supabase keys in GitHub Secrets or `.env`.
2. Push to `main` branch to trigger `.github/workflows/deploy.yml`.
3. Output directory is `dist/` configured with SPA routing redirect support.
