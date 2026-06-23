import { ref } from 'vue'

export function useAuth() {
    const isAuthenticated = ref(false)
    const isAdmin = ref(false)

    // Login
    async function checkCredentials(credentials) {

        try {

            if (!credentials.email || !credentials.password) {
                throw new Error('Email and password are required')
            }
            
            const userData = localStorage.getItem("user")

            if (userData) {
                isAuthenticated.value = true
                if (userData.role == 1) isAdmin.value = true

                // console.log(user.value)

                localStorage.setItem("isAuthenticated", isAuthenticated.value);
                localStorage.setItem("isAdmin", isAdmin.value);

                return response
            } else {
                throw new Error('No user found')
            }

        } catch (err) {
            console.log("Login failed")
           
        } 
    }

    // Register
    async function signup(data) {
        try{
            isAuthenticated.value = true
            if (data.role == 1) isAdmin.value = true

            localStorage.setItem("isAuthenticated", isAuthenticated.value);
            localStorage.setItem("isAdmin", isAdmin.value);
            localStorage.setItem("user", JSON.stringify(data))
        }catch{
            console.log("Error signing up")
        }
    }

    // Logout
    function logout() {
        localStorage.removeItem("isAuthenticated");
        // localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
    }
    return {
        checkCredentials,
        signup,
        logout,
    }
 }