
# StageManager Backend

This is the backend server for the StageManager application, built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js and npm
- PostgreSQL database

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables in `.env` file:
```
DB_HOST=localhost
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=stagemanager
DB_PORT=5432
PORT=5000
NODE_ENV=development
```

4. Create a PostgreSQL database named `stagemanager`

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### Students

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a student by ID
- `GET /api/students/byLevel/:level` - Get students by level (initiation, perfectionnement, pfe)
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Teachers

- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get a teacher by ID
- `GET /api/teachers/random` - Get random teachers
- `POST /api/teachers` - Create a new teacher
- `PUT /api/teachers/:id` - Update a teacher
- `DELETE /api/teachers/:id` - Delete a teacher

### Internships

- `GET /api/internships` - Get all internships
- `GET /api/internships/:id` - Get an internship by ID
- `GET /api/internships/byType/:type` - Get internships by type
- `POST /api/internships` - Create a new internship
- `PUT /api/internships/:id` - Update an internship
- `DELETE /api/internships/:id` - Delete an internship

## Data Models

### Student

- `id` - Integer (Primary Key)
- `firstName` - String
- `lastName` - String
- `email` - String (unique)
- `level` - String (1ere TI, 2eme DSI, 2eme MDW, 3eme DSI, 3eme MDW)
- `phoneNumber` - String

### Teacher

- `id` - Integer (Primary Key)
- `firstName` - String
- `lastName` - String
- `email` - String (unique)
- `department` - String
- `specialty` - String

### Internship

- `id` - Integer (Primary Key)
- `title` - String
- `company` - String
- `type` - String (initiation, perfectionnement, pfe)
- `startDate` - Date
- `endDate` - Date
- `room` - String (B01-B06, B101-B107)
- `description` - Text
- `studentId` - Integer (Foreign Key to Student)

## Relationships

- One Student can have many Internships
- One Internship belongs to one Student
- Many Internships can have many Teachers (through InternshipTeachers junction table)
