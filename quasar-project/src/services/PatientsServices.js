// services/patientService.js

const API_URL = 'https://oton.cl/api/patient-link-dev/patient'

// Token hardcodeado (no recomendado para producción)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lLTgzIiwiZW1haWwiOiJ0ZXN0XzAwMUBlbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJTdGV2ZSIsImxhc3RuYW1lIjoiQnJvd24iLCJhcHBzIjpbIkRSRU1BQyJdLCJyb2xlcyI6WyJBRE1JTiJdLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTI4VDIzOjE4OjI2LjY0M1oiLCJ1cGRhdGVkQXQiOiIyMDI1LTA1LTA2VDE4OjU1OjU0LjkxMVoiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpZCI6IjY4MTAwY2MyNDU4YmViNmQ2OWM1MzllYyIsImxhc3Rsb2dpbiI6IjIwMjUtMDUtMDhUMTU6MjA6MDYuOTA3WiIsImlhdCI6MTc0NjcxNzYwNywiZXhwIjoxNzQ3NTgxNjA3fQ.Jyejv-qIYFPVL4iRexu4gKvJcdQ_c-cKGjUGzThtLoo'

export async function fetchPatientData() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('❌ Error al obtener datos del paciente:', error)
    throw error
  }
}
