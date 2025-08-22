<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-item-center mb-3">
            <h2 class="m-0"> Contacts </h2>
            <input v-model="search" 
            class="form-control" 
            style="max-width:260px"
            placeholder="Search name/emial/phonr"/>
        </div>
        <ContactForm @add-contact="addContact"  class="mb-4"/>
        <ContactList
        :contacts ="filteredContacts"
        @delete-contact="deleteContact"
        @edit-contact="editContact"
        />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted,computed,watch  } from "vue"
// import ContactForm from "..ContactForm.vue";
// import ContactList from "..ContactList.vue";
import ContactForm from "../components/ContactForm.vue";
import ContactList from "../components/ContactList.vue";
import type { IContact } from "../types/IContact";

const contacts = ref<IContact[]>([]);
const search = ref("");

onMounted(()=>{
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
        contacts.value = JSON.parse(storedContacts);
    }
})

const filteredContacts = computed(() => {
  return contacts.value.filter(contact =>
    contact.name.includes(search.value) ||
    contact.email.includes(search.value) ||
    contact.phone.toString().includes(search.value)
  )
})

// function filteredContacts() {
//   return contacts.value.filter(contact =>
//     contact.name.includes(search.value) ||
//     contact.email.includes(search.value) ||
//     contact.phone.toString().includes(search.value)
//   )
// }

    
function  addContact(contact: IContact) {
    contacts.value.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts.value));
        
}

function deleteContact(name : string) {
    contacts.value = contacts.value.filter(contact=> contact .name !== name);
    alert(`Contact ${name} deleted successfully`);
    localStorage.setItem("contacts", JSON.stringify(contacts.value));
}
    
function editContact(updatedContact: IContact){
    const index = contacts.value.findIndex(
        contact => contact === updatedContact || 
        contact.name === updatedContact.name);


    //  If the contact is found, update it
    //  If not found, index will be -1
    // if (index !== -1) 
    // {
    //     contacts.value[index] = {...updatedContact};

    // }

} 



</script>