<template>
	<div class="details">
		<section class="details__hero details__hero--order-placed" v-if="!loading && !failed" >
			<span class="icon-complete"></span>
			<h2 class="order-title">Order Placed</h2>
			<p class="order-desc">We have received your order and will contact you soon. <strong>Kindly note the order ID</strong></p>
			<h2 class="order-id">Order ID: {{orderId}}</h2>
		</section>
		<section class="details__hero details__hero--order-placed" v-else-if="!loading && failed" >
			<h2 class="order-title">Order Failed</h2>
			<p class="order-desc order-desc--try">Something Went wrong! Please try after some time.</p>
		</section>
		<section class="details__hero details__hero--order-placed details__hero--order-placed--skeleton" v-else>
			<span/>
			<h2 class="order-title"/>
			<p class="order-desc" />
			<p class="order-cancel" />
			<a href="#" />
		</section>

		<section class="details__form-container">
			<a href="#" class="button button--blue button--continue"><span>Continue Shopping</span> <icon class="icon__arrow icon-right_icon" /></a>
		</section>
		<section class="details__form-help">
			<h4>Need help?</h4>
			<p>Call Us on <a href="tel:+9710500000000">0500000000</a></p>
		</section>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
		const store = useStore();
    const data = ref(null);
    const loading = ref(true);
    const failed = ref(false);
    const error = ref(null);
    const orderId = ref(null);
		const getOrderDetails = computed(() => store.state.orderDetails)
		const payload = { order: getOrderDetails.value }
		function orderPlaced() {
			loading.value = true;
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify(payload)
			};
			fetch('/api/v1/orders', requestOptions)
				.then(async response => {
					const data = await response.json();

					// check for error response
					if (!response.ok) {
						// get error message from body or default to response status
						const error = (data && data.message) || response.status;
						return Promise.reject(error);
					}
					orderId.value = data.data.id
					loading.value = false;
				})
				.catch(error => {
					failed.value = true;
					loading.value = false;
					console.error('There was an error!', error);
				});
		}

		onMounted( async() => {
      await orderPlaced();
    });

    return {
			getOrderDetails,
			onMounted,
      data,
      loading,
			failed,
			orderId,
      error
    };
  },
	methods: {
		selectEmirate(location) {
			this.$store.commit('SAVE_LOCATION', location.attributes.name);
			this.$emit('next-block', 3)
		}
	}
}

</script>

<style lang="scss" scoped>
.details__hero--order-placed{
	    height: auto;
			flex: 1;
		.order-desc{
			text-align: center;
			font-size: 14px;
			padding: 0 68px;
			line-height: 1.2;
			color: #fffc;
			strong{
				color: #fff;
			}
			&--try{
				padding: 0 50px;
			}
		}
		.order-id{
			font-size: 20px;
			padding-top: 26px;
		}
		&--skeleton{
			span{
				width: 47px;
    		height: 47px;
				border-radius: 50%;
				background-color: #ddd;
				animation: pulse-bg 1s infinite;
			}
			.order-title{
				width: 170px;
    		height: 20px;
				margin-bottom: 8px;
				background-color: #ddd;
				animation: pulse-bg 1s infinite;
			}
			.order-desc{
				width: 123px;
    		height: 15px;
				background-color: #ddd;
				animation: pulse-bg 1s infinite;
			}
			.order-cancel {
				width: 120px;
    		height: 15px;
				background-color: #ddd;
				animation: pulse-bg 1s infinite;
			}
		}
}
.details__form-container{
	flex: 0.5;
	padding: 0 20px 0px;
	display: flex;
  align-items: center;
	h1{
		font-size: 30px;
		  color: #161a75;
			 line-height: 1.1;
  letter-spacing: 0.3px;
	margin-bottom: 7px;
	}
	h5{
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: bold;
		letter-spacing: 0.16px;
		color: #e23484;
		text-align: left;
	}
	.app-download{
		display: flex;
		&__option{
			max-width: 155px;
			flex-grow: 1;
    	flex-basis: 0;
			&:not(:last-child){
				margin-right: 8px;
			}
			.icon--download{
				img{
					max-width: 155px;
					width: 100%;
				}
			}
		}
	}
}
.details__form-help{
	margin-left: 41px;
	margin-top: 32px;
	flex: 0.2;
	h4{
		  font-size: 18px;
			font-weight: bold;
			letter-spacing: 0.36px;
			color: #fff;
	}
	a{

		font-weight: 500;
		line-height: 1.71;
		letter-spacing: 0.28px;
		color: #ea4984;
		text-decoration: none;
	}
	p{
		font-size: 14px;
		font-weight: normal;
  	color: #fff;
	}
}
.button--continue{
	text-decoration: none;
	span{
		margin-left: auto;
	}
	.icon__arrow{
		margin-left: auto;
		&::before {
			color: #fff;
		}
	}
}
.icon-complete{
	font-size: 47px;
}
@keyframes pulse-bg {
	0% { background-color: #ddd; }
	50% { background-color: #d0d0d0; }
	100% { background-color: #ddd; }
}
</style>
