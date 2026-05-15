import { useState } from 'react'
import type { ReactNode } from 'react'

type IconType = 'lock' | 'bell' | 'mail' | 'shield' | 'download'

function SettingIcon({ type }: { type: IconType }) {
  if (type === 'lock') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V8a4 4 0 0 1 8 0v2" />
      </svg>
    )
  }

  if (type === 'bell') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 9a4 4 0 1 1 8 0v3.2c0 .8.3 1.6.9 2.2l1 1.1H6.1l1-1.1c.6-.6.9-1.4.9-2.2V9" />
        <path d="M10 17a2 2 0 0 0 4 0" />
      </svg>
    )
  }

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="m5 8 7 5 7-5" />
      </svg>
    )
  }

  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.4 2.7 8.5 7 10 4.3-1.5 7-5.6 7-10V6l-7-3Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v9" />
      <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
      <path d="M5 18h14" />
    </svg>
  )
}

type SettingRowProps = {
  icon: IconType
  title: string
  description: string
  action?: ReactNode
  clickable?: boolean
  href?: string
}

function SettingRow({ icon, title, description, action, clickable = false, href }: SettingRowProps) {
  const content = (
    <>
      <span className="setting-icon-wrap" aria-hidden="true">
        <SettingIcon type={icon} />
      </span>

      <span className="setting-copy">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>

      {action ?? <span className="setting-chevron" aria-hidden="true">&gt;</span>}
    </>
  )

  if (href) {
    return (
      <a className={`setting-row setting-row-link ${clickable ? 'clickable' : ''}`} href={href}>
        {content}
      </a>
    )
  }

  return <div className={`setting-row ${clickable ? 'clickable' : ''}`}>{content}</div>
}

function Toggle({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      className={`setting-toggle ${checked ? 'on' : ''}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
    >
      <span />
    </button>
  )
}

export function SettingsPage() {
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <section className="profile-main-layout" aria-label="Settings">
      <aside
        className="section-card settings-card"
        aria-label="Notifications and privacy settings"
      >
        <header>
          <h2>Settings</h2>
          <p>Manage account notifications and privacy.</p>
        </header>

        <div className="settings-group">
          <h3>Account</h3>
          <SettingRow
            icon="lock"
            title="Change Password"
            description="Update your account password"
            clickable
            href="#"
          />
        </div>

        <div className="settings-group">
          <h3>Notifications</h3>
          <SettingRow
            icon="bell"
            title="Push Notifications"
            description="Receive app notifications"
            action={
              <Toggle
                checked={pushNotifications}
                onToggle={() => setPushNotifications((prev) => !prev)}
                label="Toggle push notifications"
              />
            }
          />
          <SettingRow
            icon="mail"
            title="Email Notifications"
            description="Receive updates via email"
            action={
              <Toggle
                checked={emailNotifications}
                onToggle={() => setEmailNotifications((prev) => !prev)}
                label="Toggle email notifications"
              />
            }
          />
        </div>

        <div className="settings-group">
          <h3>Privacy &amp; Security</h3>
          <SettingRow
            icon="shield"
            title="Privacy Policy"
            description="View our privacy policy"
            clickable
            href="#"
          />
          <SettingRow
            icon="shield"
            title="Terms &amp; Conditions"
            description="View terms of service"
            clickable
            href="#"
          />
          <SettingRow
            icon="download"
            title="Download My Data"
            description="Export your personal data"
            clickable
            href="#"
          />
        </div>

        <button className="signout-btn" type="button">
          Log Out
        </button>
      </aside>
    </section>
  )
}
