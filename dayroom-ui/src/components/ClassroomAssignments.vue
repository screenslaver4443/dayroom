<template>
    <div>
        <input type="button" value="Authenticate" @click="authenticate" />
        <input type="checkbox" disabled v-model="authenticated" />
        <input type="button" value="Fetch Classroom Assignments" @click="fetchClassroomAssignments" />
        <div v-if="loading == false">
            <div>
                <div v-for="(item, index) in classroomAssignments" v-bind:key="index">
                    <div v-for="(item2, index2) in item.data.courseWork" v-bind:key="index2">
                        <div v-if="checkDate(item2.creationTime)">
                            <a v-bind:href='item2.alternateLink'>
                                <h2>{{ item2.title }}</h2>
                            </a>
                            <p>{{ item2.description }}</p>
                            <p v-if="item2.dueDate" style="color: red;">Due: {{ item2.dueDate.day
                                }}/{{ item2.dueDate.month }}/{{ item2.dueDate.year }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import placeholderData from '@/assets/clssrom return.json'
export default {
    name: 'ClassroomAssignments',
    data() {
        return {
            classroomAssignments: [],
            loading: false,
            authenticated: false,
        };
    },
    methods: {
        checkDate(date) {
            const currentDate = new Date();
            const creationDate = new Date(date);
            return currentDate.getFullYear() == creationDate.getFullYear()
        },
        async authenticate() {
            try {
                const response = await axios.get('http://localhost:3000/generate-auth-url');
                // console.log(response.data.message);
                window.open(response.data.url);
                this.authenticated = true
            }
            catch (error) {
                console.error(error);
            }
        },
        async fetchClassroomAssignments() {
            this.loading = true;
            try {
                const response = await axios.get('http://localhost:3000/fetch-classroom');
                // console.log(response.data);
                this.classroomAssignments = response.data;
            }
            catch (error) {
                console.error(error);
            }
            this.loading = false;
        },
    },
    mounted() {
        // Code to run when the component is mounted
    },
};
</script>

<style scoped>
/* Your component-specific styles here */
</style>