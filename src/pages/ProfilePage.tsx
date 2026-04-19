import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateProfile } from '../features/alumni/alumniSlice'
import { SectionCard } from '../components/common/SectionCard'

export function ProfilePage() {
  const dispatch = useAppDispatch()
  const { profile, status } = useAppSelector((state) => state.alumni)

  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    email: profile.email,
    course: profile.course,
    graduationYear: profile.graduationYear,
  })

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await dispatch(updateProfile(formData))
  }

  return (
    <SectionCard title="Profile" subtitle="Manage your alumni record">
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Full Name
          <input
            value={formData.fullName}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, fullName: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Course
          <input
            value={formData.course}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, course: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Graduation Year
          <input
            value={formData.graduationYear}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, graduationYear: event.target.value }))
            }
            required
          />
        </label>

        <button className="primary-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </SectionCard>
  )
}
