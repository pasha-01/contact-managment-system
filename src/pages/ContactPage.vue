<template>
    <div class="container-fluid py-4 bg-light">
        <div class="container-fluid">
            <div class="row ">
                <div class=" col-lg-3  col-sm-3  mb-4 d-none d-sm-block">
                    <!-- <button type="button" 
                         class="custom-create-btn text-black" 
                         @click="openCreate"> -->
                         <button type="button"
                            class="custom-create-btn text-black"
                             :class="{ active: selectedOption === 'create' }"
                              @click="handleCreate">
                             <i class="bi bi-plus fs-5 text-dark"></i>
                                 Create contact
                        </button>
                    <br /><br />
                        <input type="radio" 
                                class="btn-check" 
                                name="options" 
                                id="btn2"
                                value="contacts" 
                                v-model="selectedOption"  
                                autocomplete="off">
                            <label 
                                class="btn custom-btn" 
                                :class="{ active: selectedOption === 'contacts' }"
                                for="btn2" 
                                @click="goToContacts">
                                <i class="bi bi-person me-2"></i> 
                                Contacts
                            </label>


                    <input 
                             type="radio" 
                             class="btn-check" 
                             name="options" 
                             id="btn1"
                             value="frequent" 
                             v-model="selectedOption"
                             autocomplete="off">
                         <label 
                            class="btn custom-btn" 
                            :class="{ active: selectedOption === 'frequent' }"
                            for="btn1">
                            <i class="bi bi-people me-2"></i> 
                            Frequent
                        </label>


                    <input 
                            type="radio" 
                            class="btn-check" 
                            name="options"
                            id="btn3" 
                            value="othercontacts" 
                            v-model="selectedOption"
                            autocomplete="off">
                        <label 
                            class="btn custom-btn" 
                            :class="{ active: selectedOption === 'othercontacts' }"
                            for="btn3">
                            <i class="bi bi-star me-2"></i> 
                            Other Contacts
                        </label>

                    <p><strong>Fix and Manage</strong></p>

                    <input 
                            type="radio" 
                            class="btn-check"
                            name="options" 
                            id="btn5"
                            value="merge" 
                            v-model="selectedOption" 
                            autocomplete="off">
                        <label 
                            class="btn custom-btn"
                            :class="{ active: selectedOption === 'merge' }" 
                            for="btn5">
                            <i class="bi bi-intersect me-2"></i> 
                            Merge
                        </label>

                    <input 
                            type="radio" 
                            class="btn-check" 
                            name="options" 
                            id="btn4" 
                            value="import" 
                            v-model="selectedOption" 
                            autocomplete="off">
                        <label 
                            class="btn custom-btn"
                            :class="{ active: selectedOption === 'import' }"  
                            for="btn4">
                            <i class="bi bi-box-arrow-in-down me-2"></i>
                            Import
                        </label>


                    <input 
                            type="radio" 
                            class="btn-check" 
                            name="options" 
                            id="btn6"
                            value="trash" 
                            v-model="selectedOption" 
                            autocomplete="off">
                        <label 
                            class="btn custom-btn"
                            :class="{ active: selectedOption === 'trash' }" 
                            for="btn6">
                            <i class="bi bi-trash me-2"></i> 
                            Trash
                        </label>
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
const selectedOption = ref('contacts');

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

function goToContacts() {
    mode.value = 'list';
    router.push({name:'ContactPage'});
}
function openCreate() {
    selectedContact.value = { name: '', email: '', phone: 0, address: '' };
    originalName.value = null;
    mode.value = 'form';
}

function openEdit(contact: IContact) {
    selectedContact.value = { ...contact };
    originalName.value = contact.name;
    mode.value = 'form';
}

function saveContact(loadContact: IContact) {
    if (!originalName.value) {
        contacts.value.push({ ...loadContact });
    } else {
        const index = contacts.value.findIndex(cont => cont.name === originalName.value);
        if (index !== -1) contacts.value[index] = { ...loadContact };
        else contacts.value.push({ ...loadContact }); // fallback
    }

    sortContactsArray(contacts.value);
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
    selectedContact.value = null;
    originalName.value = null;
    mode.value = 'list';
}

function cancelEdit() {
    selectedContact.value = null;
    originalName.value = null;
    mode.value = 'list';
}

function deleteContact(contact: IContact) {
    const confirmed = confirm(`Delete contact "${contact.name}"?`);
    if (!confirmed) return;
    contacts.value = contacts.value.filter(cont => cont.name !== contact.name);
    
}

function handleCreate() {
    selectedOption.value = 'create';
    openCreate();
}
</script>


<style scoped>
.custom-col {
    background-color: white;
    color: #333;
}

.scrollable-content {
    max-height: 510px;
    overflow-y: auto;
    padding-right: 10px;
}

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
    font-weight: normal; 
    transition: all 0.2s ease-in-out;
}

.custom-btn.active {
    background-color: #c2e7ff;
        font-weight: bold;

}

#buttonGroup .btn.btn-outline-info:hover {
    background-color: #c2e7ff;
    color: black;
}

#buttonGroup .btn.btn-outline-info:focus {
    background-color: #a0d8ff;
    color: black;
}

.custom-btn:hover {
    background-color: #c2e7ff;
    cursor: pointer;
}

input[type="radio"]:not(:checked)+.custom-btn:hover {
    background-color: #c2e7ff;
    color: black !important;
    border-color: transparent;
    width: 250px;
}
input[type="radio"]:checked + .custom-btn {
    font-weight: bold;      
    background-color: #c2e7ff; 
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
}

.custom-create-btn:hover {
    background-color: #b1dcfa;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.custom-create-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.custom-create-btn.active {
    background-color: #c2e7ff;
    font-weight: bold;
}
</style>
