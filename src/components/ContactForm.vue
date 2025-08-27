<template>
    <form @submit.prevent="submitForm">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-sm-8 col-8 mb-3">
                    <div class="d-flex   ps-2">
                        <button type="button" class="btn btn-light me-2" @click="goBack">
                            <i class="bi bi-arrow-left"></i>
                        </button>
                        
                         <contact class="name">
                            <strong>
                        {{ form.name ? form.name : 'New Contact' }}
                        </strong>
                    </contact>
                    </div>
                   
                </div>
                <div class="col-lg-8 col-sm-8 col-8 mb-3 d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary border-rounded justify-content-start">
                        Save
                    </button>
                </div>
            </div>

            <div class="row justify-content-start">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Name</label>
                            <input v-model="form.name" class="form-control" placeholder="Name *" required />
                        </div>
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Email</label>
                            <input v-model="form.email" type="email" class="form-control" placeholder="Email *"
                                required />
                        </div>
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Phone Number</label>
                            <input v-model="phoneString" class="form-control" placeholder="Phone *" required />
                        </div>
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Address</label>
                            <input v-model="form.address" class="form-control" placeholder="Address *" required />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="text-align-between ps-2">
            <button type="button" class="btn btn-secondary me-2" @click="goBack">Back</button>
            <button type="submit" class="btn btn-success text-end me-2">Save </button>
            <span class="ms-2 text-muted small">
                <br>Fields marked * are required.</span>
        </div> -->
    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { IContact } from '../types/IContact';

const props = defineProps<{
    initialContact: IContact | null
}>();

const emit = defineEmits<{
    (event: 'save', contact: IContact): void;
    (event: 'cancel'): void;
}>();

const emptyForm: IContact = { name: '', email: '', phone: 0, address: '' };
const form = ref<IContact>({ ...emptyForm });
const phoneString = ref('');

// keep original 'form' variable name and 'submitForm' + 'goBack' functions
watch(
    () => props.initialContact,
    (val) => {
        form.value = { ...(val || emptyForm) };
        phoneString.value = val?.phone != null ? String(val.phone) : '';
    },
    { immediate: true }
);


function submitForm() {
    if (!form.value.name || !form.value.email) return;
    const phone = Number(phoneString.value);
    form.value.phone = isNaN(phone) ? 0 : phone;
    emit('save', { ...form.value });
}

function goBack() {
    emit('cancel');
}
</script>

<style scoped>
/* no changes */
.btn{
    border-radius: 20px;
}
.name{
    padding-top: 7px;
    padding-left: 7px;
}
</style>
