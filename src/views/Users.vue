<template>
  <div className = "wrapper">
   <v-progress-linear
      color="#FFF0F5"
      bg-cokor="black"
      height="20"
      v-model="progress"
      striped
     >{{progress.toFixed(1)}}%</v-progress-linear>
     <!-- <v-icon color="black" large>
        mdi-check-bold
      </v-icon> -->
    <v-form className="Users">
      <v-icon>{{ $vuetify.icons.mdiAccount }}</v-icon>
      <div class="guest_plus">
        <h4>Пользователи</h4>
        <button  id="btn_guests" @click='AddGuest()'> 
          <v-icon color=" #5F2580;" large >
           mdi-account-plus-outline
         </v-icon>
        </button>
      </div>
     <div v-for="(guest,index) in guests">
      <label><h5> {{ guest.label }}</h5> </label>
      <!--<input type="text"  placeholder="Name"  @dblclick="DeleteGuest(index)" v-model="guest.name" v-on:input="changeHandler(guest.name,index)" required>-->
      <!-- <p v-show="pattern.test(guest.name)" style="color:#808D8E;">ok</p>
      <p v-show="!pattern.test(guest.name)">False</p>-->
      <v-text-field
        v-model="guest.name"
        :rules="changeHandler(guest.name,index)"
        hint="длина имени не менее 2 символов"
        persistent-hint
        label="Имя"
        @dblclick="DeleteGuest(index)"
        required
        clearable
        prepend-inner-icon="mdi-account-outline"
      ></v-text-field>
     </div> 

     <router-link class='link' v-show="progress==100" @click.native="toStorage()" to="/products"  >Подтвердить</router-link>

    </v-form>
  </div>
   
  </template>
  
  <script>
   import { useUserStore } from '@/stores/counter';
  
  
  export default {
    data(){
      return{
       guests:[],
       pattern: /^([a-zA-Zа-яА-ЯёЁ]+\s{0,1}){2,40}$/,
       count:0,
       progress:0,
       part_of_progress:0,
       count_yes:[],
      }
    },
    methods:{
       AddGuest(){
        this.count++;
        this.part_of_progress = 100/this.count
        this.changedProgress()
         this.guests.push({
            label: 'Гость ' + (this.guests.length + 1),
            name:""
       })
        },
        DeleteGuest(guest){
             this.guests.splice(guest,1)
             this.count_yes.splice(guest,1)
             this.count--;
             this.part_of_progress = 100/this.count
             this.changedProgress()
             for (let i=0;i<this.guests.length;i++){
                this.guests[i].label = 'Пользователь ' + (i+1)
             }
            
        },
        toStorage(){
          useUserStore(this.$pinia).users = this.guests
        },
        changeHandler(value,index){
           if (this.pattern.test(value)){
             this.count_yes[index]='yes'
             
             console.log(this.count_yes)
        }
          else{
              this.count_yes[index]='no'
              console.log(this.count_yes)
          }
         this.changedProgress()
        },
        changedProgress(){
          let sum = 0
           for (let el in this.count_yes){
            if (this.count_yes[el] === 'yes'){
              sum+=1
            }
           }
           console.log(sum)
           this.progress = sum*this.part_of_progress
        }
  }}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss">
  @import "/src/assets/scss/users.scss";
  
  </style>
  