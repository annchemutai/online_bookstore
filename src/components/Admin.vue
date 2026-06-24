<script setup>
import {ref} from 'vue'
import { useBooksStore } from '../stores/books'
import { useUsersStore } from '../stores/users'
import { useOrdersStore } from '../stores/orders'

const booksStore = useBooksStore()
const usersStore = useUsersStore()
const ordersStore = useOrdersStore()

const books= booksStore.books
const users = usersStore.users
const orders = ordersStore.orders

//map helps to access each nested object using Object.values
const allOrders = Object.values(orders).map(order => { 
    const book = Object.values(books).find(book => book.id === order.book_id);
    const user = Object.values(users).find(user => user.id === order.customer_id);
    return {
        ...order,

        // ?: tenary operator is the same as a condiotional statement
        customer: user ? user.firstname + ' '+  user.lastname: 'Unknown User',
        bookName: book ? book.name : 'Unknown Book',
        price: book ? book.price : '0'
        
    };
});

const tab = ref(null)

</script>

<template>
    <v-container class=" mt-12 bg-secondary">
        <v-card>
            <v-tabs v-model="tab" align-tabs="center" color="primary" >
                <v-tab :value="1">Books</v-tab>
                <v-tab :value="2">Users</v-tab>
                <v-tab :value="3">Orders</v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
                <!-- Books -->
                <v-tabs-window-item :value="1">
                    <div v-if="books == null||books==undefined||Object.keys(books).length == 0" align="center">
                        <v-row>
                            <v-col cols="12" md="6" sm="12" >
                                <div class="text-h6">No books found</div>
                            </v-col>
                            <v-col cols="12" md="6" sm="12" >
                                <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddUserDialog = true"></v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-else>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12" sm="12" align="right">
                                    <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddUserDialog = true"></v-btn>
                                </v-col>
                            </v-row>
                        <v-row>
                        <v-col>
                            <v-table class="border">
                                <thead>
                                    <tr>
                                        <th class="text-left"> Name </th>
                                        <th class="text-left"> Price </th>
                                        <th class="text-left"> Author </th>
                                        <th class="text-left"> Genre </th>
                                        <th class="text-center" colspan="3"> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in books" :key="item.id" >
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.price }}</td>
                                        <td>{{ item.author }}</td>
                                        <td>{{ item.genre }}</td>
                                        <td> <v-btn color="warning" size="small"><v-icon icon="mdi-eye" ></v-icon> View</v-btn> </td>
                                        <td> <v-btn color="blue" size="small" @click="editBook(item)"><v-icon icon="mdi-pencil" ></v-icon> Edit</v-btn> </td>
                                        <td> <v-btn color="error" size="small"><v-icon icon="mdi-delete" ></v-icon> Delete</v-btn> </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                        </v-container>
                    </div>
                </v-tabs-window-item>
               
                <!-- Users -->
                <v-tabs-window-item :value="2">
                    <div v-if="users == null||users==undefined||Object.keys(users).length == 0" align="center">
                        <v-row>
                            <v-col cols="12" md="6" sm="12" >
                                <div class="text-h6">No users found</div>
                            </v-col>
                            <v-col cols="12" md="6" sm="12" >
                                <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddUserDialog = true"></v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-else>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12" sm="12" align="right">
                                    <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddUserDialog = true"></v-btn>
                                </v-col>
                            </v-row>
                        <v-row>
                        <v-col>
                            <v-table class="border">
                                <thead>
                                    <tr>
                                        <th class="text-left"> First Name </th>
                                        <th class="text-left"> Last Name </th>
                                        <th class="text-left"> Email </th>
                                        <th class="text-left"> Phone </th>
                                        <th class="text-left"> Location </th>
                                        <th class="text-left"> Address </th>
                                        <th class="text-center" colspan="3"> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in users" :key="item.id" >
                                        <td>{{ item.firstname }}</td>
                                        <td>{{ item.lastname }}</td>
                                        <td>{{ item.email }}</td>
                                        <td>{{ item.phone }}</td>
                                        <td>{{ item.location }}</td>
                                        <td>{{ item.address }}</td>
                                        <td> <v-btn color="warning" size="small"><v-icon icon="mdi-eye" ></v-icon> View</v-btn> </td>
                                        <td> <v-btn color="blue" size="small" @click="editBook(item)"><v-icon icon="mdi-pencil" ></v-icon> Edit</v-btn> </td>
                                        <td> <v-btn color="error" size="small"><v-icon icon="mdi-delete" ></v-icon> Delete</v-btn> </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                        </v-container>
                    </div>
                </v-tabs-window-item>

                <!-- Orders -->
                <v-tabs-window-item :value="3">
                    <div v-if="orders == null||orders==undefined||Object.keys(orders).length == 0" align="center">
                        <v-row>
                            <v-col cols="12" md="6" sm="12" >
                                <div class="text-h6">No orders found</div>
                            </v-col>
                            <v-col cols="12" md="6" sm="12" >
                                <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddUserDialog = true"></v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-else>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12" sm="12" align="right">
                                    <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddUserDialog = true"></v-btn>
                                </v-col>
                            </v-row>
                        <v-row>
                        <v-col>
                            <v-table class="border">
                                <thead>
                                    <tr>
                                        <th class="text-left"> Customer </th>
                                        <th class="text-left"> Book </th>
                                        <th class="text-left"> Price </th>
                                        <th class="text-left"> Quantity </th>
                                        <th class="text-left"> Total </th>
                                        <th class="text-left"> Status </th>
                                        <th class="text-center" colspan="3"> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in allOrders" :key="item.id" >
                                        <td>{{ item.customer }}</td>
                                        <td>{{ item.bookName }}</td>
                                        <td>{{ item.price }}</td>
                                        <td>{{ item.quantity }}</td>
                                        <td>{{ item.total_paid }}</td>
                                        <td>{{ item.status }}</td>
                                        <td> <v-btn color="warning" size="small"><v-icon icon="mdi-eye" ></v-icon> View</v-btn> </td>
                                        <td> <v-btn color="blue" size="small" @click="editBook(item)"><v-icon icon="mdi-pencil" ></v-icon> Edit</v-btn> </td>
                                        <td> <v-btn color="error" size="small"><v-icon icon="mdi-delete" ></v-icon> Delete</v-btn> </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                        </v-container>
                    </div>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card>
    </v-container>
</template>