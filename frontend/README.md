## Voice Agent Analytics Dashboard (Frontend)

- A modern React + TypeScript analytics dashboard built as part of the Frontend Development Assessment.
The application simulates a SaaS-style call analytics platform where users can view, customize, and persist analytics data in a safe and user-friendly way.

- The UI and experience are inspired by modern analytics products such as superbryn.com.


**Live URL:**
```bash

    https://<your-project-name>.vercel.app
```

**GitHub Repository**

- Repository URL:
```bash
  https://github.com/sarthak03dot/<repo-name>
``` 


### Features


**Analytics Dashboard**

- Call Duration Analysis (Area Chart)

- Sad Path Analysis (Pie Chart)

- Clean and modern SaaS-style UI

- Email-Based Personalization

- Users must enter an email before modifying analytics

- Email is used to identify and persist user-specific data

- Editable Analytics

- Users can edit call duration values directly

- Real-time chart updates based on user input

**Overwrite Protection**

- Previously saved values are fetched from the database

- Users can review and edit existing values before overwriting

- Prevents accidental data loss

**Data Persistence**

- Supabase is used as a backend service

- Analytics data is stored against the user’s email

- Uses UPSERT logic to safely handle duplicates

** Tech Stack**
- Technology	Purpose
- React	UI Development
- TypeScript	Type Safety
- Tailwind CSS	Styling
- Recharts	Data Visualization
- Supabase	Database & Persistence
- Vite	Build Tool


### Vercel	Deployment
**Key Design Decisions**


- Email-based identification instead of full authentication to keep the app lightweight

- Editable overwrite modal to ensure transparency and better UX

- UPSERT strategy for reliable data updates without duplicates

- Component-based architecture for scalability and maintainability

### Project Structure
    src/
    ├── components/
    │   ├── charts/
    │   │   ├── CallDurationChart.tsx
    │   │   └── SadPathChart.tsx
    │   ├── EmailModal.tsx
    │   └── OverwriteConfirmModal.tsx
    ├── data/
    │   └── dummyData.ts
    ├── api/
    │   └── supabase.ts
    ├── pages/
    │   └── Dashboard.tsx
    ├── App.tsx
    └── main.tsx

### Setup Instructions
**Clone the Repository**
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```
**Install Dependencies**
```bash
npm install
```
**Configure Environment Variables**

- Create a .env file in the root directory:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
``` 
**Run the Project Locally**
```bash
npm run dev
```

### Supabase Database Schema
create table chart_data (
  email text primary key,
  values jsonb not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);


Row Level Security (RLS) is disabled for simplicity in this assessment.

###  Deployment

- The project is deployed using Vercel:

- Connect GitHub repository to Vercel

- Add environment variables

### Deploy

    Assessment Requirements Mapping
    Requirement	Status
    ReactJS + TypeScript	
    Analytics charts	
    Dummy data	
    Editable chart values	
    Email-based persistence	
    Overwrite confirmation	
    Supabase integration	
    Hosted frontend	

🙌 Thank You

Thank you for reviewing this submission.
Looking forward to your feedback!