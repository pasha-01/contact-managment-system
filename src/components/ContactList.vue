<template>
    <h6 class=" justify-content-between mb-3 fw-normal fs-4 lh-base">Contacts</h6>
    <div v-if="contacts && contacts.length">
        <div class="table-responsive">
            <table class="table align-middle table-hover ">
                <thead class="border-bottom border-dar  ">
                    <tr>
                        <th style="font-weight: normal;">Name</th>
                        <th style="font-weight: normal;">Email</th>
                        <th style="font-weight: normal;">Phone</th>
                        <th style="font-weight: normal;">Address</th>
                        <!-- <th style="font-weight: normal;">Actions</th> -->
                        <th style="font-weight: normal;display: flex; gap: 8px; justify-content: flex-end; align-items: center; ">
                            <button class="icon-btn me-2">
                                <i class="bi bi-printer"></i>
                            </button>
                            <button class="icon-btn me-2">
                                <i class="bi bi-file-earmark-arrow-up"></i>
                            </button>
                            <button class="icon-btn">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <p><b> Contact</b></p>
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
tr:hover {
    background-color: skyblue;
}

p {
    padding-top: 5px;
}

.icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s;
}

.icon-btn:hover {
    background-color: #c2e7ff;
}
.table td {
  max-width: 150px;         
  white-space: nowrap;      
  overflow: hidden;          
  text-overflow: ellipsis;   
}


</style>
