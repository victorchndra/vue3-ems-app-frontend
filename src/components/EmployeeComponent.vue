<template>
  <div>
    <div>
        <h2 class="text-center text-2xl font-bold mb-4">{{ employeeId ? 'Update Employee' : 'Add Employee'}}</h2>
        <form>
            <div class="flex flex-col">
                <label>First Name:</label>
                <input type="text" placeholder="Enter First Name..." name="firstName" 
                    :class="{'border px-4 py-2 rounded-full mt-1 ': true, 'border-red-500': isSubmitting && errors.firstName}"
                    v-model="firstName"/>
                <span v-if="isSubmitting && errors.firstName" class="text-red-500 text-xs mb-2">{{ errors.firstName }}</span>
            </div>
            <div class="flex flex-col">
                <label>Last Name:</label>
                <input type="text" placeholder="Enter Last Name..." name="lastName" 
                    :class="{'border px-4 py-2 rounded-full mt-1' : true, 'border-red-500': isSubmitting && errors.lastName}"
                    v-model="lastName"/>
                <span v-if="isSubmitting && errors.lastName" class="text-red-500 text-xs mb-2">{{ errors.lastName }}</span>
            </div>
            <div class="flex flex-col">
                <label>Email:</label>
                <input type="email" placeholder="Enter Email..." name="email" 
                    :class="{'border px-4 py-2 rounded-full mt-1': true, 'border-red-500': isSubmitting && errors.email}"
                    v-model="email"/>
                <span v-if="isSubmitting && errors.email" class="text-red-500 text-xs mb-2">{{ errors.email }}</span>
            </div>
            <button class="btn btn-primary btn-sm rounded-full mt-4" @click="saveOrUpdateEmployee">Submit</button>
        </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useRouter } from 'vue-router';

export default {
    setup() {
        // form data
        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');

        // error
        const isSubmitting = ref(false);
        const errors = computed(() => {
            if(!isSubmitting) return {};
            return {
                firstName: firstName.value.trim() ? '' : 'First name is required',
                lastName: lastName.value.trim() ? '' : 'Last name is required',
                email: email.value.trim() ? '' : 'Email is required'
            }
        });
        const valid = computed(() => firstName.value.trim() && lastName.value.trim() && email.value.trim());
        
        // navigation
        const navigate = useRouter();
        
        // fetch id params
        const employeeId = navigate.currentRoute.value.params.id;

        // add or update employee
        const saveOrUpdateEmployee = (e) => {
            e.preventDefault();
            isSubmitting.value = true;

            if(valid.value) {
                const employee = {
                    firstName : firstName.value,
                    lastName : lastName.value,
                    email : email.value
                };

                if(employeeId) {
                    updateEmployee(employeeId, employee)
                        .then((res) => {
                            console.log(res.data);
                            navigate.push('/employees');
                        })
                        .catch(err => console.error(err));
                } else {
                    createEmployee(employee)
                        .then((res) => {
                            console.log(res.data);
                            navigate.push('/employees');
                        })
                        .catch(err => console.error(err));
                }

            }
        }

        // Get data by Id, Update form
        watchEffect(() => {
            if(employeeId) {
                getEmployee(employeeId)
                    .then((res) => {
                        firstName.value = res.data.firstName;
                        lastName.value = res.data.lastName;
                        email.value = res.data.email;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });

        return {
            firstName,
            lastName,
            email,
            saveOrUpdateEmployee,
            errors,
            isSubmitting,
            employeeId
        }
    }
}
</script>

<style>

</style>