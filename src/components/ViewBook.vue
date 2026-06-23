<script setup>
import {ref} from 'vue'
import { useBooksStore } from '../stores/books'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const booksStore = useBooksStore()
const book = booksStore.selectedBook
const message = ref('')
const snackbar = ref(false)

//cart
const cartStore = useCartStore()
const quantity = ref(1)

function buy(book){
    book.quantity = quantity.value
    cartStore.updateCart(book)
    message.value = 'Order made succefully and is being processed'
    snackbar.value= true
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col md="2">
                <v-btn icon="mdi-arrow-left" color="primary" to="/books" class="ma-12"></v-btn>
            </v-col>
            <v-col md="8">
                <div class="text-display-medium mb-12 mt-12 text-center">
                    Book Title
                </div>
            </v-col>
            <v-col md="2"></v-col>
        </v-row>
        <v-row>
            <v-col md="6">
            <v-card>
                <v-img class="align-end text-white" height="620" :src="book.image"  ></v-img>
            </v-card>
            </v-col>
            <v-col md="6">
                <v-card height="620" color="primary">
                    <v-card-item>
                        <v-card-title class="mb-4">{{ book.name }}</v-card-title>
                        <v-chip class="mb-4"> {{ book.genre }} </v-chip>
                            <v-row>
                                <v-col md="4">
                                    <v-rating :model-value="book.rating" :size="24" readonly ></v-rating>
                                </v-col>
                                <v-col md="6">
                                    <v-btn color="lime-lighten-2" variant="outlined" density="compact" readonly > In Stock</v-btn>
                                </v-col>
                            </v-row>
                        <v-card-text style="height: 300px; overflow-y: auto;"> {{ book.long_description }}</v-card-text>
                        <v-card-subtitle>Ksh {{ book.price }}</v-card-subtitle>
                        <v-card-text> 
                            <v-row>
                                <v-col md="4">Quantity</v-col>
                                <v-col md="6">
                                    <v-number-input v-model ="quantity" control-variant="split" density="compact" :min="1" :max="10" > </v-number-input>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card-item>
                    <v-card-actions>
                        <v-spacer></v-spacer> 
                        <v-card-text>Total: 0</v-card-text>
                        <v-btn elevation="4" variant="elevated" @click="buy(book)"> Add to Cart </v-btn>
                    </v-card-actions>
                </v-card>
            <v-snackbar v-model="snackbar" :timeout="3000" color="warning">{{ message }}</v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>