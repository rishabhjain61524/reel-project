The Reels Project is a full-stack MERN (MongoDB, Express, React, Node.js) platform designed for sharing and interacting with food-related video content, similar to a "TikTok for food". The development focused on creating a secure, production-ready application with the following core components and technical solutions:

1. Core Functionality & Architecture
User Roles: The app differentiates between regular Users (who can view, like, and save reels) and Food Partners (who can upload and manage content through a dedicated dashboard).

Tech Stack: Built using React for the frontend, Node/Express for the backend, MongoDB Atlas for data persistence, and Cloudinary/ImageKit for video hosting.

Key Interface: Features a vertical scroll "ReelFeed" component with autoplay logic and a BottomNav for mobile-friendly navigation.

2. Key Technical Challenges & Resolutions
Cross-Domain Authentication: Resolved persistent 401 Unauthorized errors by configuring JWT cookies to work across different Vercel domains.

Backend: Set cookies with sameSite: 'none', secure: true, and httpOnly: true.

Frontend: Updated all Axios requests to include { withCredentials: true }.

Security & Environment:

Implemented Bcrypt.js for one-way password hashing to ensure secure credential storage in MongoDB.

Configured Vercel Environment Variables (like JWT_SECRET and MONGODB_URI) to resolve "500 Internal Server Errors" during deployment.

UI Performance: Utilized React State Hooks to implement optimistic updates for "Like" and "Save" actions, providing immediate visual feedback without page reloads.

3. Production Links
Live Frontend: https://reels-project-j1zm.vercel.app/

Backend API: https://reels-project-one.vercel.app/
