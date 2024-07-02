This is a TypeScript-React project with a backend powered by [Node/Express](https://expressjs.com/) + [MongoDB](https://www.mongodb.com/) and Tailwind CSS for UX.


[![Home Page Screen Shot](public/images/cashtrack.png)](https://raw.githubusercontent.com/ousamuel/CashTrack/main/public/images/cashtrack.png)

## Introduction

Welcome to CashTrack, a expense-tracking application developed using TypeScript the framework Next.js with a Node/Express/MongoDB backend. 

In this application, users can effortlessly manage shared expenses with friends, family, or colleagues. They can create groups for different occasions or groups of people, add expenses, split bills accurately among group members, and keep track of who owes what. The app provides clear insights into spending patterns and simplifies settling debts, ensuring financial transparency among users.


**For IOS, cross-site tracking must be allowed for cross-domain cookies**
(Settings -> Safari -> Uncheck 'Prevent Cross-Site Tracking')

[Deployed via AWS Amplify](https://main.d3pzfughhwvxcj.amplifyapp.com/)

[Link to demo](https://www.loom.com/share/a811ea6664ad44ea8a67e11eb4f71439?sid=b6286fa8-1e6d-4dbb-8fb9-6c07f22d93b0)

## Features

Front-end Integrations:
- React Context
- Component-based Architecture
- Conditional Rendering/Event handling based on user interaction
- Type safety for consistent data validation

Back-end Integrations:
- Custom user authentication via express sessions and bcrypt
- RESTful API with full CRUD + CORS
- Object-relational mapping via Node/Express

## Acknowledgements

- [React Hook Form](https://react-hook-form.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [NextUI](https://nextui.org/)
- [SVG Vectors/Icons](https://www.svgrepo.com/)

For development:
In root directory (CashTrack):
- create .env.local file
    - NEXT_PUBLIC_BACKEND_API = http://localhost:8000/
    -  change backend url to different port if necessary
- Run this command
```bash
npm run dev
```
In server directory:
- create .env file
    - FRONTEND_URL = http://localhost:3000
          - replace frontend url with different port if necessary
    - DATABASE_URL = "mongodb+srv://dev-user:CCOPehyRsEEZctjy@cluster0.w0qyptv.mongodb.net/?retryWrites=true&w=majority"
- Run this command
```bash
npm start
```
or
```bash
node server.js
```
