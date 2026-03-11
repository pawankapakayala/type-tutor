# Type Tutor

A web-based typing practice application designed to help users improve typing speed and accuracy.  
This project is being collaboratively developed using a structured Git workflow to ensure smooth integration between team members.

---

# Project Overview

Type Tutor is a lightweight web application that allows users to practice typing and improve accuracy.  
The project focuses on providing a clean interface, responsive design, and modular code structure for easier collaboration.

This `dev` branch serves as the **primary development and integration branch** where all features are merged and tested before moving to the stable `main` branch.

---

# Project Structure

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

This modular structure ensures better maintainability and scalability of the project.

---

# Branch Strategy

The repository follows a **multi-branch development workflow** to support collaborative work.

```
main  → Stable production version
│
└── dev  → Integration branch for development
      │
      ├── feature-login
      ├── feature-audio
      ├── feature-ui
      ├── feature-navigation
      └── refactor-structure
```

### Branch Purpose

**main**

- Contains stable production-ready code
- Only updated after full testing

**dev**

- Main development branch
- All feature branches merge here first

**feature branches**

- Used for individual feature development
- Example: `feature-audio`, `feature-login`

**refactor-structure**

- Used to improve project structure and maintainability

---

# Development Workflow

Each contributor should follow this process to maintain a clean Git history.

### 1 Clone the repository

```
git clone https://github.com/<username>/type-tutor.git
```

---

### 2 Navigate into the project directory

```
cd type-tutor
```

---

### 3 Switch to the development branch

```
git checkout dev
```

---

### 4 Pull the latest changes

Always pull before starting work to ensure your local code is up to date.

```
git pull origin dev
```

---

### 5 Create a new feature branch

```
git checkout -b feature-your-module
```

Example:

```
git checkout -b feature-audio-fix
```

---

### 6 Implement your changes

Modify the necessary files in your local environment.

Example:

- index.html
- script.js
- style.css

---

### 7 Stage your changes

```
git add .
```

---

### 8 Commit changes with a meaningful message

```
git commit -m "Fix navigation path issue and improve audio playback handling"
```

Good commit messages clearly describe what was changed.

Examples:

```
Add typing accuracy tracker
Fix navigation links in homepage
Improve background music playback logic
Refactor folder structure for better organization
```

---

### 9 Push the feature branch

```
git push origin feature-your-module
```

---

### 10 Create a Pull Request

Create a pull request on GitHub:

```
feature-your-module → dev
```

After review and testing, the branch will be merged into the `dev` branch.

---

# Git Workflow Diagram

```
Developer
   │
   │ Clone Repository
   ▼
Local Development
   │
   │ Create Feature Branch
   ▼
feature-branch
   │
   │ Commit Changes
   ▼
Push to GitHub
   │
   │ Create Pull Request
   ▼
dev branch
   │
   │ Team Testing
   ▼
main branch (stable release)
```

---

# Running the Project Locally

You can run the project locally using any of the following methods.

### Option 1 – Open directly

Open `index.html` in your browser.

### Option 2 – Using VS Code Live Server

1 Install **Live Server extension**  
2 Right click `index.html`  
3 Click **Open with Live Server**

---

# Testing Checklist

Before pushing your code, verify the following:

- Navigation links are working
- No JavaScript console errors
- UI elements display correctly
- Audio files load correctly
- All file paths are valid

---

# Known Issues

The following issues are currently under development:

- Background music autoplay restrictions in modern browsers
- Mute button functionality is not working correctly
- Some navigation paths require further testing

These will be addressed in upcoming updates.

---

# Contribution Guidelines

To maintain code quality and collaboration efficiency:

- Always pull the latest changes before starting work
- Do not commit directly to `main`
- Use feature branches for development
- Write clear and meaningful commit messages
- Test your code locally before pushing
- Submit a pull request for review

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Git for version control
- GitHub for collaboration

---

# Contributors

This project is developed collaboratively by the team using a structured Git workflow.
