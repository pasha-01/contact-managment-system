<template>
    <form @submit.prevent="submitForm" class="card p-3 ">
        <!-- <form > -->
        <div class="container ">
            <div class="row justify-content-center">
                <div class="col-12 col-md-4">

                    <div class="col-12 p-2">
                        <input v-model="form.name" 
                        class="form-control" 
                        placeholder="Name *" required />
                    </div>

                    <div class="col-12 p-2 ">   
                        <input v-model="form.email" type="email" 
                        class="form-control" 
                        placeholder="Email *" required />
                    </div>

                    <div class="col-12 p-2 ">
                        <input v-model="form.phone" 
                        class="form-control" 
                        placeholder="Phone *" required />
                    </div>

                    <div class="col-12 p-2">
                        <input v-model="form.address" 
                        class="form-control" 
                        placeholder="Address" required />
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->

        <div class="mt-3">
            <button class="btn btn-success text-center">Add Contact</button>
            <span class="ms-2 text-muted small">
                <br>Fields marked * are required.</span>
        </div>
    </form>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'
import type { IContact } from '../types/IContact'
const emit = defineEmits<{
    (event: 'add-contact', contact: IContact): void
}>()

const form = ref<IContact>({
    name: '',
    email: '',
    phone: 0,
    address: ''
})

const emptyForm: IContact = {
  name: '',
  email: '',
  phone: 0 ,
  address: ''
}
function submitForm() {
  const { name, email, phone } = form.value
  if (!name || !email || !phone) return
  
  emit('add-contact', { ...form.value })
  form.value = { ...emptyForm }
}


</script>

<style></style>