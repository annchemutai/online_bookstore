import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart',  {
   state: () => {
        const cart= ref([])
       
        const totalItems = computed(() => {
            return cart.value.reduce((total, item) => total + item.quantity, 0)
        })

        function updateCart(payload) {
            const existingItem = cart.value.find(item => item.id === payload.id)
    
            if (existingItem) {
            existingItem.quantity =existingItem.quantity + payload.quantity
            } else {
                cart.value.push(payload)
                
            }
        }

        function removeCart(payload) {
            const existingItem = cart.value.findIndex(item => item.id === payload.id)
            if (existingItem) {
             cart.value.splice(existingItem, 1);
            }
        }

        return{
            cart, totalItems, updateCart, removeCart
        }
   },
   actions:{
       
   },
   persist: true,
})