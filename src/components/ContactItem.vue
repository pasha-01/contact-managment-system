<template>
    <tr class="contact-row">
        <!-- <td>{{ contact.name }}</td> -->
        <td class="d-flex align-items-center">
            <div class="contact-avatar me-4" 
            :style="{ backgroundColor: getRandomColor(contact.name) }">
                {{ contact.name.charAt(0).toUpperCase() }}
            </div>
            {{ contact.name }}
        </td>

        <td>{{ contact.email }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.address }}</td>

        <td class="text-end actions-cell">
            <div class="action-buttons">
                <button type="button" class="btn btn-light btn-sm rounded-circle" @click.stop="startEdit"
                    aria-label="Edit contact" title="Edit">
                    <i class="bi bi-pencil-square"></i>
                </button>

                <div class="dropdown">
                    <button class="btn btn-light btn-sm rounded-circle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <button class="dropdown-item text-dark" @click="$emit('delete-contact', contact)">
                                <i class="bi bi-trash pe-3"></i> Delete
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
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

function getRandomColor(name: string) {
  // Use a hash to make it deterministic per name
  const colors = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFA07A', '#9370DB', '#F4A460', '#40E0D0'];
  const hash = name.charCodeAt(0) + name.length; // simple hash
  return colors[hash % colors.length];
}

</script>

<style scoped>
/* .contact-row:hover {
    background-color: #AABBCC !important;
    transition: background-color 0.3s ease;
} */

.table-hover>tbody>tr.contact-row:hover {
    background-color: #AABBCC;
}


.contact-row td {
    border-bottom: none !important;
}

/* hide by default (no layout shift) */
.action-buttons {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(4px);
    transition: opacity 150ms ease, transform 150ms ease;
    display: inline-flex;
    gap: 6px;
    align-items: center;
}

/* show only when the row is hovered */
.contact-row:hover .action-buttons,
.contact-row:focus-within .action-buttons {
    /* keyboard accessible */
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
}

/* circular icon buttons */
.icon-btn {
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* tighten icon size if needed */
.icon-btn i {
    font-size: 1rem;
    line-height: 1;
}

.contact-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
}

</style>
