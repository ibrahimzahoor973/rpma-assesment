// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     token: null as string | null,
//     user: null as any
//   }),

//   actions: {
//     async login(email: string, password: string) {
//       try {
//         const response = await fetch(`${useRuntimeConfig().public.apiBase}/auth/login`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ username: email, password }),
//         })

//         if (!response.ok) throw new Error('Login failed')

//         const data = await response.json()
//         this.setToken(data.access_token)
//         this.setUser(data.user)

//         return true
//       } catch (error) {
//         console.error('Login error:', error)
//         return false
//       }
//     },

//     logout() {
//       this.setToken(null)
//       this.setUser(null)
//       navigateTo('/login')
//     },

//     setToken(token: string | null) {
//       this.token = token
//       if (process.client) {
//         if (token) {
//           localStorage.setItem('auth.token', token)
//         } else {
//           localStorage.removeItem('auth.token')
//         }
//       }
//     },

//     setUser(user: any) {
//       this.user = user
//       if (process.client) {
//         if (user) {
//           localStorage.setItem('auth.user', JSON.stringify(user))
//         } else {
//           localStorage.removeItem('auth.user')
//         }
//       }
//     },

//     async initAuth() {
//       if (process.client) {
//         const token = localStorage.getItem('auth.token')
//         const userStr = localStorage.getItem('auth.user')

//         if (token) {
//           this.token = token
//         }

//         if (userStr) {
//           try {
//             this.user = JSON.parse(userStr)
//           } catch (e) {
//             console.error('Failed to parse user data:', e)
//           }
//         }
//       }
//     }
//   },

//   getters: {
//     isAuthenticated: (state) => !!state.token
//   }
// })
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any,
    initialized: false, // To track initialization status
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await fetch(`${useRuntimeConfig().public.apiBase}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password }),
        })

        if (!response.ok) throw new Error('Login failed')

        const data = await response.json()
        this.setToken(data.access_token)
        this.setUser(data.user)

        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    logout() {
      this.setToken(null)
      this.setUser(null)
      navigateTo('/login')
    },

    setToken(token: string | null) {
      this.token = token
      if (process.client) {
        if (token) {
          localStorage.setItem('auth.token', token)
        } else {
          localStorage.removeItem('auth.token')
        }
      }
    },

    setUser(user: any) {
      this.user = user
      if (process.client) {
        if (user) {
          localStorage.setItem('auth.user', JSON.stringify(user))
        } else {
          localStorage.removeItem('auth.user')
        }
      }
    },

    async initAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth.token')
        const userStr = localStorage.getItem('auth.user')

        if (token) {
          this.token = token
        }

        if (userStr) {
          try {
            this.user = JSON.parse(userStr)
          } catch (e) {
            console.error('Failed to parse user data:', e)
          }
        }

        // Mark the store as initialized
        this.initialized = true
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
