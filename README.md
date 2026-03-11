# Type Tutor

A web-based typing practice application designed to help users improve typing speed and accuracy.  
This project is being collaboratively developed with a structured Git workflow to ensure smooth integration between team members.

---

# Project Structure
type-tutor/
│
├── index.html
├── css/
│ └── style.css
│
├── js/
│ └── script.js
│
├── assets/
│ ├── images/
│ └── audio/
│
└── README.md


---

# Development Workflow

This repository follows a **multi-branch Git workflow** to support collaborative development.

### Branch Structure

main → stable production version
│
└── dev → integration branch for team development
│
├── feature-login
├── feature-audio
├── feature-ui
└── refactor-structure


---

# Development Process

Each contributor should follow this workflow:

### 1 Clone the repository

git clone https://github.com/
<username>/type-tutor.git


### 2 Navigate into the project
cd type-tutor


### 3 Switch to dev branch
git checkout dev


### 4 Pull latest updates
git pull origin dev


### 5 Create a feature branch
git checkout -b feature-your-module


### 6 Make changes and commit
git add .
git commit -m "Add feature: typing accuracy tracker"


### 7 Push branch
git push origin feature-your-module


### 8 Create Pull Request
Create a PR:
feature-your-module → dev


---

# Workflow Diagram
Developer
│
│ Clone Repo
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


---

# Checking Changes

Before pushing code:

1 Run the project locally  
2 Test navigation links  
3 Check console errors  
4 Ensure no broken UI components  

---

# Known Issues

Current issues under development:

- Background music autoplay restrictions in browsers
- Mute button not functioning correctly
- Some navigation paths require further testing

---

# Contribution Guidelines

- Always pull latest changes before starting work
- Do not commit directly to `main`
- Use meaningful commit messages
- Test features locally before creating a pull request

Example commit message:
Fix navigation path issue in home button


---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Git & GitHub for version control

---

# Contributors

Project developed collaboratively by the development team.

