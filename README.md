# TechTicks GPT Chatbot - Full Stack AI Application

A modern AI-powered chatbot application built with FastAPI backend and Next.js frontend, featuring real-time chat, data management, and a beautiful XevenGPT-inspired interface.

## 🚀 Features

### Frontend Features
- **Modern Chat Interface**: Real-time messaging with AI assistant
- **Data Management**: Add and manage projects, clients, and FAQs
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: XevenGPT-inspired design with purple theme
- **Real-time Updates**: Automatic data refresh after operations
- **Form Validation**: Prevents empty submissions
- **Loading States**: User-friendly loading indicators

### Backend Features
- **FastAPI Framework**: High-performance Python web framework
- **AI Integration**: Google Gemini AI for intelligent responses
- **Database**: SQLAlchemy with SQLite for data persistence
- **RESTful APIs**: Complete CRUD operations for all entities
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.2**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and side effects
- **Fetch API**: HTTP requests to backend

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations
- **Google Gemini AI**: AI language model integration
- **SQLite**: Lightweight database
- **Uvicorn**: ASGI server

## 📁 Project Structure

```
d:\gpt\
├── backend/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py               # Configuration settings
│   ├── database.py             # Database connection and models
│   ├── models.py               # SQLAlchemy models
│   ├── requirements.txt        # Python dependencies
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── chat.py             # Chat API endpoints
│   │   ├── clients.py          # Client management API
│   │   ├── faqs.py             # FAQ management API
│   │   └── projects.py         # Project management API
│   └── services/
│       ├── __init__.py
│       └── llm.py              # AI service integration
├── frontend/
│   ├── app/
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ChatInterface.tsx   # Main chat interface
│   │   ├── ChatArea.tsx        # Chat messages area
│   │   ├── ChatSidebar.tsx     # Right sidebar with company info
│   │   └── DataSidebar.tsx     # Left sidebar for data management
│   ├── package.json            # Node.js dependencies
│   └── tsconfig.json           # TypeScript configuration
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed on your system
- **Node.js 18+** and npm/pnpm installed
- **Google Gemini API Key** (for AI functionality)

### 1. Clone and Setup

```bash
# Clone the repository (if using git)
git clone <your-repo-url>
cd gpt

# Or navigate to your project directory
cd d:\gpt
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file in backend directory with:
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Run database migrations (creates SQLite database)
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"

# Start the backend server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 Configuration

### Backend Configuration

#### Environment Variables
Create a `.env` file in the `backend` directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
DATABASE_URL=sqlite:///./techticks.db
```

#### Database Setup
The application uses SQLite by default. The database file will be created automatically when you first run the application.

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8000`. If you change the backend port, update the API URLs in the components.

## 📡 API Endpoints

### Chat API
- **POST** `/api/chat` - Send message to AI assistant
  ```json
  {
    "message": "What services does TechTicks provide?"
  }
  ```

### Projects API
- **GET** `/api/projects/` - Get all projects
- **POST** `/api/projects/` - Create new project
  ```json
  {
    "name": "AI Healthcare System",
    "description": "An AI-powered healthcare management system"
  }
  ```

### Clients API
- **GET** `/api/clients/` - Get all clients
- **POST** `/api/clients/` - Create new client
  ```json
  {
    "name": "Government of Punjab",
    "logo_url": "https://example.com/logo.png"
  }
  ```

### FAQs API
- **GET** `/api/faqs/` - Get all FAQs
- **POST** `/api/faqs/` - Create new FAQ
  ```json
  {
    "question": "What services do you provide?",
    "answer": "We provide AI solutions, web development, and mobile app development."
  }
  ```

## 🎨 Frontend Components

### ChatInterface.tsx
Main component that orchestrates the entire application:
- Manages state for messages, projects, clients, and FAQs
- Handles API calls to backend
- Coordinates between all child components

### ChatArea.tsx
Center chat interface:
- Displays conversation messages
- Handles message input and submission
- Shows welcome screen with agent selection
- Displays suggested queries

### DataSidebar.tsx
Left sidebar for data management:
- Tabbed interface for Projects, Clients, and FAQs
- Forms for adding new data
- Lists of existing data
- Real-time updates after operations

### ChatSidebar.tsx
Right sidebar with company information:
- Company branding and social media links
- Video section
- Awards and appreciations display
- Quick actions

## 🔗 Frontend-Backend Connection

### API Integration
The frontend connects to the backend through HTTP requests:

```typescript
// Example: Fetching projects
const fetchProjects = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/projects/');
    if (response.ok) {
      const data = await response.json();
      setProjects(data);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};
```

### Data Flow
1. **Frontend** sends HTTP requests to **Backend APIs**
2. **Backend** processes requests using **FastAPI** and **SQLAlchemy**
3. **AI Service** (Gemini) processes chat messages
4. **Database** stores and retrieves data
5. **Backend** returns JSON responses to **Frontend**
6. **Frontend** updates UI with received data

## 🗄️ Database Schema

### Projects Table
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL
);
```

### Clients Table
```sql
CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    logo_url VARCHAR NOT NULL
);
```

### FAQs Table
```sql
CREATE TABLE faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question VARCHAR NOT NULL,
    answer TEXT NOT NULL
);
```

### Company Info Table
```sql
CREATE TABLE company_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tagline VARCHAR,
    website VARCHAR,
    linkedin VARCHAR,
    upwork VARCHAR
);
```

## 🚀 Deployment

### Backend Deployment
1. **Install production dependencies**:
   ```bash
   pip install gunicorn uvicorn[standard]
   ```

2. **Set production environment variables**:
   ```env
   GEMINI_API_KEY=your_production_api_key
   DATABASE_URL=your_production_database_url
   ```

3. **Run with Gunicorn**:
   ```bash
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### Frontend Deployment
1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## 🔧 Development

### Adding New Features
1. **Backend**: Add new routes in `routes/` directory
2. **Frontend**: Create new components in `components/` directory
3. **Database**: Add new models in `models.py`
4. **API Integration**: Update frontend to use new endpoints

### Code Style
- **Backend**: Follow PEP 8 Python style guide
- **Frontend**: Use TypeScript for type safety
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utility classes

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues
1. **Port already in use**: Change port in uvicorn command
2. **Database errors**: Delete `techticks.db` and restart
3. **API key errors**: Check `.env` file and API key validity

#### Frontend Issues
1. **Build errors**: Clear `node_modules` and reinstall
2. **API connection errors**: Check backend is running on port 8000
3. **TypeScript errors**: Run `npm run build` to see detailed errors

### Debug Mode
- **Backend**: Add `--reload` flag for auto-restart on changes
- **Frontend**: Development server has hot reload enabled

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at http://localhost:8000/docs

---

**TechTicks Solutions** - Innovate Transform Succeed. 🚀
