# Social Media Backend API

A production-aware REST API backend for a modern social platform, built with TypeScript and Node.js. Engineered for reliability, security, and real-time performance — with an AI-powered chat engine at its core.

---

## What This Project Delivers

A full-featured social media backend that handles everything from account creation and content management to real-time messaging and intelligent AI-driven chat. Every layer is designed with security, scalability, and maintainability in mind.

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Runtime | Node.js (ES Modules), TypeScript | Type-safe server logic across all layers |
| Framework | Express.js | Routing, middleware pipeline, MVC structure |
| Database | MongoDB / Mongoose | Primary data store with schema-enforced models |
| Cache | Redis (node-redis) | Session management, token revocation, hot data caching |
| Real-time | Socket.IO | Authenticated WebSocket rooms for live chat and notifications |
| Auth | JWT (Access + Refresh), bcrypt | Stateless auth with short-lived access and long-lived refresh tokens |
| Storage | AWS S3 | Scalable media storage via pre-signed URLs and bucket policies |
| Upload | Multer | Multipart file handling for images and videos |
| Validation | Joi | Request schema validation at the middleware layer |
| Security | Helmet, CORS, Rate Limiting, crypto-js | 5-layer API hardening |
| Email | Nodemailer | OTP delivery and account verification flows |
| Infrastructure | Nginx | Reverse proxy, SSL/TLS termination, Node.js port shielding |
| Dev Tools | Git, GitHub, Postman, AWS Console | Version control, testing, deployment |
| AI | Groq SDK, Hugging Face, Bytez | Multimodal intent classification and response routing |
| GraphQL | Express-GraphQL | Alternative query interface alongside REST |
| Notifications | Firebase Admin SDK (FCM) | Push notifications to connected devices |

---

## Core Features

### Authentication & Session Management
- Email OTP verification on sign-up
- JWT access tokens (short TTL) + refresh tokens (long TTL)
- Redis-backed token revocation for immediate session invalidation
- Role-based access control across protected routes
- Password reset via email flow

### User Profiles
- Profile creation with image upload to AWS S3
- Shareable public profile URLs via username
- Profile view tracking
- Follow / Unfollow system with personalized feed generation

### Posts & Content
- Create, edit, and delete posts with image/video attachments (S3)
- Like / Unlike with counters
- Comment threads with nested replies
- Paginated feed sorted by relevance and recency
- Visibility control per post

### Real-Time Messaging
- Socket.IO room-based chat with authenticated handshake
- Direct messaging (DM) system
- MongoDB-persisted message history
- Real-time notifications on follow, like, and comment events

### AI Chat Engine
- Single endpoint: `POST /AiChatModel`
- Intent classification — routes prompts to text, image, video, or speech workflows
- External AI providers: Groq (text), Hugging Face / Bytez (image + media)
- Conversation history persisted to MongoDB per user

### Security Architecture
Five independent security layers applied at the middleware level:
1. **Helmet** — HTTP header hardening
2. **CORS** — Controlled cross-origin policy
3. **Rate Limiting** — Request throttling per IP
4. **Joi Validation** — Schema-level input sanitization
5. **crypto-js Encryption** — Payload-level data protection

---

## Architecture

```
src/
  app.controller.ts          # Express bootstrap, GraphQL, Socket.IO integration
  main.ts                    # Entry point
  common/
    ai-orchestrator/         # Intent classification and AI routing logic
    exception/               # Unified error and success response helpers
    interface/               # Shared TypeScript interfaces
    middleware/              # Auth, validation, upload middleware
    security/                # JWT utilities and crypto helpers
    service/                 # Redis, Firebase, Socket services
    utils/SendEmail/         # Email templates and OTP delivery
  config/
    env.service.ts           # Environment variable loader
  database/
    connection.ts            # MongoDB connection setup
    models/                  # Mongoose schemas
    repository/              # Generic repository abstraction layer
  modules/
    AI_chat/                 # AI chat controller and service
    auth/                    # Auth controller and service
    comments/                # Comment controller and service
    gql/                     # GraphQL schema and resolvers
    posts/                   # Post controller and service
    socket.io/               # REST socket helpers and service logic
    users/                   # User profile controller and service
  public/
    images/                  # AI-generated image assets
    audio/                   # AI-generated audio assets
```

---

## API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new account |
| POST | `/verify_email` | Confirm email with OTP |
| POST | `/login` | Authenticate and receive tokens |
| POST | `/forgetPassword` | Trigger password reset email |
| PATCH | `/resetPassword` | Reset password with token |
| POST | `/refresh_token` | Issue new access token |
| POST | `/revokeToken` | Revoke active session |

### Users & Profiles
| Method | Endpoint | Description |
|---|---|---|
| GET | `/get_user_by_id` | Fetch authenticated user profile |
| PATCH | `/update_user_by_id` | Update profile fields |
| DELETE | `/delete_user_by_id` | Delete account |
| GET | `/get_all_users` | List all users |
| POST | `/create_user` | Create or update profile with image |
| GET | `/get_user_profile` | Fetch full profile data |
| GET | `/create_profile_url/:username` | Generate shareable profile link |
| POST | `/view_profile` | Track profile view event |
| POST | `/send_notification/:userid` | Send FCM push notification |

### Posts
| Method | Endpoint | Description |
|---|---|---|
| POST | `/createPost` | Create post with media attachments |
| GET | `/getPosts/:userid` | Get user's posts |
| PATCH | `/updatePost/:id` | Edit post |
| DELETE | `/deletePost/:id` | Remove post |

### Comments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/addComments` | Add comment to a post |
| GET | `/getAllComments` | Retrieve all comments |
| GET | `/getCommentsbyPost/:id` | Comments for a specific post |
| PATCH | `/updateComment/:id` | Edit comment |
| DELETE | `/deleteComment/:id` | Delete comment |

### AI Chat
| Method | Endpoint | Description |
|---|---|---|
| POST | `/AiChatModel` | Authenticated multimodal prompt handler |

### Socket.IO (Real-Time)
Authenticated via `socket.handshake.auth.token`

| Event | Direction | Description |
|---|---|---|
| `room` | Client → Server | Create or join a chat room |
| `send_message` | Client → Server | Broadcast message to room |

REST helpers:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get_room_id/:id` | Resolve room ID |
| GET | `/get_messages/:id` | Fetch room message history |

### GraphQL
| Method | Endpoint | Description |
|---|---|---|
| POST | `/graphql` | GraphQL query entrypoint |

---

## Installation

```bash
npm install
```

## Environment Setup

Create `.env.dev` or `.env.prod` and configure the following:

```env
DB_URL=
PORT=
MODE=
ADMIN_JWT=
USER_JWT=
REFRESH_ADMIN_JWT=
REFRESH_USER_JWT=
APP_EMAIL=
APP_PASSWORD=
AI_API=
GROQ_API=
IMAGE_API=
REDIS_URL=
HF_TOKEN=
```

> Firebase credentials (service account JSON) are required for push notification support.

## Run

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

---

## In Progress

| Feature | Status |
|---|---|
| Docker containerization | 🔧 In progress |
| Swagger / OpenAPI docs | 🔧 In progress |
| Jest unit & integration tests | 🔧 In progress |
| CI/CD pipeline | 🔧 In progress |
| Microservices migration | 🔧 Planned |

---

## License

ISC
