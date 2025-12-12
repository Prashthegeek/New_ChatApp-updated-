# 💬 ConvoHub - Real-Time Chat Application

A full-stack, real-time messaging application built with the MERN stack (MongoDB, Express, React, Node.js). It features Google OAuth authentication, real-time typing indicators, group chat management, and a **hybrid file storage system** that intelligently optimizes storage costs by routing media to Cloudinary and documents to Backblaze B2.

---

## 📡 Architecture

This system follows a monolithic MVC pattern with a dedicated real-time layer. The architecture optimizes for cost and speed by using a hybrid storage strategy.

```mermaid
flowchart TD
    %% Hand-drawn styling instructions
    %% To render this hand-drawn: Set 'look' to 'handDrawn' in Mermaid Config

    User((User))
    
    subgraph Client_Side [Frontend - React + Chakra UI]
        UI[User Interface]
        Context[ChatProvider Context]
        SocketClient[Socket.io Client]
    end

    subgraph Server_Side [Backend - Node.js + Express]
        Router[Express Router]
        
        subgraph Controllers
            UC[User Controller]
            CC[Chat Controller]
            MC[Message Controller]
        end
        
        SocketServer[Socket.io Server]
        Auth[Passport Google Strategy]
    end

    subgraph Data_Layer [Database & Storage]
        Mongo[(MongoDB Atlas)]
        Cloudinary[Cloudinary\nImages/Video]
        B2[Backblaze B2\nPDF/Docs]
    end

    subgraph External
        Google[Google OAuth Server]
    end

    %% --- Interactions ---

    User --> UI
    UI --> Context

    %% HTTP API REQUESTS (The part you wanted added)
    Context -- "POST /api/user/login\nPOST /api/user (Signup)" --> Router
    Context -- "GET /api/chat\nPOST /api/chat/group" --> Router
    Context -- "POST /api/message\nGET /api/message/:chatId" --> Router

    %% Socket.io EVENTS
    SocketClient <--> |"Emit: setup, join chat, new message\nOn: message received, typing"| SocketServer

    %% Internal Routing
    Router --> UC
    Router --> CC
    Router --> MC

    %% OAuth Flow
    Router -- "GET /auth/google" --> Auth
    Auth <--> Google

    %% Database Queries
    UC & CC & MC <--> |"Query / Save"| Mongo

    %% File Upload Logic
    MC -- "Upload Stream (Image)" --> Cloudinary
    MC -- "Upload File (PDF)" --> B2


🚀 Key FeaturesReal-Time Messaging: Instant message delivery using Socket.io with virtually zero latency.Hybrid File Storage Engine:Images/Videos ➔ Uploaded to Cloudinary for optimization and streaming.PDFs/Docs ➔ Uploaded to Backblaze B2 for cost-effective raw storage.Robust Authentication:Google OAuth 2.0 integration using Passport.js for one-click login.Secure Session management with Cookies.Group Chat Management: Create groups, add/remove users, and rename groups in real-time.Interactive UI:Typing Indicators: See when someone is writing.Notifications: Real-time alerts for new messages.Built with Chakra UI for a polished, responsive look.🛠️ Tech StackFrontendReact.js (Context API for state management)Chakra UI (Component Library)Socket.io-client (Real-time bi-directional communication)BackendNode.js & Express.js (REST API & Server)Passport.js (Google Strategy Authentication)Socket.io (WebSockets)Database & StorageMongoDB Atlas (Primary Database)Mongoose (ODM)Cloudinary (Media Storage)Backblaze B2 (Document Storage)⚙️ Installation & SetupClone the repository:Bashgit clone [https://github.com/your-username/ConvoHub.git](https://github.com/your-username/ConvoHub.git)
cd ConvoHub
Install Dependencies:Bash# Install Backend Dependencies
npm install

# Install Frontend Dependencies
cd frontend
npm install
cd ..
Environment Variables:Create a .env file in the root directory and add the following keys:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Backblaze B2
B2_BUCKET_ID=your_bucket_id
B2_APP_KEY_ID=your_key_id
B2_APP_KEY=your_app_key
Run the Application:Bash# Run Backend & Frontend concurrently
npm start 
🔗 API EndpointsMethodEndpointDescriptionPOST/api/user/loginAuthenticate userGET/api/user/googleInitiate Google OAuthGET/api/chatFetch all chats for a userPOST/api/chat/groupCreate a new group chatPOST/api/messageSend a message (Text/File)GET/api/message/:chatIdFetch all messages for a chat
