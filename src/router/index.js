import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/components/LandingPage.vue'
import Books from '@/components/Books.vue'
import Cart from '@/components/Cart.vue'
import Admin from '@/components/Admin.vue'
import Library from '@/components/Library.vue'
import Profile from '@/components/Profile.vue'
import ViewBook from '@/components/ViewBook.vue'
import WishList from '@/components/WishList.vue'
import SignUp from '@/components/SignUp.vue'
import Login from '@/components/Login.vue'
import Chat from '@/components/Chat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LandingPage
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/books',
      component: Books
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/library',
      component: Library
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/view_book',
      component: ViewBook
    },
    {
      path: '/wishlist',
      component: WishList
    },
    {
      path: '/sign_up',
      component: SignUp
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/chat',
      component: Chat
    }
  ],
})

export default router
