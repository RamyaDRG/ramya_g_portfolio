// Configuration
const WORK_FOLDER = 'work';

// Function to load work projects from the work directory
async function loadWorkProjects() {
    const workGrid = document.getElementById('work-grid');
    const noWorkMessage = document.getElementById('no-work-message');

    try {
        // Fetch the list of folders in the work directory
        const response = await fetch(`${WORK_FOLDER}/projects.json`);

        if (!response.ok) {
            throw new Error('Projects file not found');
        }

        const projects = await response.json();

        if (projects.length === 0) {
            noWorkMessage.style.display = 'block';
            return;
        }

        noWorkMessage.style.display = 'none';

        // Create work items for each project
        projects.forEach(project => {
            const workItem = createWorkItem(project);
            workGrid.appendChild(workItem);
        });

    } catch (error) {
        console.log('No projects found yet. Add folders to the work directory.');
        noWorkMessage.style.display = 'block';
    }
}

// Create a work item element
function createWorkItem(project) {
    const workItem = document.createElement('div');
    workItem.className = 'work-item';

    // Format folder name to title (replace hyphens/underscores with spaces, capitalize)
    const title = formatFolderName(project.name);

    // Get the first image as thumbnail
    const thumbnailUrl = project.images && project.images.length > 0
        ? `${WORK_FOLDER}/${project.name}/${project.images[0]}`
        : 'placeholder.jpg';

    workItem.innerHTML = `
        <img src="${thumbnailUrl}" alt="${title}" class="work-item-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22250%22%3E%3Crect width=%22300%22 height=%22250%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2218%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E'">
        <div class="work-item-content">
            <h3 class="work-item-title">${title}</h3>
            <p class="work-item-count">${project.images ? project.images.length : 0} image${project.images && project.images.length !== 1 ? 's' : ''}</p>
        </div>
    `;

    // Add click handler to show project details
    workItem.addEventListener('click', () => showProjectModal(project));

    return workItem;
}

// Format folder name to readable title
function formatFolderName(folderName) {
    return folderName
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Show project modal with all images
function showProjectModal(project) {
    const title = formatFolderName(project.name);

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>${title}</h2>
            <div class="modal-gallery">
                ${project.images ? project.images.map(img => `
                    <img src="${WORK_FOLDER}/${project.name}/${img}" alt="${title}" class="modal-image">
                `).join('') : '<p>No images available</p>'}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Add modal styles dynamically if not already present
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal {
                display: block;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.8);
                animation: fadeIn 0.3s;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .modal-content {
                background-color: #fff;
                margin: 2% auto;
                padding: 2rem;
                border-radius: 10px;
                max-width: 1000px;
                position: relative;
                animation: slideIn 0.3s;
            }

            @keyframes slideIn {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .modal-close {
                position: absolute;
                right: 1.5rem;
                top: 1rem;
                font-size: 2rem;
                font-weight: bold;
                color: #999;
                cursor: pointer;
                transition: color 0.3s;
            }

            .modal-close:hover {
                color: #333;
            }

            .modal-content h2 {
                margin-bottom: 1.5rem;
                color: var(--primary-color);
            }

            .modal-gallery {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1rem;
                max-height: 70vh;
                overflow-y: auto;
            }

            .modal-image {
                width: 100%;
                height: 250px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                transition: transform 0.3s;
            }

            .modal-image:hover {
                transform: scale(1.05);
            }

            @media (max-width: 768px) {
                .modal-content {
                    margin: 10% 10px;
                    padding: 1rem;
                }

                .modal-gallery {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadWorkProjects();
});
