<template>
    <div class="container">
        <h3 class="mb-4">{{ contact.name }}</h3>
        <div class="row justify-content-start">
            <div class="col-md-12">
                <form @submit.prevent="saveContact" class="card p-3">
                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Name</label>
                            <input v-model="contact.name" class="form-control" placeholder="Name *" required />
                        </div>
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Email</label>
                            <input v-model="contact.email" type="email" class="form-control" placeholder="Email *"
                                required />
                        </div>
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Phone</label>
                            <input v-model="contact.phone" class="form-control" placeholder="Phone *" required />
                        </div>
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Address</label>
                            <input v-model="contact.address" class="form-control" placeholder="Address *" required />
                        </div>
                    </div>
                    <div class="mt-3">
                        <button type="submit" class="btn btn-success text-start me-2">Save</button>
                        <!-- <button type="button" class="btn btn-secondary me-2" @click="cancelEdit">Cancel</button> -->
                        <button type="button" class="btn btn-danger" @click="deleteContact">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IContact } from '../types/IContact';

const route = useRoute();
const router = useRouter();
const contactName = route.params.name as string;

const contacts = ref<IContact[]>([]);
const contact = ref<IContact>({ name: '', email: '', phone: 0, address: '' });

onMounted(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) contacts.value = JSON.parse(storedContacts);
    const existing = contacts.value.find(cont => cont.name === contactName);
    if (existing) contact.value = { ...existing };
});

function saveContact() {
    const index = contacts.value.findIndex(cont => cont.name === contactName);
    if (index !== -1) {
        contacts.value[index] = { ...contact.value };
        localStorage.setItem('contacts', JSON.stringify(contacts.value));
        router.push('/');
    }
}

// function cancelEdit() {
//     router.push('/');
// }

function deleteContact() {
    contacts.value = contacts.value.filter(c => c.name !== contactName);
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
    router.push('/');
}
</script>
