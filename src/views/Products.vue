<template>
    <div class="wrapper">
    <form className="Products">
    <h4>Продукты</h4>
    <div className="title">
    <h5>Название</h5>
    <h5>Цена</h5>
    </div>
    <div v-for="(product,index) in products">
      <div className="title" @dblclick="deleteProduct(index)">
      <input type="text"  maxlength="50" :placeholder="product.name" v-model="product.name"/>
      <input maxlength="6" :placeholder="product.price" v-model="product.price" pattern="pattern" v-on:input="checkPrice(index)"/>
      </div> 
     
      <div className="payers">
      <p>Кто платит:</p>
      <div style="white-space: nowrap;" v-for="user in users">
      <input  type="radio" :value="user.name" v-model="product.payer"  />
      <label  :for="user.name">{{user.name}}</label>
      </div>
       </div>
     
     <div className="eaters">
      <p>Кто ел:</p>
      <div style="white-space: nowrap;" v-for="user in users">
      <input type="checkbox" :value="user.name" v-model="product.eaters"/>
      <label :for="user.name">{{user.name}}</label>
      </div>
    </div>
    </div>
    <button  @click="addPosition()">Добавить позицию</button>
    <router-link className="link" @click.native="toStorage()" to="/results"> Перейти к результатам </router-link>
    </form>
    </div>
    </template>
    
    <script>
    import Final from "./Final.vue"
    import { useUserStore } from '@/stores/counter';
    export default{
        components:{
            Final
        },
       
        data(){
            return{
              products:[],
              users: useUserStore().users,
              pattern: /^([0-9]){2,20}$/,
            }
            
        },
        
        methods:{
            addPosition(){
                this.products.push(
                    {name:'', price:'',eaters:[],payer:''}
                )
            },
            toStorage(){
                useUserStore().products = this.products 
            },
            deleteProduct(index){
                 this.products.splice(index,1)
            },
            checkPrice(index){
               let pattern = /^([0-9]){1,10}$/
               let pReplace = /[^0-9]/g
             if (!pattern.test(this.products[index].price)){
                    this.products[index].price= this.products[index].price.replace(pReplace,'')
             }
            }
    
        }
    
    }
    </script>
    <style lang="scss">
    @import "/src/assets/scss/products.scss";
    
    </style>