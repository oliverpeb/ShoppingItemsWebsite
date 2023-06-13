const shoppingApiUrl = "https://shoppingapiapi20230612134120.azurewebsites.net/api/ShoppingItems"

Vue.createApp({
    data() {
        return {
            items: [],
            posts: [],
            error: null,
            userId: "",
            ShoppingItems: [],
            addData: { name: "", price: 0, quantity: 0 },
            addMessage: "",
            deleteId: 0,
            deleteMessage: "",
            totalPrice: 0,
            quantityFilter: 0,
            filteredItems: [],
            updateId: 0,
            updateData: { name: "", price: 0, quantity: 0 },
            updateMessage: "",
            sortMessage: "",
            filterMessage: ""
        }
    },
    async created() {
        console.log("created method called")
        this.helperGetAndShow(shoppingApiUrl)
        this.getTotalPrice()
    },
    
    methods: {
        getAllItems(){
            this.helperGetAndShow(shoppingApiUrl)
        },
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.ShoppingItems = await response.data
                console.log(this.ShoppingItems)
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getTotalPrice(){
            try {
                const response = await axios.get(shoppingApiUrl + "/totalprice")
                this.totalPrice = await response.data
                console.log(this.ShoppingItems)
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addItem(){
            try {
                const response = await axios.post(shoppingApiUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllItems()
                this.getTotalPrice()  // Added this line

            } catch (ex){
                alert(ex.message)
            }
        },

        sortItemsByPrice() {
            this.ShoppingItems = [...this.ShoppingItems].sort((a, b) => a.price - b.price);
            this.sortMessage = "Items have been sorted by price.";
        },

        //Filter så KUN den givne værdi bliver fremvist
        filterItemsByQuantity() {
            this.filteredItems = this.ShoppingItems.filter(item => item.quantity == this.quantityFilter);
            this.filterMessage = "Items have been filtered by quantity.";
        },

        //Filter så den givne værdi og lavere bliver fremvist
        /*
        filterItemsByQuantity() {
            this.filteredItems = this.ShoppingItems.filter(item => item.quantity < this.quantityFilter);
            this.filterMessage = "Items have been filtered by quantity so that you have all the quantities lower than the one given.";
        },
        */
        async updateItem() {
            const url = shoppingApiUrl + "/" + this.updateId
            try {
                const response = await axios.put(url);
                this.updateMessage = "Response " + response.status + " " + response.statusText;
                this.getAllItems();  // To refresh the list after an update
                this.getTotalPrice();  // To refresh the total price after an update
            } catch (ex) {
                alert(ex.message);
            }
        },

        async deleteItem(id){
            const url = shoppingApiUrl + "/" + id
            try{
                const response = await axios.delete(url)
                this.deleteMessage = "response " + response.status + " " + response.statusText
                this.getAllItems()
                this.getTotalPrice()  // Added this line
                
            } catch (ex) {
                alert(ex.message)
            }
        },

        
    }
}).mount("#app")
