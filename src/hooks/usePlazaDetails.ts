import {useQuery} from "@vue/apollo-composable";
import {ref, watchEffect} from "vue";
import {useAuthStore} from "@/stores/token";
import gql from "graphql-tag";

const authStore = useAuthStore();

export function usePlazaDetails() {
    const GET_PLAZA_DETAILS = gql`
  query Query($token: String!, $idPlaza: Int) {
    plazas(_token: $token, idPlaza: $idPlaza) {
      id
      name
      accesos {
        name
        id
      }
    }
  }
`;

    const { result: plazaDetailsResult, loading: plazaDetailsLoading, onError: plazaDetailsOnError } = useQuery(GET_PLAZA_DETAILS, {
        token: authStore.apiKey,
    });
// Error handling for second query
    plazaDetailsOnError((error) => {
        console.error('Error fetching plaza details:', error);
    });
// Access plaza details in your template
    const plazaDetails = ref(plazaDetailsResult.value ? plazaDetailsResult.value.plazas : []);

    watchEffect(() => {
        plazaDetails.value = plazaDetailsResult.value ? plazaDetailsResult.value.plazas : [];
    });

    return {
        plazaDetails,
        plazaDetailsLoading,
    };
}

