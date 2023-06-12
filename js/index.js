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

            } catch (ex){
                alert(ex.message)
            }
        },
        async deleteItem(id){
            const url = shoppingApiUrl + "/" + id
            try{
                const response = await axios.delete(url)
                this.deleteMessage = "response " + response.status + " " + response.statusText
                this.getAllItems()
                
            } catch (ex) {
                alert(ex.message)
            }
        },
    }
}).mount("#app")
