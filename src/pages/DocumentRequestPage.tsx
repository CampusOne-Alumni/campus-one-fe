import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { submitDocumentRequest } from '../features/alumni/alumniSlice'
import { SectionCard } from '../components/common/SectionCard'
import { useAuth } from '../hooks/useAuth'

export function DocumentRequestPage() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.alumni.status)
  const { user, tenant } = useAuth()

  const [documentType, setDocumentType] = useState('')
  const [numberOfCopies, setNumberOfCopies] = useState(1)
  const [purpose, setPurpose] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'courier'>('pickup')
  const [consentAccepted, setConsentAccepted] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!consentAccepted) {
      return
    }

    await dispatch(
      submitDocumentRequest({
        documentType,
        notes: purpose,
        numberOfCopies,
        purpose,
        deliveryMethod,
        consentAccepted,
        actor_uuid: user.id,
        tenant_id: tenant.id
      }),
    ).unwrap()
    alert('Document request submitted!')

    setPurpose('')
  }

  return (
    <SectionCard title="Document Request" subtitle="Submit official document requests">
      <form className="form-grid" onSubmit={onSubmit}>
        <section className="form-block">
          <h3>Document Details</h3>

          <label>
            Document Type *
            <select
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
              required
            >
              <option value="" disabled>
                Select document type
              </option>
              <option>Transcript of Records</option>
              <option>Diploma</option>
              <option>Certificate of Graduation</option>
              <option>Certificate of Enrollment</option>
            </select>
          </label>

          <label>
            Number of Copies *
            <input
              type="number"
              min={1}
              value={numberOfCopies}
              onChange={(event) => setNumberOfCopies(Number(event.target.value) || 1)}
              required
            />
          </label>

          <label>
            Purpose of Request *
            <textarea
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              rows={4}
              placeholder="e.g., Employment, Further Studies"
              required
            />
          </label>
        </section>

        <section className="form-block">
          <h3>Delivery Method</h3>

          <div className="option-stack" role="radiogroup" aria-label="Delivery method">
            <label className="option-item">
              <input
                type="radio"
                name="document-delivery"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={() => setDeliveryMethod('pickup')}
              />
              <span>
                <strong>Pick-up at Office</strong>
                <small>FREE</small>
              </span>
            </label>

            <label className="option-item">
              <input
                type="radio"
                name="document-delivery"
                value="courier"
                checked={deliveryMethod === 'courier'}
                onChange={() => setDeliveryMethod('courier')}
              />
              <span>
                <strong>Courier Delivery</strong>
                <small>P150 shipping fee</small>
              </span>
            </label>
          </div>
        </section>

        <label className="checkbox-row consent-row">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(event) => setConsentAccepted(event.target.checked)}
          />
          <span>
            <strong>DATA PRIVACY NOTICE</strong>
            I authorize Campus One to collect and process my personal information for document
            request purposes in accordance with the Data Privacy Act of 2012.
          </span>
        </label>

        <button className="primary-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </SectionCard>
  )
}
