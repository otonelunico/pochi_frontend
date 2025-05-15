<template>
  <q-page class="q-pa-md">
    <!-- Barra de búsqueda para filtrar por nombre o RUT -->
    <q-input v-model="search" label="Buscar por nombre o RUT" filled class="q-mb-md" />

    <!-- Modo escritorio: mostramos la tabla -->
    <div v-if="$q.screen.gt.sm">
      <q-markup-table>
        <thead class="primary">
          <tr>
            <th class="text-left">RUN</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Estado</th>
            <th class="text-left">Telefono</th>
            <th class="text-left">Direccion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient, index) in paginatedPatients" :key="index" class="q-table">
            <td class="text-left">{{ patient.rut }}</td>
            <td class="text-left">{{ patient.fullname }}</td>
            <td class="text-left">
              <p v-if="patient.status === 'ACTIVE'" class="text-positive">
                <q-icon name="check" /> Activo
              </p>
              <p v-else class="text-negative"><q-icon name="cancel" /> Activo</p>
            </td>
            <td class="text-left">{{ patient.phone }}</td>
            <td class="text-left">{{ patient.address }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <!-- Modo móvil: mostramos tarjetas de paciente -->
    <div v-else>
      <q-card v-for="patient in paginatedPatients" :key="patient.id" class="patient-card q-mb-md">
        <q-card-section>
          <div class="text-h6 patient-name">{{ patient.fullname }}</div>
          <div class="text-subtitle2 patient-rut">{{ patient.rut }}</div>
          <div class="text-caption patient-status">{{ patient.status }}</div>
          <div class="text-caption patient-phone">{{ patient.phone }}</div>
          <div class="text-caption patient-address">{{ patient.address }}</div>
        </q-card-section>
      </q-card>
    </div>
    <!-- Selector de número de pacientes por página -->

    <div class="q-pa-lg flex flex-center row">
      <q-select
        filled
        v-model="pageSize"
        :options="pageSizeOptions"
        label="Pacientes por página"
        class="q-mb-md col-3"
      />
    </div>
    <!-- Paginación para la tabla o tarjetas -->
    <q-pagination
      v-model="currentPage"
      :max="totalPages"
      max-pages="10"
      boundary-numbers
      class="q-mt-md pagination"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { fetchPatientData } from 'src/services/PatientsServices'

const $q = useQuasar()

// Estado para guardar los pacientes
const patients = ref([])

// Búsqueda de pacientes por nombre o RUT
const search = ref('')

// Paginación, página actual
const currentPage = ref(1)

// Número de pacientes por página
const pageSize = ref(5)

// Opciones de número de pacientes por página
const pageSizeOptions = ref([5, 10, 15])

// propiedad Computada para filtrar los pacientes según la búsqueda
const filteredPatients = computed(() =>
  patients.value.filter(
    (patient) =>
      patient.fullname.toLowerCase().includes(search.value.toLowerCase()) ||
      patient.rut.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

// Computada para paginar los pacientes mostrados
const paginatedPatients = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredPatients.value.slice(start, start + pageSize.value)
})

// Computada para obtener el total de páginas basado en los pacientes filtrados
const totalPages = computed(() => Math.ceil(filteredPatients.value.length / pageSize.value))

// Al montar el componente, obtenemos los datos de los pacientes
onMounted(async () => {
  try {
    const result = await fetchPatientData()
    patients.value = result.data || []
  } catch (error) {
    console.error('Error al cargar pacientes:', error)
  }
})
</script>

<style scoped>
/* Estilo para la tabla de pacientes en escritorio */
.patients-table {
  max-width: 100%;
  border-collapse: collapse;
}

/* Estilo para las tarjetas de paciente en móviles */
.patient-card {
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

/* Estilos para los textos dentro de las tarjetas */
.patient-name {
  font-size: 18px;
  font-weight: bold;
}

.patient-rut {
  font-size: 14px;
  color: #555;
}

.patient-status,
.patient-phone,
.patient-address {
  font-size: 12px;
  color: #777;
}

/* Estilo para la paginación */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

/* Ajuste para input de búsqueda */
.q-input {
  width: 100%;
}
</style>
