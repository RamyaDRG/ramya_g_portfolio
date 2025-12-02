# Adding Work Projects to Your Portfolio

This guide explains how to add your work projects to the portfolio website.

## Quick Start

1. **Create a folder** in the `work` directory with your project name
2. **Add images** to that folder
3. **Run the generation script**: `node generate-projects.js`
4. **Refresh** your browser to see the changes

## Detailed Steps

### Step 1: Create Project Folders

Navigate to the `work` directory and create folders for your projects. The folder name will become the project title on your website.

```bash
cd work
mkdir "Oracle-ERP-Dashboard"
mkdir "Financial-Reporting"
mkdir "BI-Analytics"
```

**Naming Tips:**
- Use hyphens (`-`) or underscores (`_`) for spaces
- Example: `oracle-erp-dashboard` displays as "Oracle Erp Dashboard"
- Example: `financial_reporting` displays as "Financial Reporting"

### Step 2: Add Images to Your Folders

Add your project screenshots/images to each folder. Supported formats:
- JPG/JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- WEBP (`.webp`)
- SVG (`.svg`)

```bash
# Example: Copy images to your project folder
cp ~/Desktop/my-screenshots/*.png work/Oracle-ERP-Dashboard/
cp ~/Documents/bi-images/*.jpg work/BI-Analytics/
```

**Image Tips:**
- The **first image** (alphabetically) will be used as the thumbnail
- Use numbered prefixes to control order: `01-overview.jpg`, `02-details.jpg`
- Compress large images for faster web loading
- Recommended size: 1200px width or smaller

### Step 3: Generate Projects JSON

From the portfolio root directory, run:

```bash
node generate-projects.js
```

**What this does:**
- Scans all folders in the `work` directory
- Finds all image files in each folder
- Creates/updates `work/projects.json` with the project data
- Only includes folders that have at least one image

**Expected Output:**
```
Generated ./work/projects.json with 3 project(s)
  - Oracle-ERP-Dashboard: 5 image(s)
  - Financial-Reporting: 3 image(s)
  - BI-Analytics: 8 image(s)
```

### Step 4: View Your Portfolio

Open `index.html` in a browser using a local web server:

**Option 1: Python**
```bash
python -m http.server 8000
```

**Option 2: Node.js**
```bash
npx serve
```

**Option 3: VS Code Live Server**
- Install the "Live Server" extension
- Right-click `index.html` and select "Open with Live Server"

Then navigate to `http://localhost:8000` (or the port shown)

## Project Structure Example

```
work/
├── projects.json                 # Auto-generated, don't edit manually
├── Oracle-ERP-Dashboard/
│   ├── 01-main-dashboard.png
│   ├── 02-analytics-view.png
│   └── 03-reports.png
├── Financial-Reporting/
│   ├── overview.jpg
│   ├── detailed-report.jpg
│   └── summary.jpg
└── BI-Analytics/
    ├── dashboard-1.png
    ├── dashboard-2.png
    └── kpi-metrics.png
```

## Troubleshooting

### Projects not showing up?

**Check 1:** Do your folders have images?
```bash
ls -la work/YourProjectName/
```
Empty folders won't appear. Add at least one image.

**Check 2:** Did you run the generation script?
```bash
node generate-projects.js
```

**Check 3:** Check the `projects.json` file
```bash
cat work/projects.json
```
It should contain your project data.

**Check 4:** Hard refresh your browser
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Images not loading?

- Check file extensions (must be: .jpg, .jpeg, .png, .gif, .webp, .svg)
- Check file names (avoid spaces, use hyphens or underscores)
- Verify images are in the correct folder
- Check browser console for errors (F12)

### Project titles look wrong?

The folder name is converted to a title:
- `my-project` → "My Project"
- `oracle_erp_dashboard` → "Oracle Erp Dashboard"
- `BI-Analytics-2024` → "Bi Analytics 2024"

Rename your folder and run `node generate-projects.js` again.

## Updating Projects

### Add New Projects
1. Create new folder
2. Add images
3. Run `node generate-projects.js`

### Update Existing Projects
1. Add/remove images from the folder
2. Run `node generate-projects.js`

### Remove Projects
1. Delete the folder from `work/`
2. Run `node generate-projects.js`

## Tips

- **Organize by date:** Use prefixes like `2024-01-ProjectName`
- **Thumbnail control:** The first image alphabetically is the thumbnail, so use `00-thumbnail.jpg` to control which image shows first
- **Keep it organized:** Use consistent naming across all projects
- **Regular updates:** Run the generation script after any changes to the work folder

## Automation (Optional)

You can add the generation script to your workflow:

**Create a npm script** in `package.json`:
```json
{
  "scripts": {
    "update-work": "node generate-projects.js"
  }
}
```

Then run: `npm run update-work`

## Need Help?

- Check the main [README.md](../README.md) for general portfolio information
- Review the `generate-projects.js` script to understand how it works
- Check the browser console (F12) for JavaScript errors
