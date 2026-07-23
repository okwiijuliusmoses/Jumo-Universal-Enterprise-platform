import { SoftwareBlueprint } from "./types";

export const SAMPLE_BLUEPRINT: SoftwareBlueprint = {
  name: "GymSaaS Platform",
  description: "A comprehensive SaaS platform designed for local gyms and physical training centers. It empowers managers to manage subscriptions and scheduling, trainers to log custom client workouts, and trainees to book workout classes and track daily personal milestones.",
  coreFeatures: [
    "User authentication & dashboard for Trainees, Trainers, and Gym Managers.",
    "Class scheduling and real-time class booking system.",
    "Relational database schemas tracking memberships, trainers, logs, and bookings.",
    "Integrated visual Kanban timeline tracking all sprint tasks."
  ],
  techStack: [
    {
      category: "Frontend View Framework",
      technology: "React v19 + Tailwind CSS v4",
      reasoning: "Provides high-performance component rendering paired with clean utility styling for an eye-safe training dashboard."
    },
    {
      category: "Backend REST API Server",
      technology: "Node.js (Express)",
      reasoning: "High-throughput asynchronous request routing for managing class bookings and real-time workout log updates."
    },
    {
      category: "Relational Database",
      technology: "PostgreSQL (with Drizzle ORM)",
      reasoning: "Guarantees absolute data integrity for billing, class capacity checks, and client-trainer mappings via strict foreign keys."
    }
  ],
  databaseSchema: [
    {
      tableName: "users",
      type: "Relational",
      description: "Stores essential member credentials, roles, and profiles.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", description: "Unique identifier for each user profile", primaryKey: true, nullable: false },
        { name: "email", type: "VARCHAR(255)", description: "Email used for logging in", primaryKey: false, nullable: false },
        { name: "password_hash", type: "VARCHAR(512)", description: "Securely salted password digest", primaryKey: false, nullable: false },
        { name: "role", type: "VARCHAR(50)", description: "Access level: 'trainee', 'trainer', 'manager'", primaryKey: false, nullable: false },
        { name: "created_at", type: "TIMESTAMP", description: "Timestamp of registration", primaryKey: false, nullable: false }
      ]
    },
    {
      tableName: "classes",
      type: "Relational",
      description: "Stores scheduled gym classes and training sessions.",
      fields: [
        { name: "id", type: "SERIAL (Primary Key)", description: "Auto-incrementing session identifier", primaryKey: true, nullable: false },
        { name: "name", type: "VARCHAR(100)", description: "e.g., HIIT Fusion, Power Lifting", primaryKey: false, nullable: false },
        { name: "trainer_id", type: "UUID (Foreign Key)", description: "References users.id of the trainer leading this class", primaryKey: false, nullable: false },
        { name: "scheduled_at", type: "TIMESTAMP", description: "Date and hour of class session", primaryKey: false, nullable: false },
        { name: "max_capacity", type: "INTEGER", description: "Maximum number of allowed bookings", primaryKey: false, nullable: false }
      ]
    },
    {
      tableName: "bookings",
      type: "Relational",
      description: "Maps student sign-ups to active classes.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", description: "Unique booking record reference", primaryKey: true, nullable: false },
        { name: "class_id", type: "INTEGER (Foreign Key)", description: "References classes.id", primaryKey: false, nullable: false },
        { name: "student_id", type: "UUID (Foreign Key)", description: "References users.id of the trainee booking the slot", primaryKey: false, nullable: false },
        { name: "booked_at", type: "TIMESTAMP", description: "When the booking was requested", primaryKey: false, nullable: false }
      ]
    }
  ],
  apiContract: [
    {
      path: "/api/auth/register",
      method: "POST",
      description: "Register a new user account with a role.",
      requestBody: '{\n  "email": "member@gym.com",\n  "password": "StrongPassword123",\n  "role": "trainee"\n}',
      responseBody: '{\n  "id": "e4a2bc1d-875f-46ef-b203-d6387d8ab439",\n  "email": "member@gym.com",\n  "role": "trainee",\n  "token": "jwt_token_payload_example"\n}'
    },
    {
      path: "/api/classes",
      method: "GET",
      description: "Retrieve a list of scheduled training classes.",
      responseBody: '[\n  {\n    "id": 101,\n    "name": "HIIT Blitz",\n    "trainer_name": "Coach Marcus",\n    "scheduled_at": "2026-08-01T10:00:00Z",\n    "available_slots": 14\n  }\n]'
    },
    {
      path: "/api/bookings",
      method: "POST",
      description: "Book a training class slot.",
      requestBody: '{\n  "class_id": 101\n}',
      responseBody: '{\n  "booking_id": "3c983bc9-f24e-4b68-b7ab-ff7b2b8d4ab2",\n  "status": "confirmed",\n  "class_id": 101\n}'
    }
  ],
  architectureDiagram: {
    nodes: [
      { id: "client", label: "Web Dashboard (React)", type: "Client", x: 150, y: 350 },
      { id: "server", label: "Express API Gateway", type: "Server", x: 450, y: 350 },
      { id: "db", label: "PostgreSQL DB", type: "Database", x: 750, y: 350 }
    ],
    connections: [
      { from: "client", to: "server", label: "REST APIs (JSON)" },
      { from: "server", to: "db", label: "Drizzle ORM Queries" }
    ]
  },
  kanbanTasks: [
    { id: "task_1", title: "Initialize Full-Stack Project", description: "Configure express, setup node modules, write package.json scripts, create local environment configurations (.env).", phase: "Phase 1: Setup", status: "done" },
    { id: "task_2", title: "Setup PostgreSQL Schema & Models", description: "Design table layouts inside Drizzle schema.ts. Formulate index references for user emails and scheduled dates.", phase: "Phase 2: Database", status: "doing" },
    { id: "task_3", title: "Implement Auth API Route", description: "Code server-side bcrypt passport encryption and JWT generation logic inside /api/auth/register.", phase: "Phase 3: APIs", status: "todo" },
    { id: "task_4", title: "Build Interactive Trainee Feed", description: "Construct responsive client views with filter sliders tracking active classes, booked slots, and streak metrics.", phase: "Phase 4: Frontend", status: "todo" }
  ]
};
