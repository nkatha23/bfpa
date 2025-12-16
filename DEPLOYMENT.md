# BFPA Platform - Deployment Guide

## Directory Structure

```
bfpa-platform-design/
├── frontend/          # Next.js Frontend Application
├── backend/           # Django Backend API
├── README.md
└── DEPLOYMENT.md
```

> **Note:** The current structure keeps the frontend files at the root level with a `frontend` directory marker. To fully separate them, move all Next.js files to the `frontend/` directory and Django files to the `backend/` directory.

## Running Locally

### Backend Setup

```bash
# Navigate to backend directory
cd scripts/backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed the database
python seed_data.py

# Start the development server
python manage.py runserver 0.0.0.0:8000
```

**Backend URL:** `http://localhost:8000`
**API URL:** `http://localhost:8000/api`

### Frontend Setup

```bash
# Navigate to project root
cd ../..

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

**Frontend URL:** `http://localhost:3000`

## Features

### Authentication
- User registration and login
- Token-based authentication
- Protected routes (courses require login)
- User profiles with roles (professional, student, educator, NGO/Activist)

### Courses
- 3 main courses covering Bitcoin education for professionals
- Hierarchical structure: Courses → Modules → Content Sections
- Module progression with unlocking mechanism
- Module capacity tracking and management

### Progress Tracking
- Per-user module completion tracking
- Progress visualization with percentage
- Reflection question responses storage
- Course-specific progress view

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/me/` - Get current user info

### Courses
- `GET /api/courses/` - List all courses
- `GET /api/courses/{slug}/` - Get course detail with modules
- `GET /api/courses/{course_slug}/modules/` - List modules for a course
- `GET /api/courses/{course_slug}/modules/{module_slug}/` - Get module detail

### Progress
- `GET /api/progress/` - Get user's all progress
- `GET /api/progress/course_progress/?course={slug}` - Get progress for specific course
- `POST /api/progress/complete_module/` - Mark module as complete
- `GET /api/progress/is_module_unlocked/?course={slug}&module={slug}` - Check module unlock status

## Database

Uses SQLite for local development. Database file: `scripts/backend/db.sqlite3`

### Models
- **User** - Django auth user
- **UserProfile** - Extended user info with role
- **Course** - Learning tracks
- **Module** - Sections within courses
- **ContentSection** - Topics within modules
- **ContentPoint** - Individual points in sections
- **ContentExample** - Examples for content
- **ReflectionQuestion** - Reflection prompts for modules
- **UserProgress** - Tracks module completion per user

## Frontend Routes

- `/` - Home page
- `/login` - Login page
- `/signup` - Registration page
- `/get-started` - Get started guide (protected)
- `/course/:courseId` - Course detail view (protected)
- `/course/:courseId/module/:moduleId` - Module detail view (protected)

## Production Deployment

### Environment Variables

Create `.env.local` in the frontend root:

```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Build Frontend

```bash
pnpm build
pnpm start
```

### Build Backend

```bash
pip install -r requirements.txt
python manage.py migrate
# Set DEBUG=False in settings.py
# Configure ALLOWED_HOSTS and SECRET_KEY
# Use a production WSGI server (Gunicorn, etc.)
```

## Troubleshooting

### Hydration Errors
The hydration error has been fixed by moving providers to a client-side component. If you see hydration errors:
1. Ensure all dynamic content is wrapped in useEffect
2. Check for `typeof window` checks in serialization
3. Clear `.next` cache and rebuild

### CORS Issues
CORS is enabled for all origins in development (`CORS_ALLOW_ALL_ORIGINS = True`). For production, update `ALLOWED_ORIGINS` in Django settings.

### Module Imports
Make sure all components use proper relative imports or path aliases:
- `@/components` - Components
- `@/lib` - Utilities and API
- `@/hooks` - Custom React hooks

## Security Notes

- ⚠️ Change `SECRET_KEY` in Django settings before deploying
- ⚠️ Set `DEBUG = False` in production
- ⚠️ Configure `ALLOWED_HOSTS` properly
- ⚠️ Use HTTPS in production
- ⚠️ Store sensitive data in environment variables
