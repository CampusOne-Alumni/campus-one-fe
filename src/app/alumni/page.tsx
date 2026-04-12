'use client';

import React, { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type RegisterForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  lastProgram: string;
  proofReference: string;
  academicUnit: string;
  gradYear: string;
  password: string;
  confirmPassword: string;
};

const initialForm: RegisterForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  studentId: '',
  lastProgram: '',
  proofReference: '',
  academicUnit: '',
  gradYear: '',
  password: '',
  confirmPassword: '',
};

const ACADEMIC_UNITS = [
  'College of Accountancy',
  'College of Architecture',
  'Faculty of Arts and Letters',
  'Faculty of Civil Law',
  'College of Commerce and Business Administration',
  'College of Education',
  'Faculty of Engineering',
  'College of Fine Arts and Design',
  'College of Information and Computing Sciences',
  'Faculty of Medicine and Surgery',
  'Conservatory of Music',
  'College of Nursing',
  'Faculty of Pharmacy',
  'Institute of Physical Education and Athletics',
  'College of Rehabilitation Sciences',
  'College of Science',
  'College of Tourism and Hospitality Management',
  'Ecclesiastical Faculties',
  'Graduate School',
  'Education High School',
  'Junior High School',
  'Senior High School',
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AlumniRegisterPage() {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [isLegacy, setIsLegacy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setField = (key: keyof RegisterForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.academicUnit || !form.gradYear || !form.password || !form.confirmPassword) {
      setError('Please complete all required fields.');
      return;
    }
    if (!isLegacy && !form.studentId) {
      setError('Please enter your Student ID or enable legacy verification.');
      return;
    }
    if (isLegacy && (!form.lastProgram || !form.proofReference)) {
      setError('Please provide your last program and proof reference for manual verification.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/v1/alumni/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actor_uuid: crypto.randomUUID(),
          tenant_id: 'campus-one',
          first_name: form.firstName,
          middle_name: form.middleName || undefined,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          academic_unit: form.academicUnit,
          graduation_year: parseInt(form.gradYear, 10),
          program: form.lastProgram || form.academicUnit,
          is_legacy_registration: isLegacy,
          student_id: isLegacy ? undefined : form.studentId,
          proof_reference: isLegacy ? form.proofReference : undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? 'Registration failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Success State ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="alumni-page">
        <div className="alumni-success-card">
          <div className="alumni-success-icon">✓</div>
          <h1 className="alumni-success-title">Registration Submitted</h1>
          <p className="alumni-success-body">
            Your account request has been received under{' '}
            <strong>{isLegacy ? 'manual alumni verification' : 'student record verification'}</strong>.
            You will receive a confirmation email at <strong>{form.email}</strong>.
          </p>
          <a href="/alumni/login" className="alumni-btn-primary">
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  // ─── Form ───────────────────────────────────────────────────────────────────
  return (
    <main className="alumni-page">
      <div className="alumni-layout">
        {/* Left panel */}
        <aside className="alumni-sidebar">
          <div className="alumni-sidebar-inner">
            <div className="alumni-logo-mark">C1</div>
            <h1 className="alumni-sidebar-title">Join Our Alumni Network</h1>
            <p className="alumni-sidebar-body">
              Create an account to access alumni services and stay connected with Campus One.
            </p>
            <ul className="alumni-sidebar-features">
              <li>📄 Request official documents (TOR, Diploma)</li>
              <li>🪪 Apply for your Alumni ID card</li>
              <li>✅ Track your clearance routing</li>
              <li>🔔 Receive real-time status updates</li>
            </ul>
            <p className="alumni-sidebar-login">
              Already have an account?{' '}
              <a href="/alumni/login" className="alumni-sidebar-link">Log In</a>
            </p>
          </div>
        </aside>

        {/* Form panel */}
        <section className="alumni-form-panel">
          <h2 className="alumni-form-title">Create Account</h2>
          <p className="alumni-form-subtitle">Fill in your details to register as an alumnus.</p>

          {error && <div className="alumni-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate id="alumni-register-form">
            {/* Personal Info */}
            <fieldset className="alumni-fieldset">
              <legend className="alumni-legend">Personal Info</legend>

              <div className="alumni-row">
                <div className="alumni-field">
                  <label htmlFor="firstName" className="alumni-label">First Name <span className="alumni-required">*</span></label>
                  <input id="firstName" type="text" className="alumni-input" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} />
                </div>
                <div className="alumni-field">
                  <label htmlFor="middleName" className="alumni-label">Middle Name</label>
                  <input id="middleName" type="text" className="alumni-input" value={form.middleName} onChange={(e) => setField('middleName', e.target.value)} />
                </div>
                <div className="alumni-field">
                  <label htmlFor="lastName" className="alumni-label">Last Name <span className="alumni-required">*</span></label>
                  <input id="lastName" type="text" className="alumni-input" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} />
                </div>
              </div>

              <div className="alumni-row">
                <div className="alumni-field alumni-field--grow">
                  <label htmlFor="email" className="alumni-label">Email Address <span className="alumni-required">*</span></label>
                  <input id="email" type="email" className="alumni-input" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                </div>
                <div className="alumni-field">
                  <label htmlFor="phone" className="alumni-label">Phone <span className="alumni-required">*</span></label>
                  <input id="phone" type="tel" className="alumni-input" placeholder="+63 XXX XXX XXXX" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                </div>
              </div>
            </fieldset>

            {/* Academic Info */}
            <fieldset className="alumni-fieldset">
              <legend className="alumni-legend">Academic Info</legend>

              {/* Legacy toggle */}
              <label className="alumni-legacy-toggle" htmlFor="legacyToggle">
                <input
                  id="legacyToggle"
                  type="checkbox"
                  checked={isLegacy}
                  onChange={(e) => setIsLegacy(e.target.checked)}
                  className="alumni-checkbox"
                />
                <span>
                  <strong>I do not have a pre-existing student record</strong>
                  <small> — Use manual alumni verification instead of student ID lookup.</small>
                </span>
              </label>

              {!isLegacy && (
                <div className="alumni-field">
                  <label htmlFor="studentId" className="alumni-label">Student ID Number <span className="alumni-required">*</span></label>
                  <input id="studentId" type="text" className="alumni-input" placeholder="e.g. 202012345" value={form.studentId} onChange={(e) => setField('studentId', e.target.value.replace(/\D/g, ''))} />
                </div>
              )}

              {isLegacy && (
                <div className="alumni-row">
                  <div className="alumni-field alumni-field--grow">
                    <label htmlFor="lastProgram" className="alumni-label">Last Program or Course <span className="alumni-required">*</span></label>
                    <input id="lastProgram" type="text" className="alumni-input" placeholder="e.g. BS Information Systems" value={form.lastProgram} onChange={(e) => setField('lastProgram', e.target.value)} />
                  </div>
                  <div className="alumni-field alumni-field--grow">
                    <label htmlFor="proofReference" className="alumni-label">Proof Reference <span className="alumni-required">*</span></label>
                    <input id="proofReference" type="text" className="alumni-input" placeholder="Diploma no., TOR ref, or alumni clearance ref" value={form.proofReference} onChange={(e) => setField('proofReference', e.target.value)} />
                  </div>
                </div>
              )}

              <div className="alumni-row">
                <div className="alumni-field alumni-field--grow">
                  <label htmlFor="academicUnit" className="alumni-label">Academic Unit <span className="alumni-required">*</span></label>
                  <select id="academicUnit" className="alumni-input alumni-select" value={form.academicUnit} onChange={(e) => setField('academicUnit', e.target.value)}>
                    <option value="">Select academic unit</option>
                    {ACADEMIC_UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div className="alumni-field">
                  <label htmlFor="gradYear" className="alumni-label">Year of Graduation <span className="alumni-required">*</span></label>
                  <input id="gradYear" type="number" className="alumni-input" placeholder="e.g. 2024" min={1950} max={2100} value={form.gradYear} onChange={(e) => setField('gradYear', e.target.value)} />
                </div>
              </div>
            </fieldset>

            {/* Account Security */}
            <fieldset className="alumni-fieldset">
              <legend className="alumni-legend">Account Security</legend>
              <div className="alumni-row">
                <div className="alumni-field alumni-field--grow">
                  <label htmlFor="password" className="alumni-label">Password <span className="alumni-required">*</span></label>
                  <div className="alumni-password-wrap">
                    <input id="password" type={showPass ? 'text' : 'password'} className="alumni-input" value={form.password} onChange={(e) => setField('password', e.target.value)} />
                    <button type="button" className="alumni-eye-btn" onClick={() => setShowPass((p) => !p)} aria-label="Toggle password visibility">
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                  <small className="alumni-hint">At least 8 characters</small>
                </div>
                <div className="alumni-field alumni-field--grow">
                  <label htmlFor="confirmPassword" className="alumni-label">Confirm Password <span className="alumni-required">*</span></label>
                  <div className="alumni-password-wrap">
                    <input id="confirmPassword" type={showConfirm ? 'text' : 'password'} className="alumni-input" value={form.confirmPassword} onChange={(e) => setField('confirmPassword', e.target.value)} />
                    <button type="button" className="alumni-eye-btn" onClick={() => setShowConfirm((p) => !p)} aria-label="Toggle confirm password visibility">
                      {showConfirm ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Consent */}
            <label className="alumni-terms-row" htmlFor="agreed">
              <input id="agreed" type="checkbox" className="alumni-checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span className="alumni-terms-text">
                I agree to the <a href="#terms" className="alumni-terms-link">Terms and Conditions</a> and <a href="#privacy" className="alumni-terms-link">Privacy Policy</a> of Campus One.
              </span>
            </label>

            <button id="submit-register" type="submit" className="alumni-btn-primary" disabled={loading}>
              {loading ? 'Submitting…' : 'Create Account'}
            </button>
          </form>
        </section>
      </div>

      <style>{alumniStyles}</style>
    </main>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const alumniStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .alumni-page {
    min-height: 100vh;
    background: #0f0f0f;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .alumni-layout {
    display: flex;
    width: 100%;
    max-width: 1100px;
    background: #1a1a1a;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    min-height: 700px;
  }

  /* Sidebar */
  .alumni-sidebar {
    width: 320px;
    flex-shrink: 0;
    background: linear-gradient(160deg, #F5A623 0%, #e8940f 100%);
    padding: 48px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .alumni-sidebar-inner { max-width: 260px; }
  .alumni-logo-mark {
    width: 52px; height: 52px;
    background: #111;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 800; color: #F5A623;
    margin-bottom: 28px;
  }
  .alumni-sidebar-title { font-size: 26px; font-weight: 800; color: #111; margin: 0 0 14px; line-height: 1.2; }
  .alumni-sidebar-body { font-size: 14px; color: rgba(0,0,0,0.7); line-height: 1.6; margin: 0 0 24px; }
  .alumni-sidebar-features { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; gap: 10px; }
  .alumni-sidebar-features li { font-size: 13px; color: #111; font-weight: 500; }
  .alumni-sidebar-login { font-size: 13px; color: rgba(0,0,0,0.6); margin: 0; }
  .alumni-sidebar-link { color: #111; font-weight: 700; text-decoration: underline; }

  /* Form panel */
  .alumni-form-panel {
    flex: 1;
    padding: 48px 52px;
    overflow-y: auto;
  }
  .alumni-form-title { font-size: 28px; font-weight: 800; color: #fff; margin: 0 0 8px; }
  .alumni-form-subtitle { font-size: 14px; color: #888; margin: 0 0 32px; }

  /* Error */
  .alumni-error {
    background: rgba(220,38,38,0.12);
    border: 1px solid rgba(220,38,38,0.3);
    color: #f87171;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    margin-bottom: 20px;
  }

  /* Fieldset */
  .alumni-fieldset {
    border: 1px solid #2a2a2a;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
  }
  .alumni-legend {
    font-size: 13px;
    font-weight: 700;
    color: #F5A623;
    padding: 0 8px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Field */
  .alumni-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 4px; }
  .alumni-field { display: flex; flex-direction: column; gap: 6px; min-width: 140px; }
  .alumni-field--grow { flex: 1; }
  .alumni-label { font-size: 12px; font-weight: 600; color: #ccc; }
  .alumni-required { color: #f87171; }
  .alumni-input {
    background: #111;
    border: 1.5px solid #2a2a2a;
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 14px;
    color: #fff;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.15s;
    width: 100%;
    box-sizing: border-box;
  }
  .alumni-input:focus { outline: none; border-color: #F5A623; }
  .alumni-input::placeholder { color: #555; }
  .alumni-select { cursor: pointer; }
  .alumni-hint { font-size: 11px; color: #888; margin-top: 2px; }

  /* Password */
  .alumni-password-wrap { position: relative; }
  .alumni-password-wrap .alumni-input { padding-right: 44px; }
  .alumni-eye-btn {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px;
  }

  /* Legacy toggle */
  .alumni-legacy-toggle {
    display: flex; align-items: flex-start; gap: 10px;
    background: #111; border: 1.5px solid #2a2a2a; border-radius: 10px;
    padding: 14px; margin-bottom: 16px; cursor: pointer;
    font-size: 13px; color: #ccc; line-height: 1.5;
  }
  .alumni-legacy-toggle strong { color: #fff; }
  .alumni-legacy-toggle small { color: #888; }

  /* Checkbox */
  .alumni-checkbox { width: 16px; height: 16px; accent-color: #F5A623; flex-shrink: 0; cursor: pointer; margin-top: 2px; }

  /* Terms */
  .alumni-terms-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 24px; cursor: pointer; }
  .alumni-terms-text { font-size: 13px; color: #888; line-height: 1.5; }
  .alumni-terms-link { color: #F5A623; font-weight: 600; text-decoration: underline; }

  /* Primary button */
  .alumni-btn-primary {
    display: block; width: 100%;
    background: #F5A623; color: #111;
    font-size: 16px; font-weight: 800;
    border: none; border-radius: 12px; padding: 16px;
    cursor: pointer; text-align: center; text-decoration: none;
    transition: background 0.15s, transform 0.1s;
    font-family: 'Inter', sans-serif;
  }
  .alumni-btn-primary:hover { background: #e8940f; }
  .alumni-btn-primary:active { transform: scale(0.98); }
  .alumni-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Success card */
  .alumni-success-card {
    background: #1a1a1a;
    border-radius: 24px;
    padding: 56px 48px;
    max-width: 480px;
    width: 100%;
    text-align: center;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  }
  .alumni-success-icon {
    width: 72px; height: 72px; background: #F5A623; color: #111;
    border-radius: 50%; font-size: 32px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
  }
  .alumni-success-title { font-size: 26px; font-weight: 800; color: #fff; margin: 0 0 14px; }
  .alumni-success-body { font-size: 14px; color: #888; line-height: 1.6; margin: 0 0 32px; }

  @media (max-width: 768px) {
    .alumni-layout { flex-direction: column; }
    .alumni-sidebar { width: 100%; padding: 36px 28px; }
    .alumni-form-panel { padding: 36px 28px; }
    .alumni-row { flex-direction: column; }
  }
`;
