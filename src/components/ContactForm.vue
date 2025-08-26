<template>
    <form @submit.prevent="submitForm">
        <div class="container">
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
        <div class="text-align-between ps-2">
            <button type="button" class="btn btn-secondary me-2" @click="goBack">Back</button>
            <button type="submit" class="btn btn-success text-center me-2">Save </button>
            <span class="ms-2 text-muted small">
                <br>Fields marked * are required.</span>
        </div>
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
watch(() => props.initialContact, (val) => {
    if (val) {
        form.value = { ...val };
        phoneString.value = val.phone != null ? String(val.phone) : '';
    } else {
        form.value = { ...emptyForm };
        phoneString.value = '';
    }
}, { immediate: true });

function submitForm() {
    if (!form.value.name || !form.value.email) return;
    const parsed = Number(phoneString.value);
    form.value.phone = Number.isNaN(parsed) ? 0 : parsed;
    emit('save', { ...form.value });
}

function goBack() {
    emit('cancel');
}
</script>

<style scoped>
/* no changes */
</style>
