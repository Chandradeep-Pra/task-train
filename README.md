# 🚂 TaskTrain – AI-Powered Sprint Planning & Team Assignment

Welcome to **TaskTrain**, your end-to-end AI assistant for planning agile sprints, estimating story points, and assigning the right developer to the right task — all in a beautiful, intuitive interface.

---

## ✨ Features

### 🔹 Task Input & PRD Extraction
- Input product requirement documents (PRDs) or meeting notes
- AI extracts clear, concise user stories with categories

### 🔹 📅 Sprint Duration Estimation
- Uses AI to predict the **ideal number of sprints** for your project
- Click the ✨ spark icon to get:
  - Estimated sprint count
  - Reasoning behind it
- Fully editable after suggestion

### 🔹 📌 Smart Story Point Estimation
- Automatically generates story points for user stories
- Feedback shown via beautifully styled toast notifications
- Story points can be **manually edited**
- UI changes (border/toast color) based on points assigned

### 🔹 👥 Auto-Assign Employees with AI
- Matches user stories with team members based on:
  - Skillset (e.g. React, Node.js, QA, DevOps)
  - Role type (Frontend, Backend, QA, Fullstack, DevOps)
- Displays:
  - Primary AI-assigned employee
  - All suitable employees (dropdown)
- Manual override supported

### 🔹 🍞 Toast UX FTW
- Full use of [react-hot-toast](https://react-hot-toast.com/)
- Dynamic toasts for all async actions:
  - Assignment in progress ✅
  - Estimation results 🔍
  - Manual override ✏️
- Toasts update after actual API resolution — not prematurely
- Visual border or color indicators reflect action outcomes

---

## 🧠 How It Works

### AI APIs

| Endpoint | Description |
|----------|-------------|
| `/api/get-ai-sprint-estimate` | Returns sprint duration estimate and reasoning |
| `/api/get-employees` | Given a category + user story, returns best-matched employee |
| `/get-employees-data` | Static list of all available employees with skills |

### Sample: `/get-employees-data`

```ts
[
  { name: 'Aarav', skills: ['frontend', 'React', 'JavaScript'] },
  { name: 'Isha', skills: ['backend', 'Node.js', 'MongoDB'] },
  { name: 'Rohan', skills: ['testing', 'Selenium', 'Manual Testing'] },
  { name: 'Priya', skills: ['frontend', 'Angular', 'TypeScript'] },
  ...
]
