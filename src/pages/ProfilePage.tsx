

import { useState } from 'react'

type ContactInfo = {
  email: string
  contactNumber: string
  mailingAddress: string
}

const initialContactInfo: ContactInfo = {
  email: 'jertznaval57@gmail.com',
  contactNumber: '09171234567',
  mailingAddress: 'Street, Barangay, City, Province',
}

export function ProfilePage() {
  const [isEditingContact, setIsEditingContact] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [contactDraft, setContactDraft] = useState<ContactInfo>(initialContactInfo)

  const handleContactAction = () => {
    if (!isEditingContact) {
      setIsEditingContact(true)
      return
    }

    setIsEditingContact(false)
    setShowSuccessModal(true)
  }

  const handleCancelEdit = () => {
    setContactDraft(initialContactInfo)
    setIsEditingContact(false)
  }

  return (
    <section className="profile-main-layout" aria-label="Profile">
      <article className="section-card profile-form-card" aria-label="User information">
        <header>
          <h2>Personal Info</h2>
          <p>Review your profile details and update your contact information when needed.</p>
        </header>

        <div className="form-grid profile-info-grid">
          <div className="profile-name-row">
            <div>
              <span className="required-inline">Last Name</span>
              <p>Doe</p>
            </div>

            <div>
              <span className="required-inline">First Name</span>
              <p>John</p>
            </div>

            <div>
              <span className="required-inline">Middle Initial</span>
              <p>M</p>
            </div>

            <div>
              <span className="required-inline">Suffix</span>
              <p>Jr.</p>
            </div>
          </div>

          <div>
            <span className="required-inline">Birthdate</span>
            <p>January 15, 1998</p>
          </div>

          <div className="profile-academic-row">
            <div>
              <span className="required-inline">Academic Unit</span>
              <p>School of Engineering</p>
            </div>

            <div>
              <span className="required-inline">College Department</span>
              <p>Computer Science</p>
            </div>

            <div>
              <span className="required-inline">Year Graduated</span>
              <p>2020</p>
            </div>
          </div>
        </div>
      </article>

      <article className="section-card profile-form-card" aria-label="Editable contact information">
        <header>
          <h2>Contact Details</h2>
          <p>Only these fields can be edited.</p>
        </header>

        <div className="form-grid">
          <label>
            Email Address
            <input
              className="profile-contact-field"
              type="email"
              value={contactDraft.email}
              onChange={(event) => setContactDraft((current) => ({ ...current, email: event.target.value }))}
              readOnly={!isEditingContact}
              aria-readonly={!isEditingContact}
            />
          </label>

          <label>
            Contact Number
            <input
              className="profile-contact-field"
              type="tel"
              value={contactDraft.contactNumber}
              onChange={(event) => setContactDraft((current) => ({ ...current, contactNumber: event.target.value }))}
              readOnly={!isEditingContact}
              aria-readonly={!isEditingContact}
            />
          </label>

          <label>
            Mailing Address
            <textarea
              className="profile-contact-field"
              rows={3}
              value={contactDraft.mailingAddress}
              onChange={(event) => setContactDraft((current) => ({ ...current, mailingAddress: event.target.value }))}
              readOnly={!isEditingContact}
              aria-readonly={!isEditingContact}
            />
          </label>

          <div className="profile-contact-actions">
            <button className="primary-btn" type="button" onClick={handleContactAction}>
              {isEditingContact ? 'Save Changes' : 'Update Information'}
            </button>

            {isEditingContact ? (
              <button className="ghost-btn profile-cancel-btn" type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </article>

      {showSuccessModal ? (
        <div className="profile-modal-backdrop" role="presentation" onClick={() => setShowSuccessModal(false)}>
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-success-title"
            aria-describedby="profile-success-message"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profile-modal-badge" aria-hidden="true">
              <span>✓</span>
            </div>

            <h3 id="profile-success-title">Information Updated</h3>
            <p id="profile-success-message">Your contact details have been saved successfully.</p>

            <button className="primary-btn profile-modal-button" type="button" onClick={() => setShowSuccessModal(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
