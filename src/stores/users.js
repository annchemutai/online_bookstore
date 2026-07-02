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
                id: 3,
                firstname: "Jack",
                lastname: "Doe",
                email: "jack@example.com",
                phone: "0788114455",
                location: "Mombasa",
                address: "123, Main Street"
            },
            4:{
                id: 4,
                firstname: "Joseph",
                lastname: "Doe",
                email: "joseph@example.com",
                phone: "0722114333",
                location: "Nakuru",
                address: "123, Main Street"
            },
            5:{
                id: 5,
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
        addUser(payload) {
            //get the last key in the users object
            const existingKeys = Object.keys(this.users).map(Number);
            const maxKey = existingKeys.length > 0 ? Math.max(...existingKeys) : 0;
            const nextKey = maxKey + 1;

            //insert into object
            this.users[nextKey] = {
                ...payload,
                id: nextKey
            };
        },
        editUser(id, payload) {
            // find the book in the object
            const user = Object.entries(this.users).find(
                ([key, item]) => item.id === id //compare the ids
            );

            if (!user) {
                console.error(`No user found with id: ${id}`);
                return;
            }

            const [objectKey] = user;

            //replace the existing user data with what was received in payload
            this.users[objectKey] = {
                ...this.users[objectKey], 
                ...payload
            };
        },
        deleteUser(id) {
            const user = Object.entries(this.users).find(
                ([key, item]) => item.id === id
            );
            if (!user) {
                console.error(`Cannot delete: No user found id: ${id}`);
                return;
            }

            const [objectKey] = user;

            delete this.users[objectKey];
        }
   },
   persist: true,
})