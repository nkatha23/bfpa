# Bitcoin for Professionals Africa (BFPA) Platform

> Building the Future Workforce for a Bitcoinized Economy

A comprehensive educational platform empowering African professionals to thrive in the Bitcoin economy through industry-specific courses and progress tracking.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- pnpm (or npm)

### Frontend (Next.js)

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Visit http://localhost:3000
```

### Backend (Django)

```bash
# Install dependencies
cd scripts/backend
pip install -r requirements.txt

# Setup database
python manage.py migrate
python seed_data.py

# Run development server
python manage.py runserver 0.0.0.0:8000

# Visit http://localhost:8000/api
```

## 📚 Course Structure

### Courses Offered

1. **Corporate Finance & Treasury**
   - Understanding Bitcoin as strategic treasury asset
   - Bitcoin's role in corporate finance
   - 5 comprehensive modules

2. **NGOs & Activists**
   - Financial autonomy and cross-border solutions
   - Bitcoin for activism and impact
   - 5 comprehensive modules

3. **Educators**
   - Teaching Bitcoin economics
   - Curriculum development
   - 4 comprehensive modules

## 🔐 Features

### Authentication
- User registration with roles (Professional, Student, Educator, NGO/Activist)
- Secure token-based authentication
- Protected course access (login required)
- Extended user profiles with organization details

### Learning Platform
- Structured course hierarchy
- Progressive module unlocking (complete modules sequentially)
- Rich content with points and examples
- Reflection questions for deeper learning
- Capstone tasks for practical application

### Progress Tracking
- Real-time progress visualization
- Module completion tracking
- Reflection answer storage
- Course-specific progress reports
- Progress unlock prerequisites

## 🏗️ Project Structure

```
bfpa-platform-design/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   ├── get-started/       # Get started guide
│   └── course/            # Course pages (protected)
├── components/            # React components
│   ├── ui/               # UI component library
│   └── [other components]
├── lib/                   # Utilities and API
│   ├── api.ts           # API client
│   ├── auth-context.tsx # Auth state management
│   └── utils.ts         # Utility functions
├── scripts/backend/      # Django backend
│   ├── bfpa_backend/    # Django settings
│   ├── courses/         # Course app
│   ├── users/           # User app
│   └── manage.py        # Django CLI
└── styles/              # CSS files
```

## 🔌 API Architecture

### REST API Endpoints

**Base URL:** `http://localhost:8000/api`

#### Authentication
- `POST /auth/register/` - Register new user
- `POST /auth/login/` - User login
- `POST /auth/logout/` - User logout
- `GET /auth/me/` - Get current user

#### Courses
- `GET /courses/` - List all courses
- `GET /courses/{slug}/` - Get course with modules
- `GET /courses/{slug}/modules/` - List course modules
- `GET /courses/{slug}/modules/{slug}/` - Get module details

#### Progress
- `GET /progress/` - Get user progress
- `POST /progress/complete_module/` - Mark module complete
- `GET /progress/course_progress/?course={slug}` - Course progress
- `GET /progress/is_module_unlocked/?course={slug}&module={slug}` - Check unlock

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** React Context API
- **HTTP Client:** Fetch API
- **Forms:** React Hook Form + Zod validation

### Backend
- **Framework:** Django 5.1
- **API:** Django REST Framework
- **Database:** SQLite (development)
- **Authentication:** Token-based (Django REST Framework)
- **CORS:** django-cors-headers

## 📝 Fixed Issues

✅ **Hydration Error** - Fixed by moving providers to client-side component
✅ **Authentication Guard** - Routes require login for course access
✅ **Progress Tracking** - User progress stored and displayed
✅ **Database Setup** - SQLite database created and seeded with sample data

## 🔒 Security Features

- User authentication with secure tokens
- Password validation and hashing
- CSRF protection
- CORS configuration
- Protected API endpoints

## 📱 Responsive Design

- Mobile-first approach
- Responsive UI with Tailwind CSS
- Works on all screen sizes
- Optimized for touch and keyboard navigation

## 🧪 Testing

```bash
# Run tests
python manage.py test          # Backend tests
pnpm test                      # Frontend tests
```

## 📖 Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Detailed deployment instructions
- Environment variable setup
- Production configuration
- Troubleshooting guide

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

All rights reserved. Bitcoin for Professionals Africa

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for the Bitcoin community in Africa**
