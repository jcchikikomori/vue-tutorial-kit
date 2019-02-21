Vue.component('product', {
  template: `
    <div class="product">

      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">

        <h1>{{ title }}</h1>
        <p v-if="onSale">ON SALE DESU!!!</p>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock :(</p>
        <p>Shipping: {{ shipping }}</p>

        <!-- ANOTHER COMPONENT! -->
        <product-details :details="details"></product-details>

        <div class="color-box" 
             v-for="(variant, index) in variants"
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @click="updateProduct(index)">
        </div>

        <div class="cart-box" :hidden="!inStock">
          <button class="addToCart"
                  v-on:click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">
                  Add to Cart</button>
          <button @click="removeFromCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">
                  Remove from Cart</button>
        </div>
        <p>User is premium: {{ premium }}</p>

      </div>

    </div>
  `,
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    // test
    hasCart: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      brand: 'Ika Musume',
      product: 'Squiddy Doll',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [{
        variantId: 2234,
        variantColor: 'green',
        variantImage: '../assets/images/ika-musume-chibi.png',
        variantQuantity: 30,
        variantOnSale: false
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: '../assets/images/ika-musume-chibi-2.jpg',
        variantQuantity: 0,
        variantOnSale: true
      }
      ],
      sizes: [{
        sizeId: 123,
        sizeName: 'Small'
      },
      {
        sizeId: 124,
        sizeName: 'Medium'
      }
      ],
      inventory: 100
    };
  },
  methods: {
    addToCart: function () {
      // emit sends to @emit-name attr
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart: function () {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
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
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      } else {
        return 2.99;
      }
    }
  }
});

Vue.component('product-details', {
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `,
  props: {
    details: {
      type: Array,
      required: true
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
      // if (this.cart.length > 0) {
      //   this.hasCart = true;
      // }
    },
    removeItem(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
      // if (this.cart.length <= 0) {
      //   this.hasCart = false;
      // }
    }
  }
});