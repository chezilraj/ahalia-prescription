<template>
	<div class="details">
		<section class="details__hero details__hero--order-placed">
			<span class="icon-complete"></span>
			<h2 class="order-title">Order Placed</h2>
			<p class="order-id">Order id #123457</p>
			<p class="order-cancel">Want to Cancel order ?</p>
			<a href="#">Click Here</a>
		</section>
		<section class="details__form-container">
			<h1>Get the App</h1>
			<h5>DOWNLOAD</h5>
			<ul class="app-download">
				<li class="app-download__option">
						<icon class="icon--download"><img src="../assets/icons/appleplay.svg" alt=""></icon>
				</li>
				<li class="app-download__option">
					<icon class="icon--download"><img src="../assets/icons/playstore.svg" alt=""></icon>
				</li>
			</ul>
		</section>
		<section class="details__form-help">
			<h4>Need help?</h4>
			<p>Look into our <a href="#">Customer support</a></p>
		</section>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
		const store = useStore
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

		function orderPlaced() {
			loading.value = true;
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(getOrderDetails.value)
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
					loading.value = false;
					alert('success')
				})
				.catch(error => {
					this.errorMessage = error;
					console.error('There was an error!', error);
				});
		}

		const getOrderDetails = computed(() => state.value.orderDetails)

		onMounted( async() => {
      await orderPlaced();
    });

    return {
			getOrderDetails,
			onMounted,
      data,
      loading,
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
}
.details__form-container{
	flex: 0.5;
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
			color: #ffffff;
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
  	color: #ffffff;
	}
}
.icon-complete{
	font-size: 47px;
}
</style>
