<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-4">
                <div class="card p-4 ">
                    <h3 class="text-center mb-3"> Login</h3>
                    <div class="mb-3">
                        <input v-model="username" 
                        class="form-control" 
                        placeholder="Username" 
                        autocomplete="username" />
                    </div>
                    <div class="mb-3">
                        <input v-model="password" type="password" 
                        class="form-control" 
                        placeholder="Password" 
                        autocomplete="current-password" />
                    </div>
                    <button class="btn btn-primary w-100" @click="login">Login</button>
                    <div v-if="error" class="text-danger mt-2 small"> {{ error }}</div>
                    <div class="mt-2 text-muted  small text-center "> Try ali and   123</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';  
import { useRouter } from 'vue-router';
const router = useRouter();
const username = ref('');
const password = ref('');   
const error = ref('');
function login (){
    if( username.value ==='ali' && password.value === '123'){
        localStorage.setItem('authorized', 'dummy'); 
        localStorage.setItem('LoggedInUser', username.value);
        router.push('/contacts');  
    } else {
        error.value = 'Invalid username or password';
    }
}

</script>