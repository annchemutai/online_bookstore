<script setup>
import {ref} from 'vue'
import { useBooksStore } from '../stores/books'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const booksStore = useBooksStore()
const books= booksStore.books

function view(book){
   booksStore.updateSelectedBook(book) // keep track of the selected item
    router.push('/view_book')
}

//cart
const cartStore = useCartStore()
const quantity = ref(1)

function buy(book){
    book.quantity = quantity.value
    cartStore.updateCart(book)
}
</script>

<template>
    <v-container max-width="100%">
        <v-row>
            <v-col>
                <div class="text-display-medium mb-12 mt-12 text-center">
                    Browse Books
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="book in books">
                <v-card class="h-100 d-flex flex-column" width="250">
                    <v-img :src="book.image" height="200px" class="mt-4"></v-img>
                    <v-card-title class="overflow-y-auto">{{ book.name }}</v-card-title>
                    <v-card-subtitle>{{ book.price }}</v-card-subtitle>
                    <v-card-text>{{ book.description }}</v-card-text>
                    <v-card-text>By: {{ book.author }}</v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" variant="elevated" @click="buy(book)">Add to Cart</v-btn>
                        <v-btn color="primary" variant="elevated" @click="view(book)">View Book</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>