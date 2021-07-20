<template>
	<div class="app-wrapper">
		<GetStarted v-if="blockStart" @next-block="nextBlock" />
		<YourDetails v-if="blockdDetails" @next-block="nextBlock" />
		<SelectEmirate v-if="blockEmirate" @next-block="nextBlock" />
		<YourAddress v-if="blockAddress" @next-block="nextBlock" />
		<Prescription v-if="blockPrescription" @next-block="nextBlock" />
		<SelectPayment v-if="blockPayment" @next-block="nextBlock" />
		<OrderPlaced v-if="blockPlaced" @next-block="nextBlock" />
	</div>
</template>

<script>
import GetStarted from './components/GetStarted.vue'
import YourDetails from './components/YourDetails.vue'
import SelectEmirate from './components/SelectEmirate.vue'
import YourAddress from './components/YourAddress.vue'
import Prescription from './components/Prescription.vue'
import SelectPayment from './components/SelectPayment.vue'
import OrderPlaced from './components/OrderPlaced.vue'
import { ref } from 'vue'

export default{
	setup(){
		const blockStart = ref(true);
		const blockdDetails = ref(false);
		const blockEmirate = ref(false);
		const blockAddress = ref(false);
		const blockPrescription = ref(false);
		const blockPayment = ref(false);
		const blockPlaced = ref(false);

		function nextBlock(block){
			if( block === 1){
				blockStart.value = false
				blockdDetails.value = !blockdDetails.value
			}else if(block === 2){
				blockdDetails.value = false
				blockEmirate.value = !blockEmirate.values
			}else if(block === 3){
				blockEmirate.value = false
				blockAddress.value = !blockAddress.value
			}else if(block === 4){
				blockAddress.value = false
				blockPrescription.value = !blockPrescription.value
			}else if(block === 5){
				blockPrescription.value = false
				blockPayment.value = !blockPayment.value
			}else{
				blockPayment.value = false
				blockPlaced.value = !blockPlaced.value
			}

		}

		return{ 
			nextBlock,
			blockStart,
			blockdDetails,
			blockEmirate,
			blockAddress,
			blockPrescription,
			blockPayment,
			blockPlaced
		}
	},
	components: {
		GetStarted,
		YourDetails,
		SelectEmirate,
		YourAddress,
		Prescription,
		SelectPayment,
		OrderPlaced
	}
}
</script>

<style lang="scss" scoped>
.app-wrapper{
	position: fixed;
	top: 0;
	right: 0;
	width: 437px;
	max-width: 100%;
	height: 100%;
	background: #fff;
	overflow-y: auto;
}
</style>