import { useQuery } from "@vue/apollo-composable";
import { ref, watchEffect } from "vue";
import { useAuthStore } from "@/stores/token";
import gql from "graphql-tag";

const authStore = useAuthStore();

export function useAccessDetails(id: number, startDate: string, endDate: string) {
    const GET_ACCESOS_DETAILS = gql`
        query Datos($params: DatosArgs!, $token: String!, $accesoId: Int) {
            datos(params: $params, _token: $token, accesoId: $accesoId) {
                plaza_id
                acceso_id
                entradas
                fecha
            }
        }
    `;

    const variables = ref({
        params: {
            id: id,
            tipo: "days",
            salidas: 0,
            orden: "desc",
            inicio: startDate,
            fin: endDate,
        },
        token: authStore.apiKey,
    });

    const { result: accesosDetailsResult, loading: accesosDetailsLoading, onError: accesosDetailsOnError } = useQuery(GET_ACCESOS_DETAILS, variables);

    // Error handling for second query
    accesosDetailsOnError((error) => {
        console.error('Error fetching plaza details:', error);
    });

    // Access plaza details in your template
    const accesosDetails = ref(accesosDetailsResult.value ? accesosDetailsResult.value.datos : []);

    watchEffect(() => {
        accesosDetails.value = accesosDetailsResult.value ? accesosDetailsResult.value.datos : [];
    });

    // Function to refetch access details with new dates
    function fetchAccessDetails(newStartDate: string, newEndDate: string) {
        variables.value.params.inicio = newStartDate;
        variables.value.params.fin = newEndDate;
        // Fetch data again
        // This could be done with a separate useQuery hook or by refetching the existing query
    }

    // Function to get access with most entries
    function getAccessWithMostEntries() {
        let maxEntries = -Infinity;
        let accessWithMostEntries = null;

        accesosDetails.value.forEach(access => {
            if (access.entradas > maxEntries) {
                maxEntries = access.entradas;
                accessWithMostEntries = access;
            }
        });

        return accessWithMostEntries;
    }

    // Funcion para agrupar los accesos por fecha
    function groupAccessByDate() {
        let groupedAccess = {};
        accesosDetails.value.forEach(access => {
            if (groupedAccess[access.fecha]) {
                groupedAccess[access.fecha].push(access);
            } else {
                groupedAccess[access.fecha] = [access];
            }
        });
        return groupedAccess;
    }

    return {
        accesosDetails,
        accesosDetailsLoading,
        accesosDetailsOnError,
        fetchAccessDetails, // Ensure that fetchAccessDetails is included in the return object
        getAccessWithMostEntries,
        groupAccessByDate
    };
}
