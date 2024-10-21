// Import necessary dependencies and components
import { supabase } from '@/lib/supabase'
import { useAuth } from '@clerk/nextjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useToast } from '@/hooks/use-toast'
import { useStore } from '@/hooks/useStore'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// ActivityForm component for logging dog activities
export default function ActivityForm({ dogId }: { dogId: string }) {
  const { toast } = useToast()
  const { addActivity } = useStore()
  const { userId } = useAuth() // Retrieve the current user's ID for activity logging

  // Initialize formik for form handling and validation
  const formik = useFormik({
    // Set initial form values
    initialValues: {
      activityType: '',
      notes: '',
      temperamentNotes: '',
    },
    // Define validation schema using Yup
    validationSchema: Yup.object({
      activityType: Yup.string().required('Activity type is required'),
      notes: Yup.string().required('Notes are required'),
      temperamentNotes: Yup.string(),
    }),
    // Handle form submission
    onSubmit: async (values, { resetForm }) => {
      // Insert new activity into the database
      const { data, error } = await supabase.from('activities').insert({
        dog_id: dogId,
        walker_id: userId,
        activity_type: values.activityType,
        notes: values.notes,
        temperament_notes: values.temperamentNotes,
      })

      if (error) {
        // Handle error case
        console.error('Error logging activity:', error)
        toast({
          title: 'Error',
          description: 'There was a problem logging the activity.',
          variant: 'destructive',
        })
      } else if (data) {
        // Handle success case
        addActivity(data[0]) // Update local state
        toast({
          title: 'Success',
          description: 'Activity logged successfully.',
          variant: 'default',
        })
        resetForm() // Clear the form after successful submission
      } else {
        // Handle edge case where no error occurred but no data was returned
        toast({
          title: 'Warning',
          description: 'Activity logged, but no data returned.',
          variant: 'default',
        })
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Activity type selection dropdown */}
      <select
        id="activityType"
        name="activityType"
        value={formik.values.activityType}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="">Select Activity</option>
        <option value="Walk">Walk</option>
        <option value="Feeding">Feeding</option>
        {/* Additional activity options can be added here */}
      </select>
      {/* Display validation error for activity type if any */}
      {formik.touched.activityType && formik.errors.activityType ? (
        <div className="text-red-500 text-sm">{formik.errors.activityType}</div>
      ) : null}

      {/* Notes textarea */}
      <textarea
        id="notes"
        name="notes"
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Notes"
      />
      {/* Display validation error for notes if any */}
      {formik.touched.notes && formik.errors.notes ? (
        <div className="text-red-500 text-sm">{formik.errors.notes}</div>
      ) : null}

      {/* Temperament notes section */}
      <div className="space-y-2">
        <Label htmlFor="temperament_notes">Temperament Notes</Label>
        <Textarea
          id="temperament_notes"
          name="temperamentNotes"
          value={formik.values.temperamentNotes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Temperament Notes"
        />
        {/* Display validation error for temperament notes if any */}
        {formik.touched.temperamentNotes && formik.errors.temperamentNotes ? (
          <div className="text-red-500 text-sm">{formik.errors.temperamentNotes}</div>
        ) : null}
      </div>
      {/* Submit button */}
      <button type="submit">Log Activity</button>
    </form>
  )
}
