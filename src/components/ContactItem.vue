<template>
    <tr v-if="!edit">
        <td>{{ contact.name }}</td>
        <td>{{ contact.email }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.address }}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary"
             @click="startEdit">Edit
            </button>
            <button class="btn btn-sm btn-outline-danger" 
            @click="emit('delete-contact', contact.name)">Delete
        </button>
        </td>
    </tr>
    <tr v-else>
        <td>
            <input v-model="draft.name" class="form-control" />
        </td>
        <td>
            <input v-model="draft.email" class="form-control" />
        </td>
        <td>
            <input v-model="draft.phone" class="form-control" />
        </td>
        <td>
            <input v-model="draft.address" class="form-control" />
        </td>
        <td>
            <button class="btn btn-sm btn-success" 
                 @click="saveEdit">Save
            </button>
            <button class="btn btn-sm btn-secondary"
                @click="cancelEdit">Cancel
            </button>
        </td>

    </tr>
</template>
<script setup lang="ts">
// import { setup } from 'vue-class-component';
import type { IContact } from '../types/IContact';
import { ref,watch } from 'vue';
//  export default setup(){

const props = defineProps<{
    contact: IContact
}>();
const emit = defineEmits<{
    (event: 'delete-contact', name: string): void;
    (event: 'edit-contact', contact: IContact): void;
}>();


const edit = ref(false)
const draft =ref<IContact>({
    ...props.contact
})

// watch(() => props.contact, (val) => {
//   if (!edit.value) draft.value = { ...val }
// })


function startEdit() {
  draft.value = { ...props.contact }
  edit.value = true
}

function cancelEdit() {
  edit.value = false
  draft.value = { ...props.contact }
}


function saveEdit() {
  if (!draft.value.name || 
  !draft.value.email || 
  !draft.value.phone) 
  return
  emit('edit-contact', { ...draft.value })
  edit.value = false
}
//  }
</script>