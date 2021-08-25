<template>
	<div class="details">
		<section class="details__hero">
			<span class="details__hero_back"><span @click="$emit('next-block', 5, 'prev')" class="icon-left-arrow"></span> BACK <span class="logo logo-white logo-side"></span></span>
		</section>
		<section class="details__form-container">
			<h1>Select Payment Option</h1>
			<ul class="payment">
				<li class="payment__option" @click="nextStep('cash_on_delivery')">
					<icon class="icon-cash"></icon>
					<span>Cash on Delivery</span><span class="icon__arrow icon-right_icon" />
				</li>
				<li class="payment__option" @click="nextStep('pay_with_card')">
					<icon class="icon-card"></icon>
					<span>Card on Delivery</span><span class="icon__arrow icon-right_icon" />
				</li>
			</ul>
		</section>
	</div>
</template>


<script>
export default {
	methods: {
		nextStep(mode) {
			this.$store.commit('SAVE_PAYMENT', mode);
			this.$emit('next-block', 6, 'next');
		},
	}
};
</script>
<style lang="scss" scoped>
.payment{
	&__option{
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 19px;
  padding: 4px 33px 4px 26px;
  border-radius: 4px;
  background-color: #efefef;
	height: 65px;
	cursor: pointer;
	.icon__arrow{
		margin-left: auto;
		font-size: 13px;
		&::before{
			color: #1c2989;
		}
	}
	span{
		font-size: 16px;
		color: #161a75;
	}
	icon{
			max-width: 90px;
			width: 100%;
		}
	}
	.icon-cash::before{
		    font-size: 29px;
	}
	.icon-appleplay{
		img{
			width: 44px;
		}
	}
	.icon-google{
		img{
			height: 30px;
		}
	}
	.icon-card::before{
		font-size: 23px;
	}
}
</style>
