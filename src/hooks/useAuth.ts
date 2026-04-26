/**
 * TODO (Pio): When integrating this module into SPRINT4/frontend,
 * replace this dummy hook with the actual `useAuth` hook exported by the 
 * Universal Login Module to fetch the real Supabase user session and tenant_id.
 */
export function useAuth() {
  return {
    user: {
      id: crypto.randomUUID(), // Stubbed actor_uuid
      email: 'test@example.com'
    },
    tenant: {
      id: 'campus_one' // Stubbed tenant_id
    }
  }
}
