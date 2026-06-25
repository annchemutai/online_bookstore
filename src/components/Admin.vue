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
const showAddBookDialog = ref(false)
const showEditBookDialog = ref(false)
const showAddUserDialog = ref(false)
const showEditUserDialog = ref(false)

//books
//1. create models
//2. create a function to add new book
//3. create the add book form

// book models
const bookId = ref(null)
const bookName = ref(null)
const price = ref(null)
const description = ref(null)
const long_description = ref(null)
const genre = ref(null)
const image = ref(null)
const author = ref(null)
const rating = ref(null)

//add new book
function addBook(){
    const bookData = {
        bookId: bookId.value,
        bookName: bookName.value,
        price: price.value,
        description: description.value,
        long_description: long_description.value,
        genre: genre.value,
        image: image.value,
        author: author.value,
        rating: rating.value
    }
    // to do: update books in the store
    const updatedBook = {
        ...books,
        12: bookData
    }
}

//edit book
function editBook(book){
    bookId.value = book.id
    bookName.value = book.name
    price.value = book.price
    description.value = book.description
    long_description.value = book.long_description
    genre.value = book.genre
    image.value = book.image
    author.value = book.author
    rating.value = book.rating
    showEditBookDialog.value = true
}
function updateBook(){
    const bookData = {
        bookId: bookId.value,
        bookName: bookName.value,
        price: price.value,
        description: description.value,
        long_description: long_description.value,
        genre: genre.value,
        image: image.value,
        author: author.value,
        rating: rating.value
    }

    //to do update book

    close()
}

//user models
const userId = ref(null)
const firstname = ref(null)
const lastname = ref(null)
const email = ref(null)
const phone = ref(null)
const location = ref(null)
const address = ref(null)

//add user
function addUser(){
    const data = {
        userId: userId.value,
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        phone: phone.value,
        location: location.value,
        address: address.value,
        password: "qwerty1234..",
        role: 2,
    }
    //to do: add user

    close()
}

//edit user
function editUser(user){
    userId.value = user.id
    firstname.value = user.firstname
    lastname.value = user.lastname
    email.value = user.email
    phone.value = user.phone
    location.value = user.location
    address.value = user.address
    showEditUserDialog.value = true
}

//update user
function updateUser(){
    const data = {
        userId: userId.value,
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        phone: phone.value,
        location: location.value,
        address: address.value,
        password: "qwerty1234..",
        role: 2,
    }
    //to do: edit user

    close()
}

function close(){
    //books
    bookId.value = null
    bookName.value = null
    price.value = null
    description.value = null
    long_description.value = null
    genre.value = null
    image.value = null
    author.value = null
    rating.value = null
    showAddBookDialog.value = false
    showEditBookDialog.value = false

    //user
    userId.value = null
    firstname.value = null
    lastname.value = null
    email.value = null
    phone.value = null
    location.value = null
    address.value = null
    showAddUserDialog.value = false
    showEditUserDialog.value = false
}

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
                                <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddBookDialog = true"></v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-else>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12" sm="12" align="right">
                                    <v-btn class="ma-2" color="blue-darken-2" icon="mdi-plus" @click="showAddBookDialog = true"></v-btn>
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
                                        <td> <v-btn color="blue" size="small" @click="editUser(item)"><v-icon icon="mdi-pencil" ></v-icon> Edit</v-btn> </td>
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
    <!-- Dialogs -->
    <!-- Book Dialog -->
    <!-- Add Book -->
    <v-dialog v-model="showAddBookDialog" max-width="600">
        <v-form @submit.prevent >
            <v-card>
                <v-card-title class="pa-6">
                <v-row>
                        Add Book
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" color="blue-darken-2" icon="mdi-close" @click="close();"></v-btn>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col md="6">
                            <v-text-field label="Book Title" v-model="bookName" required></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="Author" v-model="author" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            <v-text-field label="Image" v-model="image" required></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="Price" v-model="price" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <v-textarea label="Short Description" v-model="description" required></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <v-textarea label="Long Description" v-model="long_description" required></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            <v-select :items="['Fiction', 'Non Fiction', 'Educational', 'Self Help']" v-model ="genre">
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="close()" ></v-btn>
                    <v-btn color="primary"  text="Save" variant="tonal" @click="addBook()" ></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>

    <!-- Edit Book -->
    <v-dialog v-model="showEditBookDialog" max-width="600">
        <v-form @submit.prevent >
            <v-card>
                <v-card-title class="pa-6">
                <v-row>
                        Edit Book
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" color="blue-darken-2" icon="mdi-close" @click="close();"></v-btn>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col md="6">
                            <v-text-field label="Book Title" v-model="bookName" required></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="Author" v-model="author" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            <v-text-field label="Image" v-model="image" required></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="Price" v-model="price" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <v-textarea label="Short Description" v-model="description" required></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <v-textarea label="Long Description" v-model="long_description" required></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            <v-select :items="['Fiction', 'Non Fiction', 'Educational', 'Self Help']" v-model ="genre">
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="close()" ></v-btn>
                    <v-btn color="primary"  text="Update" variant="tonal" @click="updateBook()" ></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>

    <!-- User Dialogs -->
    <!-- Add User -->
    <v-dialog v-model="showAddUserDialog" max-width="600">
        <v-form @submit.prevent >
            <v-card>
                <v-card-title class="pa-6">
                <v-row>
                        Add User
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" color="blue-darken-2" icon="mdi-close" @click="close();"></v-btn>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col md="6">
                            <v-text-field label="First Name" v-model="firstname"></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="Last Name" v-model="lastname"></v-text-field>
                        </v-col>
                    </v-row>
                    
                        <v-row>
                        <v-col md="6">
                            <v-text-field label="Email" v-model="email"></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="254722345678" v-model="phone"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            <v-select v-model="location" label="Location" :items="['CBD', 'Madaraka', 'Westlands', 'Buruburu']" variant="outlined" ></v-select>
                        </v-col>
                        <v-col md="6">
                                <v-text-field label="Address" v-model="address"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="close()" ></v-btn>
                    <v-btn color="primary"  text="Save" variant="tonal" @click="addUser()" ></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>

     <!-- Edit User -->
    <v-dialog v-model="showEditUserDialog" max-width="600">
        <v-form @submit.prevent >
            <v-card>
                <v-card-title class="pa-6">
                <v-row>
                        Edit User
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" color="blue-darken-2" icon="mdi-close" @click="close();"></v-btn>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col md="6">
                            <v-text-field label="First Name" v-model="firstname"></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="Last Name" v-model="lastname"></v-text-field>
                        </v-col>
                    </v-row>
                    
                        <v-row>
                        <v-col md="6">
                            <v-text-field label="Email" v-model="email"></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field label="254722345678" v-model="phone"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            <v-select v-model="location" label="Location" :items="['CBD', 'Madaraka', 'Westlands', 'Buruburu']" variant="outlined" ></v-select>
                        </v-col>
                        <v-col md="6">
                                <v-text-field label="Address" v-model="address"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="close()" ></v-btn>
                    <v-btn color="primary"  text="Save" variant="tonal" @click="updateUser()" ></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>