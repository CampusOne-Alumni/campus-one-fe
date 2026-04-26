import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import { registerAlumni } from '../features/alumni/alumniSlice'
import { useAuth } from '../hooks/useAuth'

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

function TextField({ label, required = false, placeholder, type = 'text', value, onChange }: any) {
  return (
    <label className="form-field">
      <span>
        {label} {required ? <strong>*</strong> : null}
      </span>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} />
    </label>
  )
}

function SelectField({ label, required = false, options, placeholder, value, onChange }: any) {
  return (
    <label className="form-field">
      <span>
        {label} {required ? <strong>*</strong> : null}
      </span>
      <select value={value} onChange={onChange} required={required}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function PasswordField({ label, required = false, helperText, value, onChange }: any) {
  return (
    <label className="form-field password-field">
      <span>
        {label} {required ? <strong>*</strong> : null}
      </span>
      <div className="password-input-wrap">
        <input type="password" value={value} onChange={onChange} required={required} />
      </div>
      {helperText ? <small>{helperText}</small> : null}
    </label>
  )
}



export function RegistrationPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, tenant } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    academicUnit: '',
    graduationYear: '',
    program: '',
    password: '',
    confirmPassword: '',
    consent: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    
    if (!formData.consent) {
      alert('You must accept the Terms and Conditions.')
      return
    }

    try {
      await dispatch(registerAlumni({
        actor_uuid: user.id, // Pulled from useAuth context
        tenant_id: tenant.id, // Pulled from useAuth context
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        academic_unit: formData.academicUnit,
        graduation_year: parseInt(formData.graduationYear),
        program: formData.program || 'Not Specified',
        student_id: formData.studentId,
        is_legacy_registration: false
      })).unwrap()

      alert('Registration successful! Please wait for admin approval.')
      // Redirect or reset form could go here
    } catch (err) {
      alert('Failed to register. Please try again.')
    }
  }

  return (
    <div className="registration-page">
      <header className="registration-topbar">
        <a className="back-link" href="/dashboard" aria-label="Back to dashboard">
          <span aria-hidden="true">←</span>
          <strong>Register</strong>
        </a>
      </header>

      <main className="registration-page-main">
        <section className="registration-hero">
          <h1>Join Our Alumni Network</h1>
          <p>Create an account to access alumni services and stay connected with Campus One</p>
        </section>

        <form className="registration-form" onSubmit={handleSubmit}>
          <section className="registration-section">
            <h2>Personal Info</h2>
            <div className="field-grid single-column">
              <TextField label="First Name" required value={formData.firstName} onChange={(e: any) => handleChange(e, 'firstName')} />
              <TextField label="Middle Name" value={formData.middleName} onChange={(e: any) => handleChange(e, 'middleName')} />
              <TextField label="Last Name" required value={formData.lastName} onChange={(e: any) => handleChange(e, 'lastName')} />
              <TextField label="Email Address" required type="email" value={formData.email} onChange={(e: any) => handleChange(e, 'email')} />
              <TextField label="Phone Number" required placeholder="+63 XXX XXX XXXX" type="tel" value={formData.phone} onChange={(e: any) => handleChange(e, 'phone')} />
            </div>
          </section>

          <section className="registration-section">
            <h2>Academic Info</h2>
            <div className="field-grid single-column">
              <TextField label="Student ID Number" required placeholder="e.g., 2020-12345" value={formData.studentId} onChange={(e: any) => handleChange(e, 'studentId')} />
              <SelectField
                label="Academic Unit Affiliation"
                required
                placeholder="Select your academic unit affiliation"
                options={academicUnits}
                value={formData.academicUnit} 
                onChange={(e: any) => handleChange(e, 'academicUnit')}
              />
              <TextField label="Program (Course)" required placeholder="e.g., BS Computer Science" value={formData.program} onChange={(e: any) => handleChange(e, 'program')} />
              <TextField label="Year of Graduation" required placeholder="e.g., 2024" type="number" value={formData.graduationYear} onChange={(e: any) => handleChange(e, 'graduationYear')} />
            </div>
          </section>

          <section className="registration-section">
            <h2>Account Security</h2>
            <div className="field-grid single-column">
              <PasswordField label="Password" required helperText="At least 8 characters" value={formData.password} onChange={(e: any) => handleChange(e, 'password')} />
              <PasswordField label="Confirm Password" required value={formData.confirmPassword} onChange={(e: any) => handleChange(e, 'confirmPassword')} />
            </div>
          </section>

          <section className="registration-consent">
            <label className="checkbox-row">
              <input type="checkbox" checked={formData.consent} onChange={(e: any) => handleChange(e, 'consent')} />
              <span>
                I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
              </span>
            </label>
          </section>

          <button className="registration-submit" type="submit">
            Create Account
          </button>
        </form>
      </main>
    </div>
  )
}