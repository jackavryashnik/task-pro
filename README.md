# Task Pro

Task Pro is a task manager application inspired by Trello. It allows users to register, log in (including Google authentication), create custom boards with background images, create columns and tasks within those columns, set task details such as title, description, priority, and deadline, move tasks between columns. Also, the application has a change of theme to dark, light and violet.

![](https://github.com/jackavryashnik/task-pro/tree/main/src/vid/TaskProPreview.mp4)

## Features

- **User Authentication**
  - Registration and login functionality.
  - Google authentication support.

- **Customizable Boards**
  - Create custom boards with background images.

- **Task Management**
  - Create columns within boards.
  - Add tasks to columns with the following details:
    - Title
    - Description
    - Priority
    - Deadline
  - Move tasks between columns.

- **Theme Switching**
  - Switch between light, dark, and violet themes.

## Technologies Used

- **Frontend**
  - HTML (jsx)
  - CSS modules and reusable color variables
  - React.js
  - React Router for routing
  - Redux for state management

- **Backend**
  - [The backend application located in separate repository.](https://github.com/AntonyIshchenko/tftpbetpapp)
  - It`s written with Node.js.
  - Application deployed on Render to interact with it.
  - Pictures are stored using Cloudinary service.

## Deployment

[The live application is deployed on Vercel.](https://task-pro-kohl.vercel.app)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/jackavryashnik/task-pro
   cd task-pro
   npm i
   npm run dev
