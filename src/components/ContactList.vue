<template>
    <h6 class=" justify-content-between mb-3 fw-normal fs-4 lh-base">Contacts</h6>
    <div v-if="contacts && contacts.length">
        <div class="table-responsive">
            <table class="table align-middle table-hover">
                <thead class="border-bottom border-dar ">
                    <tr>
                        <th style="font-weight: normal;">Name</th>
                        <th style="font-weight: normal;">Email</th>
                        <th style="font-weight: normal;">Phone</th>
                        <th style="font-weight: normal;">Address</th>
                        <th style="font-weight: normal;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <ContactItem v-for="contact in contacts" :key="contact.name" :contact="contact"
                        @edit-contact="$emit('edit-contact', $event)"
                        @delete-contact="$emit('delete-contact', $event)" />
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="alert alert-secondary "> No Contacts</div>
</template>

<script setup lang="ts">
import ContactItem from './ContactItem.vue';
import type { IContact } from '../types/IContact';

const props = defineProps<{
    contacts: IContact[]
}>();
</script>

<style scoped>
/* remove cursor pointer on hover so rows don't appear clickable */
tr:hover {
    background-color: skyblue;
}
</style>
