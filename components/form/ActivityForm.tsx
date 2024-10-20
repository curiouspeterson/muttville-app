import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@clerk/nextjs'
import { Activity, Dog } from '@/types/Dog'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useToast } from '@/hooks/use-toast'
import { useStore } from '@/hooks/useStore'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ActivityForm({ dogId }: { dogId: string }) {
  const { toast } = useToast()
  const setActivities = useStore((state) => state.setActivities)
  const { userId } = useAuth() // Retrieve the current user's ID

  const formik = useFormik({
    initialValues: {
      activityType: '',
      notes: '',
      temperamentNotes: '',
    },
    validationSchema: Yup.object({
      activityType: Yup.string().required('Activity type is required'),
      notes: Yup.string().required('Notes are required'),
      temperamentNotes: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { error } = await supabase.from('activities').insert({
        dog_id: dogId,
        walker_id: userId,
        activity_type: values.activityType,
        notes: values.notes,
        temperament_notes: values.temperamentNotes,
      })
      if (error) {
        console.error('Error logging activity:', error)
        toast({
          title: 'Error',
          description: 'There was a problem logging the activity.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: 'Activity logged successfully.',
          variant: 'default', // Changed from 'success' to 'default'
        })
        resetForm()
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
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
        {/* Add more options as needed */}
      </select>
      {formik.touched.activityType && formik.errors.activityType ? (
        <div className="text-red-500 text-sm">{formik.errors.activityType}</div>
      ) : null}

      <textarea
        id="notes"
        name="notes"
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Notes"
      />
      {formik.touched.notes && formik.errors.notes ? (
        <div className="text-red-500 text-sm">{formik.errors.notes}</div>
      ) : null}

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
        {formik.touched.temperamentNotes && formik.errors.temperamentNotes ? (
          <div className="text-red-500 text-sm">{formik.errors.temperamentNotes}</div>
        ) : null}
      </div>
      <button type="submit">Log Activity</button>
    </form>
  )
}
