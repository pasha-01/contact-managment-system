<template>
    <tr class="contact-row">
        <td>{{ contact.name }}</td>
        <td>{{ contact.email }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.address }}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary me-2" @click.stop="startEdit">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click.stop="doDelete">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    </tr>
</template>

<script setup lang="ts">
import type { IContact } from '../types/IContact';

const props = defineProps<{
    contact: IContact
}>();

const emit = defineEmits<{
    (event: 'delete-contact', contact: IContact): void;
    (event: 'edit-contact', contact: IContact): void;
}>();

function startEdit() {
    emit('edit-contact', props.contact);
}

function doDelete() {
    emit('delete-contact', props.contact);
}
</script>

<style scoped>
.contact-row:hover {
    background-color: #f1f9ff;
}

.contact-row td {
    border-bottom: none !important;
}
</style>
