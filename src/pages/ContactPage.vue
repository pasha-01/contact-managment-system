<template>
    <div class="container-fluid py-4 bg-light">
        <div class="container-fluid">
            <div class="row ">
                <div class=" col-lg-3  col-sm-3  mb-4 d-none d-sm-block">
                    <button type="button" class="custom-create-btn text-black" @click="openCreate">
                        <i class="bi bi-plus fs-5 text-dark"></i>
                        Create contact
                    </button>
                    <br /><br />
                    <input type="radio" class="btn-check" name="options" id="btn2" autocomplete="off">
                    <label class="btn custom-btn" for="btn2" @click="goToContacts">
                        <i class="bi bi-person me-2"></i> Contacts</label>

                    <input type="radio" class="btn-check" name="options" id="btn1" autocomplete="off">
                    <label class="btn custom-btn" for="btn1"><i class="bi bi-people me-2"></i> Frequent</label>


                    <input type="radio" class="btn-check" name="options" id="btn3" autocomplete="off">
                    <label class="btn custom-btn" for="btn3"><i class="bi bi-star me-2"></i> Other Contacts</label>

                    <p><strong>Fix and Manage</strong></p>

                    <input type="radio" class="btn-check" name="options" id="btn5" autocomplete="off">
                    <label class="btn custom-btn" for="btn5"><i class="bi bi-intersect me-2"></i> Merge</label>

                    <input type="radio" class="btn-check" name="options" id="btn4" autocomplete="off">
                    <label class="btn custom-btn" for="btn4"><i class="bi bi-box-arrow-in-down me-2"></i>
                        Import</label>


                    <input type="radio" class="btn-check" name="options" id="btn6" autocomplete="off">
                    <label class="btn custom-btn" for="btn6"><i class="bi bi-trash me-2"></i> Trash</label>
                </div>

                <div class="col-md-9 col-sm-9  custom-col border rounded">
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
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps<{
    search: string
}>()

const contacts = ref<IContact[]>([]);
const selectedContact = ref<IContact | null>(null);
const mode = ref<'list' | 'form'>('list');
const originalName = ref<string | null>(null);

function sortContactsArray(contacts: IContact[]) {
    contacts.sort((a, b) =>
        (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base', numeric: false })
    );
}

onMounted(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
        contacts.value = JSON.parse(storedContacts);
        sortContactsArray(contacts.value);
    }
});

const filteredContacts = computed(() => {
    const query = (props.search || '').trim();
    if (!query) return contacts.value;
    return contacts.value.filter(contact =>
        (contact.name || '').includes(query) ||
        (contact.email || '').includes(query) ||
        (contact.phone != null ? String(contact.phone) : '').includes(query) ||
        (contact.address || '').includes(query)
    );
});

// function goToContacts() {
//     router.push('/contacts' );
// }
function goToContacts() {
    mode.value = 'list';
    router.push({name:'ContactPage'});
}
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
function saveContact(loadContact: IContact) {
    if (!originalName.value) {
        // create
        contacts.value.push({ ...loadContact });
    } else {
        // edit: find by originalName and replace
        const index = contacts.value.findIndex(c => c.name === originalName.value);
        if (index !== -1) contacts.value[index] = { ...loadContact };
        else contacts.value.push({ ...loadContact }); // fallback
    }

    // always sort after changes
    sortContactsArray(contacts.value);
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
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
    contacts.value = contacts.value.filter(cont => cont.name !== contact.name);
    // sort just in case (not strictly needed after a remove, but safe)
    // sortContactsArray(contacts.value);
    // localStorage.setItem('contacts', JSON.stringify(contacts.value));
    // selectedContact.value = null;
    // originalName.value = null;
    // mode.value = 'list';
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

p {
    padding-left: 10px;
    padding-top: 10px;
}

.custom-btn {
    background-color: transparent;
    color: black;
    padding: 10px;
    border-radius: 30px;
    border: 0;
    width: 250px;
    text-align: left;
    font-weight: normal; /* Normal by default */
    transition: all 0.2s ease-in-out;
}

.custom-btn.active {
    background-color: #c2e7ff;
    /* Sky blue when active */
}

#buttonGroup .btn.btn-outline-info:hover {
    background-color: #c2e7ff;
    /* sky blue hover */
    color: black;
}

#buttonGroup .btn.btn-outline-info:focus {
    background-color: #a0d8ff;
    /* darker blue on focus */
    color: black;
}

.custom-btn:hover {
    background-color: #c2e7ff;
    /* Hover effect */
    /* color: black !important; */
    cursor: pointer;
}

input[type="radio"]:not(:checked)+.custom-btn:hover {
    background-color: #c2e7ff;
    /* Active background */
    color: black !important;
    border-color: transparent;
    width: 250px;
}
input[type="radio"]:checked + .custom-btn {
    font-weight: bold;       /* Text becomes bold */
    background-color: #c2e7ff; /* Optional: keep hover color */
}


.btn .custom-btn {
    width: 250px;
}

.custom-create-btn {
    background-color: #c2e7ff;
    color: black;
    padding-left: 15px;
    padding-right: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 10px;
    border: 0;
    transition: all 0.2s ease-in-out;
    /* Smooth animation */
}

/* Hover effect */
.custom-create-btn:hover {
    background-color: #b1dcfa;
    /* Slightly darker on hover */
    transform: translateY(-3px);
    /* Lift on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Shadow for floating effect */
}

/* Click (active) effect */
.custom-create-btn:active {
    transform: translateY(0);
    /* Goes back down when clicked */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
