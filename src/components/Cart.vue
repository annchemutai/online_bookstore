<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore().cart
</script>

<template>
     <v-container>
        <div v-if="cart.length == 0" class="mt-12">
            <v-card color="secondary">
                <div class="text-display-small mb-12 mt-12 text-center">
                    Your cart is empty
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn to="/books" variant="elevated">Browse Books</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </div>
        <div v-else>
        <v-row>
            <v-col md="12">
                <div class="text-display-medium mb-12 mt-12 text-center">
                    Your Orders
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12" v-for="item in cart">
                <v-card color="primary">
                    <v-row>
                        <v-col md="4" class="text-center">
                            <v-avatar color="grey" rounded="0" size="150" >
                                <v-img :src="item.image" ></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col md="6" class="text-right">
                                <v-card-item>
                                    <v-card-title class="mb-4">{{ item.name }}</v-card-title>
                                    <v-card-subtitle>Ksh {{ item.price }}</v-card-subtitle>
                                    <v-card-subtitle>Quantity {{ item.quantity }}</v-card-subtitle>
                                    <v-card-text>Total:{{ item.price * item.quantity}} </v-card-text>
                                </v-card-item>
                                <v-card-actions>
                                    <v-btn elevation="4" variant="elevated" @click="useCartStore().removeCart(item)"> Remove </v-btn>
                                    <v-btn elevation="4" variant="elevated"> Checkout </v-btn>
                                </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        </div>
    </v-container>
</template>