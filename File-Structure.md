# Muttville Schedules App Analysis

## Summary
Muttville Schedules is a Next.js application designed to manage and track senior dogs for Muttville Senior Dog Rescue. It allows users to add new dogs, view dog profiles, log activities, and manage schedules for dog care.

## Major Functions
1. User Authentication (using Clerk)
2. Add New Dogs
3. View Dog Profiles
4. Log Dog Activities
5. View Activity Calendar
6. Analytics Dashboard

## File and Folder Structure

muttville-app/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   ├── add-dog/
│   │   └── page.tsx
│   ├── api/
│   │   ├── activities/
│   │   │   └── route.ts
│   │   └── dogs/
│   │       └── route.ts
│   ├── dashboard/
│   │   ├── activities/
│   │   │   └── page.tsx
│   │   ├── dogs/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── fonts/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── form/
│   │   └── ActivityForm.tsx
│   ├── ui/
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   ├── ActivityLog.tsx
│   ├── AnalyticsDashboard.tsx
│   ├── CareCalendar.tsx
│   └── Header.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── clerk.ts
│   ├── supabase.ts
│   └── utils.ts
├── public/
│   ├── muttville-logo.png
│   └── ... (other public assets)
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── ... (other root-level files)

## supabase db schema

### Dogs Table
- **id**: UUID (Primary Key)
- **name**: Text
- **age**: Integer
- **breed**: Text
- **health_status**: Text
- **status**: Text (e.g., 'Adoptable', 'Foster', 'Medical Care')
- **notes**: Text
- **created_at**: Timestamp (default now())

### Activities Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **walker_id**: UUID (Foreign Key to Users)
- **activity_type**: Text (e.g., 'Walk', 'Feeding')
- **notes**: Text
- **created_at**: Timestamp (default now())

### Users Table
- Managed by Clerk, but you can sync user data to Supabase if needed.

### Medications Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **type**: Text
- **dose**: Text
- **frequency**: Text
- **last_administered_at**: Timestamp
- **created_at**: Timestamp (default now())

### Health Status Updates Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **symptoms**: Text
- **behavior_changes**: Text
- **concerns**: Text
- **updated_at**: Timestamp (default now())

### Veterinary Appointments Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **appointment_date**: Timestamp NOT NULL
- **vet_recommendations**: Text
- **follow_up_instructions**: Text
- **created_at**: Timestamp (default now())

### Chronic Conditions Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **condition_name**: Text NOT NULL
- **diagnosis_date**: Date
- **management_plan**: Text
- **created_at**: Timestamp (default now())

### Emergency Alerts Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **alert_message**: Text NOT NULL
- **alert_date**: Timestamp DEFAULT NOW()
- **resolved**: Boolean DEFAULT FALSE
- **created_at**: Timestamp DEFAULT NOW()

### Feeding Schedules Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **feeding_time**: Timestamp NOT NULL
- **portion_size**: Text NOT NULL
- **created_at**: Timestamp DEFAULT NOW()

### Dietary Restrictions Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **restriction_type**: Text NOT NULL
- **details**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Water Intake Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **amount_ml**: Integer NOT NULL
- **intake_time**: Timestamp NOT NULL
- **created_at**: Timestamp DEFAULT NOW()

### Exercise Logs Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **exercise_type**: Text NOT NULL
- **duration_minutes**: Integer
- **exercise_time**: Timestamp NOT NULL
- **notes**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Mobility Assistance Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **assistance_type**: Text NOT NULL
- **equipment_needed**: Text
- **details**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Rest Periods Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **rest_start_time**: Timestamp NOT NULL
- **rest_end_time**: Timestamp
- **notes**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Behavioral Changes Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **description**: Text NOT NULL
- **date_logged**: Timestamp DEFAULT NOW()
- **created_at**: Timestamp DEFAULT NOW()

### Socialization Logs Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **interaction_type**: Text NOT NULL
- **with_whom**: Text
- **date**: Timestamp DEFAULT NOW()
- **created_at**: Timestamp DEFAULT NOW()

### Comfort Measures Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **measure_type**: Text NOT NULL
- **description**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Cognitive Enrichment Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **activity_type**: Text NOT NULL
- **description**: Text
- **date**: Timestamp DEFAULT NOW()
- **created_at**: Timestamp DEFAULT NOW()

### Grooming and Hygiene Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **grooming_type**: Text NOT NULL
- **date**: Timestamp NOT NULL
- **notes**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Bathroom Breaks Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **time**: Timestamp NOT NULL
- **notes**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Environmental Adjustments Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **adjustment_type**: Text NOT NULL
- **description**: Text
- **date**: Timestamp DEFAULT NOW()
- **created_at**: Timestamp DEFAULT NOW()

### Preferences Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **preference_type**: Text NOT NULL
- **description**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Task Assignments Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **user_id**: UUID (Foreign Key to Users) ON DELETE SET NULL
- **task_type**: Text NOT NULL
- **assigned_date**: Timestamp DEFAULT NOW()
- **status**: Text DEFAULT 'Pending'
- **created_at**: Timestamp DEFAULT NOW()

### Shift Handoffs Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **from_user_id**: UUID (Foreign Key to Users) ON DELETE SET NULL
- **to_user_id**: UUID (Foreign Key to Users) ON DELETE SET NULL
- **shift_date**: Timestamp DEFAULT NOW()
- **notes**: Text
- **created_at**: Timestamp DEFAULT NOW()

### Communication Logs Table
- **id**: UUID (Primary Key)
- **dog_id**: UUID (Foreign Key to Dogs)
- **user_id**: UUID (Foreign Key to Users) ON DELETE SET NULL
- **message**: Text NOT NULL
- **date_logged**: Timestamp DEFAULT NOW()
- **created_at**: Timestamp DEFAULT NOW()

## Additional Notes
- **Real-Time Updates**: The `app/dashboard/dogs/page.tsx` utilizes Supabase's real-time subscriptions to reflect changes instantly.
- **Authentication**: Handled via Clerk, integrated in the `(auth)` directory.
- **UI Components**: Reusable components are organized under `components/ui/` for consistency and maintainability.
- **API Routes**: Located under `app/api/` with separate folders for `activities` and `dogs`.
- **Styles**: Global styles are managed in `app/globals.css`, with Tailwind CSS configured.
- **Typescript**: The project is fully typed, ensuring type safety across the codebase.
- **State Management**: Uses React hooks like `useState` and `useEffect` for state management and side effects.
- **Error Handling**: Basic error logging is implemented, especially in data fetching functions.
- **Deployment**: Configurations for deployment are set in `next.config.mjs` and the project is ready to be deployed on platforms like Vercel.


