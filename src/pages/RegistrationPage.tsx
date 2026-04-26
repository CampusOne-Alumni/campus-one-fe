import Link from 'next/link'

const academicUnits = [
  'College of Arts and Sciences',
  'College of Business and Accountancy',
  'College of Engineering',
  'College of Computer Studies',
  'College of Education',
  'College of Hospitality and Tourism Management',
  'College of Nursing',
  'Graduate School',
]

function TextField({ label, required = false, placeholder, type = 'text' }: { label: string; required?: boolean; placeholder?: string; type?: string }) {
  return (
    <label className="form-field">
      <span>
        {label} {required ? <strong>*</strong> : null}
      </span>
      <input type={type} placeholder={placeholder} />
    </label>
  )
}

function SelectField({ label, required = false, options, placeholder }: { label: string; required?: boolean; options: string[]; placeholder: string }) {
  return (
    <label className="form-field">
      <span>
        {label} {required ? <strong>*</strong> : null}
      </span>
      <select defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function PasswordField({ label, required = false, helperText }: { label: string; required?: boolean; helperText?: string }) {
  return (
    <label className="form-field password-field">
      <span>
        {label} {required ? <strong>*</strong> : null}
      </span>
      <div className="password-input-wrap">
        <input type="password" />
        <button type="button" className="icon-button" aria-label={`Show ${label.toLowerCase()}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2.5 12s3.8-6 9.5-6 9.5 6 9.5 6-3.8 6-9.5 6-9.5-6-9.5-6Z" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        </button>
      </div>
      {helperText ? <small>{helperText}</small> : null}
    </label>
  )
}

function ContactIcon({ type }: { type: 'location' | 'phone' | 'mail' | 'clock' }) {
  if (type === 'location') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.7 6-11a6 6 0 0 0-12 0c0 5.3 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    )
  }

  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 4.8 8.7 8c-.7 1.3-.8 2.7-.2 4l1.5 2.8c.8 1.5 2.4 2.6 4.1 3l2.4.5 1.8-1.8c.4-.4.6-1 .4-1.6l-.7-2.1a1.3 1.3 0 0 0-1.3-.9l-2.5.2c-1.5.1-3-.6-3.8-1.9L8 8.8c-.5-.8-.4-1.9.2-2.6l1.1-1.1-3.8-.3Z" />
      </svg>
    )
  }

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m5 8 7 5 7-5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.2V12l2.5 1.7" />
    </svg>
  )
}

export function RegistrationPage() {
  return (
    <div className="registration-page">
      <header className="registration-topbar">
        <Link className="back-link" href="/dashboard" aria-label="Back to dashboard">
          <span aria-hidden="true">←</span>
          <strong>Register</strong>
        </Link>
      </header>

      <main className="registration-page-main">
        <section className="registration-hero">
          <h1>Join Our Alumni Network</h1>
          <p>Create an account to access alumni services and stay connected with Campus One</p>
        </section>

        <form className="registration-form" onSubmit={(event) => event.preventDefault()}>
          <section className="registration-section">
            <h2>Personal Info</h2>
            <div className="field-grid single-column">
              <TextField label="First Name" required />
              <TextField label="Middle Name" />
              <TextField label="Last Name" required />
              <TextField label="Email Address" required type="email" />
              <TextField label="Phone Number" required placeholder="+63 XXX XXX XXXX" type="tel" />
            </div>
          </section>

          <section className="registration-section">
            <h2>Academic Info</h2>
            <div className="field-grid single-column">
              <TextField label="Student ID Number" required placeholder="e.g., 2020-12345" />
              <SelectField
                label="Academic Unit Affiliation"
                required
                placeholder="Select your academic unit affiliation"
                options={academicUnits}
              />
              <TextField label="Year of Graduation" required placeholder="e.g., 2024" type="number" />
            </div>
          </section>

          <section className="registration-section">
            <h2>Account Security</h2>
            <div className="field-grid single-column">
              <PasswordField label="Password" required helperText="At least 8 characters" />
              <PasswordField label="Confirm Password" required />
            </div>
          </section>

          <section className="registration-consent">
            <label className="checkbox-row">
              <input type="checkbox" />
              <span>
                I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
              </span>
            </label>
          </section>

          <button className="registration-submit" type="submit">
            Create Account
          </button>

          <p className="registration-login-link">
            Already have an account? <a href="#">Log In</a>
          </p>
        </form>

        <footer className="registration-footer">
          <section>
            <h3>Address</h3>
            <p>
              <ContactIcon type="location" />
              <span>
                3F Alumni Relations Center,
                <br />
                One Building,
                <br />
                Campus One, Manila 1015
              </span>
            </p>
          </section>

          <section>
            <h3>Phone Number</h3>
            <p>
              <ContactIcon type="phone" />
              <span>(+63) 945 111 0101 | (+63) 945 010 1111</span>
            </p>
          </section>

          <section>
            <h3>E-mail Address</h3>
            <p>
              <ContactIcon type="mail" />
              <a href="mailto:alumnirelations@campusone.edu.ph">alumnirelations@campusone.edu.ph</a>
            </p>
          </section>

          <section>
            <h3>Office Hours</h3>
            <p>
              <ContactIcon type="clock" />
              <span>Monday to Friday : 9:00 AM to 6:00 PM</span>
            </p>
          </section>

          <div className="registration-footer-rule" />
          <p className="registration-copyright">Copyright 2026</p>
          <p className="registration-copyright">Campus One. Office of Alumni Relations</p>
        </footer>
      </main>
    </div>
  )
}