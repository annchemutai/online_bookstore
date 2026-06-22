<script setup>
import { useCartStore } from '../stores/cart'
const total = useCartStore().totalItems
</script>

<template>
    <v-app-bar color="primary">
        <v-app-bar-title>
            <router-link to="/">
                <v-img src="/logo.png" width="12%" height="12%"></v-img>
            </router-link>
        </v-app-bar-title>
        <v-btn to="/">Home</v-btn>
        <v-btn to="/books">Books</v-btn>
        <!-- <div v-if="cartCount.length > 0"> -->
        <v-badge location="top right" color="white" :content="total" :model-value="total > 0">
            <v-btn to="/cart">Cart</v-btn>
        </v-badge>
        <!-- </div>
        <div v-else>
            <v-btn to="/cart">Cart</v-btn>
        </div> -->
        <v-btn to="/library">Library</v-btn>
        <v-btn to="/wishlist">Wish List</v-btn>
        <v-btn to="/admin">Admin</v-btn>
        <v-btn to="/profile">Profile</v-btn>
    </v-app-bar>
</template>