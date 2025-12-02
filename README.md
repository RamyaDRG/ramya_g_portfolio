# Ramya G Deekonda - Portfolio Website

A professional portfolio website showcasing Oracle Cloud ERP Analytics expertise and project work.

## Features

- Clean, modern neomorphic design
- Responsive layout (mobile-friendly)
- Dynamic work gallery that automatically loads projects from folders
- Modal view for project images
- Smooth scrolling navigation
- Profile image with LinkedIn integration

## Project Structure

```
ramya_g_portfolio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript for dynamic content
├── generate-projects.js # Script to generate projects.json
├── profile.jpg         # Your profile picture
├── docs/               # Documentation folder
│   └── adding-work-projects.md # Detailed guide for adding projects
├── work/               # Your work projects folder
│   ├── projects.json   # Auto-generated project list (git ignored)
│   ├── project-name-1/ # Example project folder
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   └── project-name-2/
│       └── ...
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Documentation

For detailed instructions on adding work projects, see [docs/adding-work-projects.md](docs/adding-work-projects.md)

## Quick Start: Adding Your Work

### Step 1: Create Project Folders

In the `work` directory, create a new folder for each project. The folder name will be used as the project title (with formatting):

- Hyphens and underscores will be replaced with spaces
- Words will be capitalized

Examples:
- Folder: `oracle-erp-dashboard` → Title: "Oracle Erp Dashboard"
- Folder: `financial_reporting` → Title: "Financial Reporting"
- Folder: `analytics_implementation` → Title: "Analytics Implementation"

### Step 2: Add Images

Place your project images inside each folder. Supported formats:
- JPG/JPEG
- PNG
- GIF
- WEBP
- SVG

### Step 3: Generate Projects JSON

After adding your folders and images, run the generation script:

```bash
node generate-projects.js
```

This will scan the `work` directory and create/update `work/projects.json` with your project information.

### Step 4: View Your Portfolio

Open `index.html` in a web browser to view your portfolio. For best results, use a local web server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (npx):**
```bash
npx serve
```

**Using VS Code:**
Install the "Live Server" extension and click "Go Live"

Then open your browser to `http://localhost:8000` (or the port shown)

## Customization

### Update Personal Information

Edit [index.html](index.html) to update:
- Your contact email (search for `your.email@example.com`)
- About section content
- Skills list
- Any other personal details

### Change Colors

Edit [styles.css](styles.css) and modify the CSS variables at the top:

```css
:root {
    --primary-color: #2c3e50;    /* Main dark color */
    --secondary-color: #e74c3c;  /* Accent red */
    --accent-color: #3498db;     /* Accent blue */
    --text-color: #333;          /* Text color */
    --light-bg: #f8f9fa;         /* Light background */
}
```

### Modify Layout

The work grid layout can be adjusted in [styles.css](styles.css):

```css
.work-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}
```

Change `300px` to make cards wider or narrower.

## Example: Adding a Project

1. Create a folder in `work/`:
   ```bash
   mkdir work/oracle-cloud-dashboard
   ```

2. Add images:
   ```bash
   cp ~/my-screenshots/*.png work/oracle-cloud-dashboard/
   ```

3. Generate the project list:
   ```bash
   node generate-projects.js
   ```

4. Refresh your browser to see the new project

## Tips

- Use descriptive folder names that reflect your project
- Add multiple images to show different aspects of your work
- The first image in each folder will be used as the thumbnail
- Images are sorted alphabetically, so you can prefix with numbers to control order (e.g., `01-overview.jpg`, `02-details.jpg`)
- Keep image file sizes reasonable for web loading (compress if needed)

## Browser Compatibility

This portfolio works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

## License

© 2024 Ramya G Deekonda. All rights reserved.
