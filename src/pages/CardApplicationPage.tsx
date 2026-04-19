import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { submitCardApplication } from '../features/alumni/alumniSlice'
import { SectionCard } from '../components/common/SectionCard'

export function CardApplicationPage() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.alumni.status)
  const [reason, setReason] = useState('Employment verification')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await dispatch(submitCardApplication({ reason }))
  }

  return (
    <SectionCard title="Card Application" subtitle="Request or renew your alumni ID">
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Purpose
          <input
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            required
          />
        </label>

        <button className="primary-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit Card Application'}
        </button>
      </form>
    </SectionCard>
  )
}
