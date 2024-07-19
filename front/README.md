<p align="center">
  <a href="https://vitejs.dev/" target="blank"><img src="https://vitejs.dev/logo.svg" width="200" alt="Vite Logo" /></a>
</p>

# React + TypeScript + Vite + Material UI Application

This project is a modern web application built using Vite as the build tool, leveraging React and TypeScript for development. It incorporates Material UI for crafting a responsive design, react-infinite-scroller for implementing an infinite scroll feature in the employees list, and react-router-dom for managing routing within the application.

## Tech Stack
- Frontend Framework: [React](https://reactjs.org/)
- Template: [Vite](https://vitejs.dev/)
- Type Checking: (TypeScript)[https://www.typescriptlang.org/]
- UI Framework: [Material-UI](https://mui.com/)
- Infinite Scrolling: [react-infinite-scroller](https://github.com/danbovey/react-infinite-scroller)
- Routing: [react-router-dom](https://reactrouter.com/)

## Responsive Design

The application is partially responsive, thanks to Material UI's grid system and responsive components. It aims to provide an optimal viewing experience across a wide range of devices, from desktops to mobile phones. However, certain areas might need further adjustments to achieve full responsiveness.

## Atomic Design

The development of the application adheres to the principles of atomic design to an extent. This methodology has influenced the structuring of UI components, promoting reusability and scalability. By breaking down interfaces into fundamental building blocks, the application ensures consistency and efficiency in its design approach.

## Getting Started

To run this project locally:

1. Install dependencies with `npm install`.
2. Create `.env` (or `.env.development` accordingly) file with variable `VITE_API_URL=<API_URL>`. Eg. http://localhost:3000
3. Start the development server with `npm run dev`.
4. Look at a production server preview with `npm run preview`.