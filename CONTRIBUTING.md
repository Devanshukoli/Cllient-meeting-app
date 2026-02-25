# Contributing to Cllient Meeting App

Thanks for your interest in contributing to the **Cllient Meeting App**! This document outlines the process for proposing changes and setting up your environment.

## 🌈 Code of Conduct

Help us keep this project open and inclusive. Be respectful, professional, and welcoming to all contributors.

## 🛠️ Getting Started

1. **Fork the Repository**: Create your own copy of the project.
2. **Clone Locally**: `git clone https://github.com/devanshukoli/Cllient-meeting-app.git`
3. **Install Dependencies**:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
4. **Local Setup**: Follow the setup instructions in the root `README.md` and sub-directory `README.md` files.

## 🌿 Branching Strategy

- We use a feature-branching model.
- Always create a new branch from `main` for your changes:
  - `feature/your-feature-name`
  - `bugfix/your-bugfix-name`
  - `docs/your-docs-change`

## 📝 Commit Guidelines

- Use clear and descriptive commit messages.
- Prefer the [Conventional Commits](https://www.conventionalcommits.org/) format:
  - `feat: add new booking component`
  - `fix: resolve redis connection timeout`
  - `docs: update setup instructions`

## 🏗️ Pull Request Process

1. Ensure your code follows the existing style and passes any linting rules.
2. Update documentation if you've added or changed functionality.
3. Open a Pull Request against the `main` branch.
4. Provide a clear description of the problem you're solving or the feature you've added.
5. Wait for review and address any feedback.

## 🎨 Styling and Patterns

- **Backend**: Use domain-driven modules in `src/modules`. Use Zod for validation.
- **Frontend**: Use MUI components and TanStack Query for data fetching. Abstract logic into custom hooks.

---

Happy coding! 🚀
