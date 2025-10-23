# 🚀 RADIOLOGY LADDER GAME - DEPLOYMENT GUIDE

**For Complete Beginners - Step by Step**

Total time: 30-45 minutes

---

## 📋 WHAT YOU HAVE

You should have already created:
- ✅ Vercel account (signed up with GitHub)
- ✅ Supabase account (signed up with GitHub)
- ✅ GitHub account (created when you signed up for Vercel)
- ✅ All your 16 renamed images ready

---

## 🎯 DEPLOYMENT STEPS OVERVIEW

1. Upload code to GitHub (10 min)
2. Set up Supabase database (10 min)
3. Upload your images to Supabase (5 min)
4. Deploy to Vercel (10 min)
5. Test your game! (5 min)

---

## STEP 1: UPLOAD CODE TO GITHUB

### A. Download This Entire Project Folder
1. You should have a folder called `radladder-game` with all the code files
2. Make sure you have this complete folder on your computer

### B. Go to GitHub
1. Open your browser and go to: https://github.com
2. Click the **"+"** button in the top right
3. Click **"New repository"**

### C. Create New Repository
1. **Repository name:** `radladder-game`
2. **Description:** (optional) "Radiology training game"
3. **Public or Private:** Choose **Public** (easier for now)
4. **DO NOT** check "Add a README file"
5. Click **"Create repository"**

### D. Upload Your Code
**On the next screen, you'll see instructions. Follow "uploading an existing file":**

1. Click **"uploading an existing file"** (it's a link in the text)
2. Drag your ENTIRE `radladder-game` folder into the upload area
   - Or click "choose your files" and select everything in the folder
3. Wait for all files to upload (may take 1-2 minutes)
4. Scroll down and click **"Commit changes"**

**✅ Done! Your code is now on GitHub!**

---

## STEP 2: SET UP SUPABASE DATABASE

### A. Go to Your Supabase Project
1. Go to: https://app.supabase.com
2. Click on your project (you created this earlier)

### B. Create the Database Tables
1. On the left sidebar, click **"SQL Editor"**
2. Click **"New query"**
3. Open the file `database/schema.sql` from your project folder
4. Copy ALL the text from that file
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** at the bottom
7. You should see "Success" and "Database schema created successfully!"

**✅ Database tables created!**

### C. Get Your Supabase Credentials
You need two pieces of information:

1. On the left sidebar, click **"Project Settings"** (gear icon)
2. Click **"API"** in the settings menu
3. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string of letters/numbers)

**IMPORTANT: Copy both of these! You'll need them soon!**

Write them down or keep this tab open.

---

## STEP 3: UPLOAD YOUR IMAGES TO SUPABASE

### A. Create Storage Bucket
1. In Supabase, click **"Storage"** on the left sidebar
2. Click **"New bucket"**
3. **Name:** `question-images`
4. **Public bucket:** Check this box (✅)
5. Click **"Create bucket"**

### B. Upload Your 16 Images
1. Click on the `question-images` bucket you just created
2. Click **"Upload file"**
3. Select ALL 16 of your renamed images
4. Click **"Upload"**
5. Wait for all images to upload

### C. Get Image URLs and Update SQL
Now you need to update the insert_questions.sql file with your actual image URLs.

1. In Storage, click on one of your images
2. At the top, you'll see a URL that looks like:
   `https://xxxxx.supabase.co/storage/v1/object/public/question-images/croup_steeple_sign.png`
3. Copy everything EXCEPT the filename at the end. You want:
   `https://xxxxx.supabase.co/storage/v1/object/public/question-images/`
4. Open `database/insert_questions.sql` in a text editor
5. Find every instance of `YOUR_SUPABASE_URL` and replace it with your URL
   - Should be about 8 replacements (one per question)
6. Save the file

### D. Insert Your Questions
1. Go back to Supabase SQL Editor
2. Click **"New query"**
3. Copy ALL the text from your UPDATED `database/insert_questions.sql` file
4. Paste it into the SQL Editor
5. Click **"Run"**
6. You should see "8" as the total_questions count

**✅ All 8 questions loaded into database!**

---

## STEP 4: DEPLOY TO VERCEL

### A. Connect Vercel to GitHub
1. Go to: https://vercel.com
2. Click **"Add New"** → **"Project"**
3. You'll see "Import Git Repository"
4. Find `radladder-game` in your repositories
5. Click **"Import"**

### B. Configure Environment Variables
**This is important!** You need to tell Vercel your Supabase credentials.

1. On the configuration screen, find **"Environment Variables"**
2. Add these two variables:

**Variable 1:**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** Paste your Supabase Project URL (from Step 2C)

**Variable 2:**
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** Paste your Supabase anon public key (from Step 2C)

3. Make sure both are added, then scroll down

### C. Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes while Vercel builds your game
3. You'll see "Building..." then "Deploying..." then "Success!"

**✅ Your game is LIVE!**

### D. Get Your Game URL
1. After deployment, you'll see your game URL (looks like: `https://radladder-game-xxxxx.vercel.app`)
2. Click on it to open your game!

**🎉 TEST YOUR GAME! 🎉**

---

## STEP 5: TEST YOUR GAME

### A. Quick Test
1. Click "Start Game"
2. Enter a name
3. Try answering a question
4. Make sure images load
5. Make sure the timer works
6. Try the lifelines

### B. If Something Doesn't Work

**Images not loading?**
- Check that your image URLs in the SQL are correct
- Make sure the Storage bucket is public
- Try clicking on an image in Supabase Storage and copying its URL

**Game won't start?**
- Check that your environment variables in Vercel are correct
- Make sure you copied the FULL URL and key (no spaces)
- Redeploy: Go to Vercel → Deployments → Click "..." → "Redeploy"

**Database errors?**
- Make sure you ran BOTH SQL files (schema.sql AND insert_questions.sql)
- Check the SQL Editor for any error messages

---

## 🎊 YOU'RE DONE!

### Your game is live at your Vercel URL!

**Share it with your residents:**
1. Copy your Vercel URL
2. Post it in Synapse chat
3. Send via email/text
4. They just click and play!

### Next Steps:
- Test with 2-3 residents first
- Get feedback
- Add more questions later if you want
- Celebrate! 🎉

---

## 📞 TROUBLESHOOTING

### "Build Failed" on Vercel
- Check that you uploaded ALL files to GitHub (especially package.json)
- Make sure environment variables are set correctly

### "Cannot connect to database"
- Verify your VITE_SUPABASE_URL is correct
- Verify your VITE_SUPABASE_ANON_KEY is correct
- Make sure there are no extra spaces

### "No questions loading"
- Verify you ran insert_questions.sql
- Check that image URLs are correct (no YOUR_SUPABASE_URL remaining)
- Go to Supabase → Table Editor → questions → verify 8 rows exist

### Game loads but images broken
- Check Storage bucket is public
- Verify image filenames match exactly (case-sensitive!)
- Try accessing an image URL directly in your browser

---

## 🎯 QUICK REFERENCE

**Your URLs:**
- Game: `https://your-game.vercel.app`
- GitHub: `https://github.com/yourusername/radladder-game`
- Supabase: `https://app.supabase.com/project/your-project`
- Vercel: `https://vercel.com/your-username/radladder-game`

**To Update the Game Later:**
1. Make changes to files locally
2. Upload changed files to GitHub (same way as before)
3. Vercel will automatically redeploy!

---

**Congratulations! Your game is live! 🚀🎮**
