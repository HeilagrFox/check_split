import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', () => {
  state: () => {
    return {
      // for initially empty lists
      users: [],
      products: [],
      
    }
  }
})

