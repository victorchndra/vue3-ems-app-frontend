<template>
  <div class="w-full flex items-center justify-center">
    <div class="flex flex-col justify-center items-center space-y-4">
        <h2 class="text-2xl font-bold underline self-start">List of Employees</h2>
        <button @click="addNewEmployee" class="btn btn-sm btn-info text-white rounded-full self-start">Add Employee</button>
        <div class="overflow-x-auto">
            <table class="table table-zebra table-sm">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="index">
                        <td>{{ employee.id }}</td>
                        <td>{{ employee.firstName }}</td>
                        <td>{{ employee.lastName }}</td>
                        <td>{{ employee.email }}</td>
                        <td>
                            <button class="btn btn-sm btn-accent rounded-full text-white" 
                                @click="updateEmployee(employee.id)">Update
                            </button>
                            <button class="btn btn-sm btn-secondary rounded-full text-white ml-2" 
                                @click="removeEmployee(employee.id)">Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { deleteEmployee, listEmployees } from '../services/EmployeeService.js';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const employees = ref([]);
        const router = useRouter();

        const addNewEmployee = () => {
            router.push('/add-employee');
        }
        
        const updateEmployee = (id) => {
            router.push(`/edit-employee/${id}`);
        }

        const getAllEmployees = () => {
            listEmployees().then((res) => {
                employees.value = res.data
            }).catch(err => console.error(err))
        }

        const removeEmployee = (id) => {
            deleteEmployee(id).then(() => {
                getAllEmployees();
            }).catch(err => console.error(err))
        }

        onMounted(getAllEmployees);

        return { 
            employees, 
            addNewEmployee,
            updateEmployee,
            removeEmployee
        };
    }
}
</script>

<style scoped>

</style>