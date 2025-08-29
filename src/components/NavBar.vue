<template>
    <nav class="navbar navbar-dark bg-light">
        <div class="container-fluid d-flex align-items-center">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-3  col-sm-4  col-4">
                        <i class="bi bi-list" style="font-size: 24px;"></i>
                        <span class="navbar-brand text-dark me-3 ps-3 pt-2  ">
                            <i class="bi bi-person-lines-fill me-2"></i>
                            Contact</span>
                    </div>
                    <div class="col-lg-7  col-sm-4 col-4">
                        <form v-if="showSearch" class="d-flex flex-grow-1 me-3" @submit.prevent>
                            <input v-model="searchQuery" @input="onSearch" class="form-control me-2 flex-grow-1"
                                type="search" placeholder="Search" />
                        </form>
                    </div>
                    <div class="col-lg-2 col-sm-4 col-4 ">
                        
                        <i class="bi bi-question-circle-fill pe-3"></i>
                        <i class="bi bi-gear-fill pe-2"></i>
                        <i class="bi bi-grid-3x3-gap-fill pe-4"></i>



                        <button v-if="$route.meta.requiresAuth" class=" btn btn-outline-secondary " @click="logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const emit = defineEmits<{ (event: 'search', value: string): void }>()

const searchQuery = ref('')

const showSearch = computed(() => route.name === 'ContactPage')


function onSearch() {
    emit('search', searchQuery.value)
}

function logout() {
    localStorage.removeItem('LoggedInUser')
    router.push('/login')
}

</script>
