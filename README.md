# Team Leo Das — Free Fire MAX squad site
Next.js 15 + Supabase. Deploys on Vercel.

## 1. Supabase
1. Create a project at supabase.com.
2. SQL Editor → paste `supabase/schema.sql` → Run (creates tables, security rules, and the public `media` storage bucket).
3. Project Settings → API: copy the Project URL, the publishable/anon key, and the service_role key.

## 2. Run locally
```
cp .env.example .env.local   # fill in the 3 Supabase values (ADMIN_PASSWORD defaults to love)
npm install
npm run dev
```

## 3. GitHub → Vercel
1. Push this folder to a new GitHub repo.
2. vercel.com → Add New Project → import the repo.
3. Add the 4 environment variables from `.env.example` (SUPABASE_SERVICE_ROLE_KEY and ADMIN_PASSWORD are server-only — do not prefix with NEXT_PUBLIC).
4. Deploy.

## 4. Add your media
Open `https://YOUR-SITE/admin` (no link to it exists on the public site), enter the password, and upload intro voice, music, videos, member images, moments, vault items and your WhatsApp links. Placeholders on the public site tell you what goes where.
Supabase free plan limits each upload to 50 MB — compress long videos.

## Notes
- Intro timing: `lib/config.ts` → `INTRO` (seconds).
- Change the admin password with the `ADMIN_PASSWORD` env var. A 4-letter password is easy to guess; use something longer when you can.
