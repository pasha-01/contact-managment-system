<template>
    <div class="container-fluid py-4 bg-light">
        <div class="container-fluid">
            <div class="row ">
                <div class=" col-lg-3 mb-4">
                    <button type="button" class="text-black"
                        style="background-color:#D3E3FD; color: white; padding: 15px; border-radius: 10px; border: 0;"
                        @click="openCreate">
                        <i class="bi bi-plus fs-5 text-dark"></i>
                        Create contact
                    </button>

                    <br /><br />

                    <button type="button" class=" text-black text-start"
                        style="background-color:#D3E3FD; color: white; padding: 10px; border-radius: 30px; border: 0; width: 250px;">
                        <i class="bi bi-person-lines-fill  me-2"></i><strong> Contacts</strong>
                    </button>
                </div>

                <div class="col-md-9 custom-col border rounded">
                    <div v-if="mode === 'list'">
                        <div class="p-3 ps-4 scrollable-content">
                            <ContactList :contacts="filteredContacts" @edit-contact="openEdit"
                                @delete-contact="deleteContact" />
                        </div>
                    </div>
                    <div v-else>
                        <div class="p-3">
                            <ContactForm :initialContact="selectedContact" @save="saveContact" @cancel="cancelEdit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ContactList from '../components/ContactList.vue';
import ContactForm from '../components/ContactForm.vue';
import type { IContact } from "../types/IContact";

const props = defineProps<{
    search: string
}>()

const contacts = ref<IContact[]>([]);
const selectedContact = ref<IContact | null>(null);
const mode = ref<'list' | 'form'>('list');
const originalName = ref<string | null>(null);

// helper: sort contacts by name A -> Z (case-insensitive)
function sortContactsArray(arr: IContact[]) {
    arr.sort((a, b) => {
        const an = (a?.name || '').toString();
        const bn = (b?.name || '').toString();
        return an.localeCompare(bn, undefined, { sensitivity: 'base', numeric: false });
    });
}

// load contacts from localStorage and sort
onMounted(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
        contacts.value = JSON.parse(storedContacts);
        sortContactsArray(contacts.value);
    }
});

const filteredContacts = computed(() => {
    const q = (props.search || '').toLowerCase();
    if (!q) return contacts.value;
    return contacts.value.filter(contact =>
        (contact.name || '').toLowerCase().includes(q) ||
        (contact.email || '').toLowerCase().includes(q) ||
        (contact.phone != null ? String(contact.phone) : '').includes(q) ||
        (contact.address || '').toLowerCase().includes(q)
    );
});

// open create
function openCreate() {
    selectedContact.value = { name: '', email: '', phone: 0, address: '' };
    originalName.value = null;
    mode.value = 'form';
}

// open edit
function openEdit(contact: IContact) {
    selectedContact.value = { ...contact };
    originalName.value = contact.name;
    mode.value = 'form';
}

// save (create or edit)
function saveContact(payload: IContact) {
    if (!originalName.value) {
        // create
        contacts.value.push({ ...payload });
    } else {
        // edit: find by originalName and replace
        const idx = contacts.value.findIndex(c => c.name === originalName.value);
        if (idx !== -1) contacts.value[idx] = { ...payload };
        else contacts.value.push({ ...payload }); // fallback
    }

    // always sort after changes
    sortContactsArray(contacts.value);

    localStorage.setItem('contacts', JSON.stringify(contacts.value));
    // return to list
    selectedContact.value = null;
    originalName.value = null;
    mode.value = 'list';
}

// cancel -> back to list
function cancelEdit() {
    selectedContact.value = null;
    originalName.value = null;
    mode.value = 'list';
}

// delete
function deleteContact(contact: IContact) {
    const confirmed = confirm(`Delete contact "${contact.name}"?`);
    if (!confirmed) return;
    contacts.value = contacts.value.filter(c => c.name !== contact.name);

    // sort just in case (not strictly needed after a remove, but safe)
    sortContactsArray(contacts.value);

    localStorage.setItem('contacts', JSON.stringify(contacts.value));
    selectedContact.value = null;
    originalName.value = null;
    mode.value = 'list';
}
</script>


<style scoped>
.custom-col {
    background-color: white;
    color: #333;
}

.scrollable-content {
    max-height: 510px;
    /* adjust as needed */
    overflow-y: auto;
    padding-right: 10px;
    /*to avoid scrollbar overlap */
}

/* Optional: nice looking scrollbar */
.scrollable-content::-webkit-scrollbar {
    width: 6px;
}

.scrollable-content::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
}
</style>
