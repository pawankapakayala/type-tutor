# Refactor: Project Structure (Updated Asset Organization)

This branch focuses on **reorganizing and correcting the internal structure of the Type Tutor application** to improve maintainability, readability, and scalability.

The goal of this refactor is to **transform the earlier modular structure into a cleaner and more organized architecture**, while also **fixing incorrect file paths and separating assets into dedicated folders** such as audio, images, and icons.

This update ensures that the project follows **standard frontend project organization practices**, making it easier for developers to navigate, maintain, and scale the application.

---

# Branch Purpose

The `refactor` branch focuses on **improving the internal structure of the project without adding new features**.

The main objective is to ensure that:

* All project assets are stored in proper directories
* File paths are consistent across HTML, CSS, and JavaScript
* Developers can easily locate and manage resources
* The project structure remains scalable for future updates

This branch improves the foundation of the project so that **future development becomes more structured and maintainable**.

---

# Previous Project Structure

Before this refactor, the project followed a basic modular structure where assets were partially organized but **not fully categorized**, and some file paths were inconsistent.

Example:

```
type-tutor/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── audio/
│   │   └── bgm.mp3
│   │
│   └── images/
│
└── README.md
```

Although this structure was an improvement over the original flat structure, **asset organization and path management still required refinement**.

---

# Updated Refactored Project Structure

In this branch, the **assets directory has been further structured** to improve clarity and maintain consistency as the project grows.

```
type-tutor/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── audio/
│   │   └── bgm.mp3
│   │
│   ├── images/
│   │
│   └── icons/
│
└── README.md
```

This updated structure ensures that **each asset category has a dedicated location**, which simplifies development and debugging.

---

# Refactoring Changes

The following improvements were implemented in this branch:

* Corrected incorrect or outdated file paths across the project
* Improved the internal structure of the `assets` directory
* Separated icons from general images for better organization
* Verified that all HTML, CSS, and JavaScript files reference correct asset paths
* Ensured consistent folder naming and structure
* Cleaned up redundant or incorrect references

These changes help maintain a **clear and scalable project architecture**.

---

# Example Path Updates

Since files were reorganized and paths corrected, several references were updated.

### Audio File

Old path:

```
src="bgm.mp3"
```

Updated path:

```
src="assets/audio/bgm.mp3"
```

---

### Stylesheet

Old path:

```
href="style.css"
```

Updated path:

```
href="css/style.css"
```

---

### JavaScript File

Old path:

```
src="script.js"
```

Updated path:

```
src="js/script.js"
```

---

### Icons

Icons are now stored separately to keep UI resources organized.

Example path:

```
assets/icons/icon-name.png
```

---

# Refactor Workflow

The restructuring process followed a systematic approach:

```
Original Project
     │
     ▼
Initial Modular Structure
     │
     ▼
Improve Asset Organization
     │
     ├── css/
     ├── js/
     ├── assets/audio/
     ├── assets/images/
     └── assets/icons/
     │
     ▼
Move Files Into Correct Folders
     │
     ▼
Update All File Paths
     │
     ▼
Test Navigation, Media, and Scripts
```

This workflow ensured that **the restructuring did not break existing functionality**.

---

# Benefits of This Refactor

This structural update provides several advantages:

* Better organization of project files
* Clear separation of assets
* Easier navigation for developers
* Improved maintainability
* Scalability for future features
* Reduced confusion when managing media resources

This structure aligns with **common frontend development standards used in larger projects**.

---

# Testing After Refactor

After completing the restructuring, several checks were performed to ensure functionality remained intact:

* Navigation links were tested
* Background audio loading was verified
* JavaScript functionality was reviewed
* Asset loading paths were checked
* Browser console errors were inspected
* Local testing was performed to confirm successful page rendering

These checks confirmed that **the updated file paths work correctly**.

---

# Contribution Notes

When contributing to this project, follow the established folder structure.

```
css/            → Stylesheets
js/             → JavaScript files
assets/audio/   → Sound and background music
assets/images/  → Image resources
assets/icons/   → Interface icons
```

Always verify **file paths when adding new assets or scripts** to avoid broken references.

Maintaining this structure ensures **consistency and easier collaboration** across the project.

---

# Summary

This branch focuses entirely on **improving the internal architecture of the Type Tutor project**.

No new features were introduced; instead, the goal was to create a **cleaner, more scalable, and better organized project structure** that supports future development and collaboration.

This refactor ensures that the project is **easier to maintain, easier to expand, and more aligned with standard frontend development practices**.
