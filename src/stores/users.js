import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users',  {
   state: () => {
        const users= {
            0:{
                id: 1,
                firstname: "Jane",
                lastname: "Doe",
                email: "jane@example.com",
                phone: "0722114455",
                location: "Nakuru",
                address: "123, Main Street"
            },
            1:{
                id: 2,
                firstname: "John",
                lastname: "Doe",
                email: "john@example.com",
                phone: "0723414455",
                location: "Nairobi",
                address: "123, Main Street"
            },
            3:{
                id: 1,
                firstname: "Jack",
                lastname: "Doe",
                email: "jack@example.com",
                phone: "0788114455",
                location: "Mombasa",
                address: "123, Main Street"
            },
            4:{
                id: 1,
                firstname: "Joseph",
                lastname: "Doe",
                email: "joseph@example.com",
                phone: "0722114333",
                location: "Nakuru",
                address: "123, Main Street"
            },
            5:{
                id: 1,
                firstname: "Julie",
                lastname: "Doe",
                email: "julie@example.com",
                phone: "0799887755",
                location: "Nairobi",
                address: "345, Main Street"
            }
        }

        return{
            users
        }
   },
   actions:{
       
   },
   persist: true,
})