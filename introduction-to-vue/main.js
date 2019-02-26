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

        <div class="review-box">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>Recommendation? {{ review.recommendation }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
        </div>

        <product-review @review-submitted="addReview">
        </product-review>  

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
      details: ['60% squid', '20% girl', 'Her specialty: Ink'],
      variants: [{
        variantId: 2234,
        variantColor: 'lightblue',
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
      inventory: 100,
      reviews: []
    };
  },
  methods: {
    addToCart() {
      // emit sends to @emit-name attr
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s)</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="Name">
      </p>

      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <label for="recommendation">Would you recommend this product?</label>      
        <input type="radio" name="recommendation" v-model="recommendation" value="Yes" /> Yes
        <input type="radio" name="recommendation" v-model="recommendation" value="No" /> No
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: 'No',
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation
        };
        this.$emit('review-submitted', productReview);
        // clear after emit submission
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommendation = 'No'; // TODO: Get Default value
      } else {
        if(!this.name) this.errors.push('Name required.');
        if(!this.review) this.errors.push('Review required.');
        if(!this.rating) this.errors.push('Rating required.');
      }
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