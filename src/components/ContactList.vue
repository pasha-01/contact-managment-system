<template>
    <h3 class=" justify-content-between align-item-center mb-3">Contacts List</h3>
    <div v-if="contacts.length"> 
        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <ContactItem 
                    v-for="contactlist in contacts"
                    :key="contactlist.name"
                    :contact="contactlist"
                    @delete-contact="$emit('delete-contact', contactlist.name)"
                    @edit-contact="$emit('edit-contact', $event)"
                    />
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="alert alert-secondary"> NO COntacts</div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import ContactItem from '..ContactItem.vue';
import ContactItem from '../components/ContactItem.vue';
import type { IContact } from '../types/IContact';

const props = defineProps<{
    contacts: IContact[]
}>();
// const emit = defineEmits<{
//     (event: 'delete-contact', name: string): void;
//     (event: 'edit-contact', contact: IContact): void;
// }>();
</script>