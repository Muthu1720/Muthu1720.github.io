# Muthu Kumar S - Cybersecurity Portfolio

A modern, cyberpunk-themed portfolio website showcasing cybersecurity expertise, projects, and certifications.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Cyberpunk Theme**: Modern tech aesthetic with purple/cyan accents
- **Interactive Projects**: Expandable project cards with detailed information
- **Certificate Viewer**: PDF certificates with zoom functionality (non-downloadable)
- **Easy Updates**: JSON-based configuration for quick content updates
- **Smooth Animations**: Professional transitions and effects
- **Fast Loading**: Optimized for performance

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling
├── js/
│   └── script.js          # Interactive features
├── images/
│   └── profile.jpg        # Your profile photo (add yours)
├── certificates/
│   ├── CEH_Certificate.pdf
│   ├── Advanced_Diploma_Cyber_Security.pdf
│   └── HSCCSP_Certificate.pdf
├── data/
│   ├── projects.json      # Project data (easy to update)
│   └── certificates.json  # Certificate data (easy to update)
├── resume/
│   └── Muthu_Kumar_S_Resume.pdf
└── README.md              # This file
```

## 🛠️ Setup Instructions

### 1. Add Your Files

#### Profile Image
1. Add your profile photo to `images/` folder
2. Name it `profile.jpg` or update line 164 in `index.html`
3. Recommended size: 350x350 pixels or larger (square ratio)

#### Resume
1. Add your resume PDF to `resume/` folder
2. Name it `Muthu_Kumar_S_Resume.pdf` or update the filename in `js/script.js` (line 254)

#### Certificates
1. Add your certificate PDFs to `certificates/` folder
2. Name them exactly as specified in `data/certificates.json`:
   - `CEH_Certificate.pdf`
   - `Advanced_Diploma_Cyber_Security.pdf`
   - `HSCCSP_Certificate.pdf`

### 2. Customize Content

#### To Add a New Certificate:
Edit `data/certificates.json`:
```json
{
  "name": "Certificate Name",
  "issuer": "Issuing Organization",
  "date": "2025",
  "file": "Certificate_Filename.pdf"
}
```
Then add the PDF file to `certificates/` folder.

#### To Add a New Project:
Edit `data/projects.json`:
```json
{
  "title": "Project Title",
  "shortDescription": "Brief description for the card",
  "fullDescription": "Detailed description for modal",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "achievements": [
    "Achievement 1"
  ],
  "impact": "Project impact statement",
  "icon": "fas fa-icon-name"
}
```

### 3. Update Personal Information

In `index.html`, update:
- Phone number (lines appear in contact section)
- Email address
- GitHub URL (already set to: https://github.com/Muthu1720)
- LinkedIn URL (already set to: https://www.linkedin.com/in/muthu-kumar-s-b36751224)
- Location

## 🌐 Deployment to GitHub Pages

### Step 1: Create GitHub Repository
```bash
# Navigate to your portfolio folder
cd portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"
```

### Step 2: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `Muthu1720.github.io` (must match your username)
3. Make it Public
4. Click "Create repository"

### Step 3: Push to GitHub
```bash
# Add remote
git remote add origin https://github.com/Muthu1720/Muthu1720.github.io.git

# Push
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Your site will be live at: `https://muthu1720.github.io`

## 🔄 Making Updates

### To Update Projects:
1. Edit `data/projects.json`
2. Commit and push:
```bash
git add data/projects.json
git commit -m "Updated projects"
git push
```

### To Add New Certificates:
1. Add PDF to `certificates/` folder
2. Edit `data/certificates.json`
3. Commit and push:
```bash
git add certificates/ data/certificates.json
git commit -m "Added new certificate"
git push
```

### To Update Resume:
1. Replace PDF in `resume/` folder
2. Commit and push:
```bash
git add resume/
git commit -m "Updated resume"
git push
```

## 🎨 Customization

### Change Colors:
Edit CSS variables in `css/style.css` (lines 1-12):
```css
:root {
    --primary-color: #00f5ff;      /* Cyan */
    --secondary-color: #ff00ff;     /* Magenta */
    --accent-color: #7b2cbf;        /* Purple */
    --bg-dark: #0a0a0f;            /* Background */
}
```

### Change Fonts:
Update the font-family in `css/style.css` (line 22)

## 📱 Testing Locally

1. Open `index.html` in a web browser
2. For full functionality, use a local server:

**Option 1 - Python:**
```bash
cd portfolio
python -m http.server 8000
```
Open: http://localhost:8000

**Option 2 - VS Code:**
Install "Live Server" extension and click "Go Live"

## ✅ Checklist Before Going Live

- [ ] Added profile photo
- [ ] Added resume PDF
- [ ] Added all certificate PDFs
- [ ] Updated personal information (email, phone, links)
- [ ] Tested all links
- [ ] Checked mobile responsiveness
- [ ] Verified certificates open correctly
- [ ] Tested resume download
- [ ] Reviewed all project descriptions
- [ ] Tested on different browsers

## 🐛 Troubleshooting

**Certificates not loading?**
- Check that PDF filenames in `data/certificates.json` match actual files
- Ensure PDFs are in `certificates/` folder
- Check browser console for errors

**Profile image not showing?**
- Check filename matches in `index.html`
- Ensure image is in `images/` folder
- Try clearing browser cache

**Projects not appearing?**
- Check `data/projects.json` for syntax errors
- Open browser console to see errors
- Ensure JSON is valid (use JSONLint.com to validate)

## 📞 Support

For issues or questions:
- Check browser console for errors (F12)
- Validate JSON files at jsonlint.com
- Ensure all file paths are correct

## 🔒 Security Notes

- Certificates are viewable but not downloadable (protected)
- Resume is downloadable (as intended)
- No backend required - fully static site
- HTTPS enabled automatically via GitHub Pages

## 📈 Future Enhancements

Ideas for future improvements:
- Add blog section for writeups
- Integrate with TryHackMe API for stats
- Add dark/light theme toggle
- Implement contact form with Formspree
- Add more animations and transitions

---

**Created by:** Muthu Kumar S  
**Theme:** Cyberpunk Tech  
**Last Updated:** 2025

Good luck with your portfolio! 🚀🔒
