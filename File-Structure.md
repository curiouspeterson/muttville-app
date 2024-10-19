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
