import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { submitCardApplication } from '../features/alumni/alumniSlice'
import { SectionCard } from '../components/common/SectionCard'
import { useAuth } from '../hooks/useAuth'

export function CardApplicationPage() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.alumni.status)
  const { user, tenant } = useAuth()
  
  const [applicationType, setApplicationType] = useState<'new' | 'replacement'>('new')
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [idPhotoFileName, setIdPhotoFileName] = useState('')
  const [consentAccepted, setConsentAccepted] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!consentAccepted) {
      return
    }

    await dispatch(
      submitCardApplication({
        reason: applicationType === 'new' ? 'New Card Application' : 'Replacement Card',
        applicationType,
        deliveryMethod,
        idPhotoFileName,
        consentAccepted,
        actor_uuid: user.id,
        tenant_id: tenant.id
      }),
    ).unwrap()
    alert('Card application submitted!')
  }

  return (
    <SectionCard title="Card Application" subtitle="Request or renew your alumni ID">
      <form className="form-grid" onSubmit={onSubmit}>
        <section className="form-block">
          <h3>Card Preview</h3>
          <div className="card-preview-shell">
            <div className="card-preview-face">
              <p>CAMPUS ONE</p>
              <strong>ALUMNI CARD</strong>
            </div>
          </div>
        </section>

        <section className="form-block info-block">
          <h3>Card Application Info</h3>
          <ul>
            <li>For new cards or replacements</li>
            <li>Processing: 5-7 business days</li>
            <li>Validity: Lifetime</li>
            <li>Fee: P300 (pay upon delivery/pick-up)</li>
          </ul>
        </section>

        <section className="form-block">
          <h3>Application Type</h3>

          <div className="option-stack" role="radiogroup" aria-label="Application type">
            <label className="option-item">
              <input
                type="radio"
                name="application-type"
                value="new"
                checked={applicationType === 'new'}
                onChange={() => setApplicationType('new')}
              />
              <span>
                <strong>New Card Application</strong>
                <small>First-time alumni card</small>
              </span>
            </label>

            <label className="option-item">
              <input
                type="radio"
                name="application-type"
                value="replacement"
                checked={applicationType === 'replacement'}
                onChange={() => setApplicationType('replacement')}
              />
              <span>
                <strong>Replacement Card</strong>
                <small>Lost or damaged card</small>
              </span>
            </label>
          </div>
        </section>

        <section className="form-block">
          <h3>Delivery Method</h3>

          <div className="option-stack" role="radiogroup" aria-label="Delivery method">
            <label className="option-item">
              <input
                type="radio"
                name="card-delivery"
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
                name="card-delivery"
                value="delivery"
                checked={deliveryMethod === 'delivery'}
                onChange={() => setDeliveryMethod('delivery')}
              />
              <span>
                <strong>Delivery</strong>
                <small>P150 shipping fee</small>
              </span>
            </label>
          </div>
        </section>

        <section className="form-block">
          <h3>ID Photo</h3>
          <label className="upload-label">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0]
                setIdPhotoFileName(selectedFile ? selectedFile.name : '')
              }}
            />
            <span>{idPhotoFileName || 'Upload 2x2 Photo (JPG, PNG - Max. 5MB)'}</span>
          </label>
        </section>

        <label className="checkbox-row consent-row">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(event) => setConsentAccepted(event.target.checked)}
          />
          <span>
            <strong>DATA PRIVACY NOTICE</strong>
            I authorize Campus One to collect and process my personal information for alumni card
            application purposes in accordance with the Data Privacy Act of 2012.
          </span>
        </label>

        <button className="primary-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit Card Application'}
        </button>
      </form>
    </SectionCard>
  )
}
