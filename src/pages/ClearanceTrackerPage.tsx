import { SectionCard } from '../components/common/SectionCard'

const checkpoints = [
  { label: 'Department Head Approval', done: true },
  { label: 'Registrar Verification', done: true },
  { label: 'Library Clearance', done: false },
  { label: 'Finance Confirmation', done: false },
  { label: 'Final Release', done: false },
]

export function ClearanceTrackerPage() {
  return (
    <SectionCard title="Clearance Tracker" subtitle="Monitor each step in real-time">
      <ul className="checkpoint-list">
        {checkpoints.map((checkpoint) => (
          <li key={checkpoint.label} className={checkpoint.done ? 'done' : ''}>
            <span>{checkpoint.done ? 'Done' : 'Pending'}</span>
            <strong>{checkpoint.label}</strong>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
