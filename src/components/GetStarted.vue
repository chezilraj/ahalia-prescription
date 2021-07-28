<template>
	<div class="get-started">
		<div class="get-started__hero">
			<img class="logo" src="../assets/ahaliamed-logo.svg" alt="">
		</div>
		<div class="get-started__content">
			<h1 class="get-started__title">Best Way To Order your Medicine.</h1>
			<p class="get-started__desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
			<button class="get-started__btn" type="button" @click="$emit('next-block', 1, 'next')">Get Started <icon class="icon__arrow icon-right-arrow"/></button>
		</div>
	</div>
</template>

<script>
export default {
	emits: ['get-started']
}
</script>

<style lang="scss" scoped>
.get-started{
	background-image: linear-gradient(to top, #2645ac, #0c0054);
	height: 100%;
	display: flex;
	flex-direction: column;
	&__hero{
		position: relative;
		background: url('../assets/hero-image.png') no-repeat;
		background-size: cover;
		background-position: center;
    height: 100%;
    max-height: 439px;
		display: flex;
    justify-content: center;
    align-items: center;
		border-bottom-right-radius: 80px;
		&::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.5);
		border-bottom-right-radius: 80px;
		}
		.logo{
			width: 280px;
			position: relative;
    	z-index: 1;
		}
	}
	&__content{
		padding: 62px 30px 55px 43px;
	}
	&__title{
		font-family: $primaryFont;
		margin: 0 36px 13px 0;
		font-size: 48px;
		font-weight: bold;
		line-height: 0.9;
		text-align: left;
		color: #ffffff;
	}
	&__desc{
		margin: 13px 0 33px 3px;
		font-size: 14px;
		text-align: left;
		color: #ffffff;
	}
	&__btn{
		display: flex;
    justify-content: center;
    align-items: center;
		font-family: $secondaryFont;
		width: 279px;
		height: 53px;
		flex-grow: 0;
		padding: 14px 8px 12px;
		border-radius: 8px;
		font-size: 18px;
		color: #184593;
		border: none;
		background-color: #ffffff;
		cursor: pointer;
	}
	.icon__arrow{
		margin-left: 16px;
	}
}
</style>
