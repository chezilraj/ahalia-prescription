<template>
	<div class="details">
		<section class="details__hero">
			<span class="details__hero_back"><span @click="$emit('next-block', 2)"><span class="icon-left-arrow"></span> BACK </span><span class="logo logo-white logo-side"></span></span>
		</section>
		<section class="details__form-container">
					<h1>Select your Emirate</h1>
					<ul class="details__select-emirate" v-if="!loading">
						<li v-for="(location, index) in data" :key="index" @click="selectEmirate(location)"><span>{{ location.attributes.name }}</span> <icon class="icon__arrow icon-right-arrow"></icon></li>
					</ul>
					<div class="details__select-emirate details__select-emirate--skeleton" v-else>
						<li v-for="n in 7" :key="n"><span></span> <icon class="icon__arrow"></icon></li>
					</div>
		</section>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted } from "vue";

export default {
  setup() {
		const store = useStore
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

		function fetchData() {
			loading.value = true;
			return fetch('/api/v1/locations', {
				method: 'get',
				headers: {
					'content-type': 'application/json'
				}
			})
				.then(res => {
					// a non-200 response code
					if (!res.ok) {
						// create error instance with HTTP status text
						const error = new Error(res.statusText);
						error.json = res.json();
						throw error;
					}

					return res.json();
				})
				.then(json => {
					// set the response data
					data.value = json.data;
				})
				.catch(err => {
					error.value = err;
					// In case a custom JSON error response was provided
					if (err.json) {
						return err.json.then(json => {
							// set the JSON response message
							error.value.message = json.message;
						});
					}
				})
				.then(() => {
					loading.value = false;
				});
		}
		onMounted( async() => {
      await fetchData();
    });

    return {
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
.details{
	&__select-emirate{
		li{
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			letter-spacing: 0.64px;
			color: #1c2989;
			padding: 19px;
			border-bottom: 1px solid #cfd8e7;
			cursor: pointer;
			&.active{
				border-radius: 8px;
  			background-color: #161a75;
				color: #fff;
			}
			&:hover{
				border-radius: 8px;
  			background-color: #161a75;
				color: #fff;
				.icon__arrow {
					&::before{
						color: #fff;
					}
				}
			}
		}
		&--skeleton{
			li{
				&:hover{
					background-color: none;
				}
			}
			span{
				width: 80%;
				background-color: #ddd;
				height: 19px;
				line-height: 140%;
				animation: pulse-bg 1s infinite;
			}
			.icon__arrow {
				min-width: 20px;
				height: 19px;
				display: inline-block;
				background-color: #ddd;
				animation: pulse-bg 1s infinite;
			}
		}
	}
}

@keyframes pulse-bg {
	0% { background-color: #ddd; }
	50% { background-color: #d0d0d0; }
	100% { background-color: #ddd; }
}
</style>
