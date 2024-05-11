<template>
  <div class="wrapper">
    <form className="Final">
    <h4>Итого:</h4>
    <h5>Кто - кому</h5>
    <div v-for="value,key in people">
     {{key}} должен:
     <p v-if="Object.keys(people[key]).length == 0">Никому</p>
     <p v-else>
       <p v-for="v,k in value">{{k}} {{v}}
       </p>
     </p>
    </div>
    <h5>Кому - кто</h5>
    <div v-for="value,key in owns">
     Пользователю {{key}} должны:
      <p v-for="v,k in value">{{k}} {{v}}
       </p>
    </div>
    </form>
  </div>
    </template>
    
    
    <script>
    import { useUserStore } from '@/stores/counter';
    export default{
       data(){
           return{
            //person:[{name:'',pays:'',owns:''}]
            people: {},
            isOwed:{},
            owns:{},
            products: useUserStore().products,
            users: useUserStore().users,
           }
        },
        mounted() {
             this.Get()
        },
        methods:{
            Get(){
                   this.people = {}
                  
                     console.log(this.users)
                  //  for (let user in this.users){
                  //      for (let i=0;i<this.products.length;i++){
                  //        if ((this.users[user]['name'] === this.products[i].payer) ){
                  //          if(!(this.products[i].payer in this.people)){
                  //              this.people[this.products[i].payer] = parseInt(this.products[i].price)
                  //          }
                  //          else{
                  //             this.people[this.products[i].payer] += parseInt(this.products[i].price)
                  //          }
                           
                  //        }
    
                  //      }
     
                  //  }
                   for (let user in this.users){
                       this.isOwed = {}
                       let flag = false
                       for (let i=0;i<this.products.length;i++){
                         
                         if ((this.products[i].eaters.indexOf(this.users[user]['name'])) !=-1 && this.users[user]['name']!=this.products[i].payer){
                            flag=true
                            
                            if (this.isOwed [this.products[i].payer]!=undefined){
                              this.isOwed [this.products[i].payer] +=parseInt(this.products[i].price)/this.products[i].eaters.length
                            }
                            else{
                              this.isOwed [this.products[i].payer] =parseInt(this.products[i].price)/this.products[i].eaters.length
                            }
                          
                         } 
                        
                       }
                     
                       if (flag){
                        this.people[this.users[user]['name']] = this.isOwed 
                          
                       }
                       else{
                         this.people[this.users[user]['name']] = ''
                         
                       }
     
                   }
                    
                    for (let key in this.people){
                      console.log(key,this.people[key])
                      // если словарь пустой
                      if ( Object.keys(this.people[key]).length != 0){
                      for (let elem in this.people[key] ){
                         console.log(this.people[elem])
                         
                         if (this.people[elem].hasOwnProperty(key)){
                           if (this.people[key][elem]>=this.people[elem][key]){
                            this.people[key][elem] = this.people[key][elem]-this.people[elem][key]
                            delete this.people[elem][key]
                           }
                        
                          }
                      }
                      }
                     }
                  // for (let user in this.users){
                  //     this.owns = {}
                    
    
    
                  // }
                   
                   this.owns = {}
                    for (let key in this.people){
                      
                      if (this.people[key]!=''){
                        for (let elem in this.people[key] ){
                           if (elem in this.owns){
                    this.owns[elem][key] = this.people[key][elem]
                } else {
                    this.owns[elem] = { [key]: this.people[key][elem] }
                }
                          }
                      }
                     
                     
    
                      
                    }
                     console.log(this.owns)
                    //  for (let el in this.users){
                    //   for (let i=0;i<this.products.length;i++){
                    //     if ((this.users[el]['name'] === this.products[i].payer)){
                    //       alert(this.users[el]['name'])
                    //       for (let p in this.person){
                    //         console.log(this.person[p])
                            
                    //         if (!(this.users[el]['name'] in this.person[p])){
                    //             this.person.push({
                    //                name: this.users[el]['name']
                    //             })
                    //          }
                    //       }
    
                    //     }
                    //   }
                    //  }
                    //   console.log(this.person)
                      //this.person[0][this.products[i].payer]
                    //   console.log(this.users)
                      
                    //     for (let i=0; i<this.products.length;i++){
                    //       for  (let el in this.person){
                    //       if (this.person[this.products[i].payer]===undefined){
                    //            console.log('No',this.products[i].payer )
                    //            this.person.push({
                    //               name: this.products[i].payer 
                    //       })
                    //       }
                    //       }
                    //     //  for (let el in this.users){
                    //     //     if (this.users[el]['name'] === this.products[i].payer){
                    //     //         alert(this.person[el]['name'])
                    //     //         this.person[el]['pays'] =parseInt(this.person[el]['pays'])+ parseInt(this.products[i].price)
                    //     //     }
                          
                    //     // }
                    // }
                    // console.log(this.person)
            }
        }
    }
    </script>
    <style lang="scss">
    @import  "/src/assets/scss/final.scss";
    </style>