# Refactor: Project Structure

This branch focuses on reorganizing the project structure to improve maintainability, readability, and scalability.

---

# Purpose of This Branch

The original project structure contained all files in a single directory which made it difficult to manage as the project grew.

This refactor introduces a modular structure separating:

- HTML files
- CSS styles
- JavaScript scripts
- Media assets

---

# Updated Folder Structure
type-tutor/
│
├── index.html
│
├── css/
│ └── style.css
│
├── js/
│ └── script.js
│
├── assets/
│ ├── audio/
│ │ └── bgm.mp3
│ │
│ └── images/
│
└── README.md


---

# Changes Implemented

- Organized project into modular folders
- Updated navigation paths
- Improved maintainability of static assets
- Prepared codebase for future feature additions

---

# Refactor Workflow
Original Structure
│
▼
Single Directory
│
▼
Refactor Process
│
├── Create folders
├── Move assets
├── Update file paths
│
▼
Modular Structure

---

# Example Path Fix

Old path:
src="bgm.mp3"

Updated path:
src="assets/audio/bgm.mp3"


---

# Benefits of Refactoring

- Cleaner project organization
- Easier debugging
- Improved scalability
- Better collaboration for team members

---

# Testing After Refactor

After restructuring the project, the following checks were performed:

- Navigation links verified
- Media paths validated
- JavaScript functionality tested

---

# Known Issues

The mute/unmute functionality for background music is still under development and requires further debugging.

---

# Next Steps

- Fix mute toggle functionality
- Improve audio playback handling
- Add typing analytics feature
