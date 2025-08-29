<template>
    <form @submit.prevent="submitForm">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-sm-8 col-8 mb-3">
                    <div class="d-flex">
                        <button type="button" class="btn btn-light me-2" @click="goBack">
                            <i class="bi bi-arrow-left"></i>
                        </button>

                        <contact class="name">
                            <strong>
                                {{ form.name ? form.name : 'New Contact' }}
                            </strong>
                        </contact>
                    </div>

                </div>
                <div class="col-lg-8 col-sm-8 col-8 mb-3 d-flex justify-content-center">
                    <!-- <button type="submit" class="btn btn-primary border-rounded justify-content-start" :disabled="!isFormFilled">
                        Save
                    </button> -->
                    <button type="submit" :class="isFormFilled ? 'btn btn-primary' : 'btn btn-secondary'"
                        :disabled="!isFormFilled" class="border-rounded justify-content-start">
                        Save
                    </button>

                </div>
            </div>

            <div class="row justify-content-start">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-8 mb-3 form-group">
                              <i class="bi bi-person input-icon ps-2"></i>    
                            <input type="text"  v-model="form.name" required placeholder="" />
                            <label>Name</label>
                        </div>

                        
                        <div class="col-md-8 mb-3 form-group">
                              <i class="bi bi-envelope input-icon ps-2"></i>    
                            <input type="text" v-model="form.email" required placeholder="" />
                            <label>Email</label>
                        </div>
                        <div class="col-md-8 mb-3 form-group">
                              <i class="bi bi-telephone input-icon ps-2"></i>    
                            <input v-model="phoneString" required placeholder="" />
                            <label type="text">Phone Number</label>
                        </div>
                        <div class="col-md-8 mb-3 form-group">
                              <i class="bi bi-geo-alt input-icon ps-2"></i>    

                            <input type="text" v-model="form.address" required placeholder="" />
                            <label>Address</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { IContact } from '../types/IContact';
import { computed } from 'vue';

const props = defineProps<{
    initialContact: IContact | null
}>();

const emit = defineEmits<{
    (event: 'save', contact: IContact): void;
    (event: 'cancel'): void;
}>();

const emptyForm: IContact = { name: '', email: '', phone: 0, address: '' };
const form = ref<IContact>({ ...emptyForm });
const phoneString = ref('');

// keep original 'form' variable name and 'submitForm' + 'goBack' functions
watch(
    () => props.initialContact,
    (val) => {
        form.value = { ...(val || emptyForm) };
        phoneString.value = val?.phone != null ? String(val.phone) : '';
    },
    { immediate: true }
);


function submitForm() {
    if (!form.value.name || !form.value.email) return;
    const phone = Number(phoneString.value);
    form.value.phone = isNaN(phone) ? 0 : phone;
    emit('save', { ...form.value });
}

function goBack() {
    emit('cancel');
}

const isFormFilled = computed(() => {
    return (
        form.value.name.trim() !== '' ||
        form.value.email.trim() !== ''
    );
});


</script>

<style scoped>
/* no changes */
.btn {
    border-radius: 20px;
}

.name {
    padding-top: 7px;
    padding-left: 7px;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
}

.form-group input {
    width: 100%;
    height: 40px;
    padding: 12px 12px 12px 20px;
    /* add left padding 20px */
    border: 2px solid rgb(11, 87, 208);
    border-radius: 5px;
    outline: none;
    transition: all 0.2s;
}

.form-group label {
    position: absolute;
    top: 12px;
    left: 30px;
    /* match input padding */
    color: #aaa;
    pointer-events: none;
    transition: 0.2s;
}

.form-group input:focus+label,
.form-group input:not(:placeholder-shown)+label {
    top: -8px;
    left: 16px;
    /* slightly smaller to fit nicely */
    font-size: 12px;
    color: #555;
    background-color: white;
    padding: 0 4px;
}

.input-icon {
  position: absolute;
  left: -30px; /* Push icon outside the input */
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #6c757d;
}

</style>
