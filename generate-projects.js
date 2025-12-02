const fs = require('fs');
const path = require('path');

const WORK_DIR = './work';
const OUTPUT_FILE = './work/projects.json';

// Get all directories in the work folder
function getProjectFolders() {
    try {
        const items = fs.readdirSync(WORK_DIR, { withFileTypes: true });
        return items
            .filter(item => item.isDirectory())
            .map(item => item.name);
    } catch (error) {
        console.error('Error reading work directory:', error);
        return [];
    }
}

// Get all images from a project folder
function getProjectImages(folderName) {
    const folderPath = path.join(WORK_DIR, folderName);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

    try {
        const files = fs.readdirSync(folderPath);
        return files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        }).sort();
    } catch (error) {
        console.error(`Error reading folder ${folderName}:`, error);
        return [];
    }
}

// Generate projects JSON
function generateProjectsJSON() {
    const folders = getProjectFolders();
    const projects = folders.map(folderName => ({
        name: folderName,
        images: getProjectImages(folderName)
    })).filter(project => project.images.length > 0);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
    console.log(`Generated ${OUTPUT_FILE} with ${projects.length} project(s)`);
    projects.forEach(project => {
        console.log(`  - ${project.name}: ${project.images.length} image(s)`);
    });
}

generateProjectsJSON();
