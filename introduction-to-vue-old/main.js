var app = new Vue({
  // OPTIONS
  el: "#app", // element to connect with this instance
  data: {
    // set data
    brand: "Ika Musume",
    product: "Squiddy Doll",
    selectedVariant: 0,
    link: "https://jccultima123.github.io",
    // inStock: true,
    cart: 0,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "../assets/images/ika-musume-chibi.png",
        variantQuantity: 10,
        variantOnSale: false
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "../assets/images/ika-musume-chibi-2.jpg",
        variantQuantity: 0,
        variantOnSale: true
      }
    ],
    sizes: [
      {
        sizeId: 123,
        sizeName: "Small"
      },
      {
        sizeId: 124,
        sizeName: "Medium"
      }
    ],
    inventory: 100,
    // onSale: true
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    removeToCart: function() {
      this.cart -= 1;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  // get computed functions 
  // (get direct computed value)
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    onSale() {
      return this.variants[this.selectedVariant].variantOnSale;
    }
  }
});
