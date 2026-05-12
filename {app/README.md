# TrueLak Recruitment Agency — Website

## Tech Stack
- **Frontend + Backend**: Next.js 14 (App Router)
- **Database**: MongoDB Atlas (free tier)
- **Hosting**: Vercel (free tier)
- **File Storage**: Local `/public/uploads` (development) → upgrade to Cloudinary for production

---

## 🚀 Setup Guide (Step by Step)

### Step 1: Set Up MongoDB Atlas (Free)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **free cluster** (M0 — no credit card needed)
3. Create a **Database User** (username + password — save these!)
4. Under **Network Access**, click "Add IP Address" → select "Allow Access from Anywhere" (`0.0.0.0/0`)
5. Click "Connect" on your cluster → "Connect your application"
6. Copy the connection string — it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
   ```
7. Replace `<password>` with your actual password and add `truelak` as the database name:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/truelak?retryWrites=true&w=majority
   ```

### Step 2: Set Up the Project Locally

```bash
# Install dependencies
npm install

# Copy the env file and fill it in
cp .env.local .env.local.backup
# Edit .env.local with your MongoDB URI and WhatsApp number
```

Your `.env.local` should look like:
```
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/truelak?retryWrites=true&w=majority
NEXT_PUBLIC_WHATSAPP_NUMBER=254712345678
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PASSWORD=choose_a_strong_password_here
```

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 3: Add Your Logo

1. Place your logo file in `/public/images/logo.png`
2. In `components/Navbar.js`, find the comment `{/* Replace with <Image... */}` and uncomment the Image tag
3. Do the same in `components/Footer.js` if desired

### Step 4: Update Contact Details

Search for these placeholders and replace with real info:
- `+254 700 000 000` → your real phone number
- `info@truelak.co.ke` → your real email
- `254700000000` in `.env.local` → your WhatsApp number (no + sign)
- The Google Maps embed in `app/contact/page.js` → update with your real address

### Step 5: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial TrueLak website"
   git remote add origin https://github.com/yourusername/truelak.git
   git push -u origin main
   ```

2. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → import your `truelak` repo
4. Add Environment Variables (from your `.env.local`):
   - `MONGODB_URI`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel URL after first deploy)
   - `ADMIN_PASSWORD`
5. Click Deploy!

### Step 6: Access the Admin Panel

Go to `https://your-site.vercel.app/admin/jobs`

Login with your `ADMIN_PASSWORD` from `.env.local`

From the admin panel you can:
- ✅ Post new job listings
- ✅ Activate / Deactivate jobs
- ✅ Delete jobs
- ✅ View all CV applications (with download links)
- ✅ View all employer enquiries

---

## 📁 Project Structure

```
truelak/
├── app/
│   ├── page.js              # Homepage
│   ├── about/               # About Us page
│   ├── services/            # Services page
│   ├── jobs/                # Job listings + individual job pages
│   ├── employers/           # For Employers page + enquiry form
│   ├── candidates/          # For Job Seekers + CV upload
│   ├── contact/             # Contact page
│   ├── admin/jobs/          # Admin panel (password protected)
│   └── api/                 # Backend API routes
│       ├── jobs/            # CRUD for job listings
│       ├── applications/    # CV submissions
│       ├── employers/       # Employer enquiries
│       └── contact/         # Contact messages
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── WhatsAppButton.js
│   └── JobCard.js
├── lib/
│   ├── mongodb.js           # DB connection
│   └── models.js            # Job, Application, Employer models
└── public/
    ├── images/              # Put your logo here
    └── uploads/             # CV files (development only)
```

---

## 🔒 Production Upgrade: CV File Storage

For production, CV files should not be stored in `/public/uploads`. 

**Recommended: Cloudinary (free tier)**
1. Sign up at cloudinary.com
2. Install: `npm install cloudinary`
3. Update `app/api/applications/route.js` to upload to Cloudinary instead of local disk
4. Store the returned Cloudinary URL in the database

---

## ❓ Hostpinnacle Note

Your Hostpinnacle Starter shared hosting **cannot run Node.js**. However, you can still use it for:
- Hosting your **domain name** (point DNS to Vercel)
- **Business email** (e.g. info@truelak.co.ke) via cPanel webmail

Your website runs on **Vercel** and your data lives in **MongoDB Atlas** — both free.
