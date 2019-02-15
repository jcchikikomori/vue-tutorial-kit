var app = new Vue({
  // OPTIONS
  el: '#app', // element to connect with this instance
  data: { // set data
    product: "Squiddy Doll",
    image: "../assets/images/ika-musume.jpg",
    link: "https://jccultima123.github.io",
    inStock: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green"
      },
      {
        variantId: 2235,
        variantColor: "blue"
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
    onSale: true
  }
})