import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest } from '../../services/api'

type AlumniProfile = {
  fullName: string
  email: string
  course: string
  graduationYear: string
}

type AlumniState = {
  profile: AlumniProfile
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AlumniState = {
  profile: {
    fullName: '',
    email: '',
    course: '',
    graduationYear: '',
  },
  status: 'idle',
  error: null,
}

export const registerAlumni = createAsyncThunk(
  'alumni/registerAlumni',
  async (payload: {
    actor_uuid: string
    tenant_id: string
    first_name: string
    middle_name?: string
    last_name: string
    email: string
    phone: string
    academic_unit: string
    graduation_year: number
    program: string
    is_legacy_registration?: boolean
    student_id?: string
    proof_reference?: string
    document_url?: string
  }) => {
    return apiRequest<{ success: boolean }>('/api/v1/alumni/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
)

export const updateProfile = createAsyncThunk(
  'alumni/updateProfile',
  async (profile: AlumniProfile & { actor_uuid?: string }) => {
    // Note: This expects the backend to handle the actor_uuid from body if not in URL
    await apiRequest('/api/v1/alumni/profile/update', {
      method: 'POST',
      body: JSON.stringify(profile),
    })

    return profile
  },
)

export const submitCardApplication = createAsyncThunk(
  'alumni/submitCardApplication',
  async (payload: {
    reason: string
    applicationType?: 'new' | 'replacement'
    deliveryMethod?: 'pickup' | 'delivery'
    idPhotoFileName?: string
    consentAccepted?: boolean
    actor_uuid?: string
    tenant_id?: string
  }) => {
    return apiRequest<{ success: boolean }>('/api/v1/alumni/cards/apply', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
)

export const submitDocumentRequest = createAsyncThunk(
  'alumni/submitDocumentRequest',
  async (payload: {
    documentType: string
    notes: string
    numberOfCopies?: number
    purpose?: string
    deliveryMethod?: 'pickup' | 'courier'
    consentAccepted?: boolean
    actor_uuid?: string
    tenant_id?: string
  }) => {
    return apiRequest<{ success: boolean }>('/api/v1/alumni/records/request', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
)

const alumniSlice = createSlice({
  name: 'alumni',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to update profile'
      })
      .addCase(submitCardApplication.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(submitCardApplication.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(submitCardApplication.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to submit card application'
      })
      .addCase(submitDocumentRequest.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(submitDocumentRequest.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(submitDocumentRequest.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to submit document request'
      })
  },
})

export default alumniSlice.reducer
