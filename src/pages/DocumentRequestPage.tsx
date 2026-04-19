import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { submitDocumentRequest } from '../features/alumni/alumniSlice'
import { SectionCard } from '../components/common/SectionCard'

export function DocumentRequestPage() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.alumni.status)

  const [documentType, setDocumentType] = useState('Transcript of Records')
  const [notes, setNotes] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await dispatch(submitDocumentRequest({ documentType, notes }))
    setNotes('')
  }

  return (
    <SectionCard title="Document Request" subtitle="Submit official record requests">
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Document Type
          <select value={documentType} onChange={(event) => setDocumentType(event.target.value)}>
            <option>Transcript of Records</option>
            <option>Diploma</option>
            <option>Certificate of Graduation</option>
          </select>
        </label>

        <label>
          Notes
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
          />
        </label>

        <button className="primary-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </SectionCard>
  )
}
