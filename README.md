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
node server.js
```
  



Current installations:
npm i concurrently, rimraf, express , react-hook-form , @hookform/resolvers yup, mongodb, cors , bcrypt
npm i mongodb
npm i -D nodemon, @types/express @types/node, typescript,
npx tsc --init

cd server
npm i express morgan nodemon body-parser dotenv mongoose ax
ios, bcrypt, jsonwebtoken
express-session cookie-parser

development:
npm run dev in cashtrack
npm start in server

This is a TypeScript-React project with a backend powered by [Node/Express](https://expressjs.com/) + [MongoDB](https://www.mongodb.com/) and Tailwind CSS for UX.

<!-- Deployed via Vercel & PythonAnywhere: [Click here to visit the site](https://fitness-app-ousamuel.vercel.app/)
# SteelStance -->

[![Home Page Screen Shot](public/images/cashtrack.png)](https://raw.githubusercontent.com/ousamuel/CashTrack/main/public/images/cashtrack.png)

## Introduction

Welcome to CashTrack, a full-stack fitness application developed using the framework Next.js with a Node/Express/MongoDB backend. 

**Not available on IOS/Safari due to cross-domain cookies not being supported**

[Deployed via Render](https://cash-track-fpl2.onrender.com/)

[Link to demo](https://www.loom.com/share/a811ea6664ad44ea8a67e11eb4f71439?sid=b6286fa8-1e6d-4dbb-8fb9-6c07f22d93b0)

## Features

Front-end Integrations:

Back-end Integrations:
<!-- 
- User authentication via Flask-Login and Flask-Bcrypt for secure session management and password hashing
- Object-relational mapping utilizing SQLAlchemy
- RESTful API with full CRUD + CORS for cross-origin requests -->

## Acknowledgements

- [React Hook Form](https://react-hook-form.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [NextUI](https://nextui.org/)
- [SVG Vectors/Icons](https://www.svgrepo.com/)

<!-- ## To run this repository on your local machine: -->

<!-- Clone the repository

```bash
git clone git@github.com:ousamuel/fitness-app.git
```

Install all required dependencies

```bash
chmod +x setup.sh
bash setup.sh
```

Open two different terminals

Terminal 1: cd into the 1-next directory

- Open providers.js
- Change line 17 to:

```bash
const BACKEND_URL = "http://localhost:3000";
```

Run this command

```bash
npm run dev
```

Terminal 2: cd into the 2-flask directory

- Open app.py
- Comment out lines 16, 31, 32
- Uncomment lines 17, 29, 30

Add this block to end of app.py

```bash
if __name__ == "__main__":
    app.run(port=5555, debug = True )
```

Run this command

```bash
python app.py
```

To re-seed the database with sample data:

```bash
python seed.py
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Sample User Logins(1-5):

- email: user1@gmail.com
- password: user1pass

By default:
Next.js server is ran on port 3000 & Flask application on port 5500 -->
