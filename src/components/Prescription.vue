<template>
	<div class="details">
		<section class="details__hero">
			<span class="details__hero_back"><span @click="$emit('next-block', 4, 'prev')" class="icon-left-arrow"></span> BACK <span class="logo logo-white logo-side"></span></span>
		</section>
		<section class="details__form-container">
					<h1>Prescription & Insurance</h1>
					<div class="form-group">
						<label>E - Prescription number ( Optional )</label>
						<input type="text" v-model="form.ePrescriptionNo" placeholder="E - Prescription number" />
					</div>
					<div class="form-group form-group__upload">
						<label>Upload Prescription *</label>
						<input type="file" id="prescription" 	@change="onFileChanged($event, 'prescription')" />
						<label for="prescription" class="file-upload">
							<span class="icon-upload"></span>
							<span class="upload-item" v-if="form.selectedFilePrescription">{{ form.selectedFilePrescription }}</span>
							<span class="upload-text" v-else>Upload Prescription</span>
						</label>
					</div>
					<div class="form-group form-group__upload">
						<label>Upload Claim Form ( If Available )</label>
						<input type="file" id="claimform" @change="onFileChanged($event, 'claim')" />
						<label for="claimform" class="file-upload">
							<span class="icon-upload"></span>
							<span class="upload-item" v-if="form.selectedFileClaim">{{ form.selectedFileClaim }}</span>
							<span class="upload-text" v-else>Upload Prescription</span>
						</label>
					</div>
					<div class="form-group">
						<div class="form-group__card">
								<h4>Insurance Card</h4>
								<label class="custom-radio">I don’t have insurance
									<input type="radio" v-model="form.insuranceCard" checked="checked" name="insurance-card">
									<span class="checkmark"></span>
								</label>
								<label class="custom-radio">Emirates ID is insurance card
									<input type="radio" v-model="form.insuranceCard" name="insurance-card">
									<span class="checkmark"></span>
								</label>
								<label class="custom-radio">I have separate insurance card
									<input type="radio" v-model="form.insuranceCard" name="insurance-card">
									<span class="checkmark"></span>
								</label>
						</div>
					</div>
					<div class="form-group form-group__upload">
						<label>Upload Insurance Front *</label>
						<input type="file" id="insuranceFront" 	@change="onFileChanged($event, 'insurance-front')" placeholder="Upload Front" />
												<label for="insuranceFront" class="file-upload">
							<span class="icon-upload"></span>
							<span class="upload-item" v-if="form.selectedInsuranceFront">{{ form.selectedInsuranceFront }}</span>
							<span class="upload-text" v-else>Upload Prescription</span>
						</label>
					</div>
					<div class="form-group form-group__upload">
						<label>Upload Insurance Back *</label>
						<input type="file" id="insuranceBack" @change="onFileChanged($event, 'insurance-back')" placeholder="Upload Back" />
												<label for="insuranceBack" class="file-upload">
							<span class="icon-upload"></span>
							<span class="upload-item" v-if="form.selectedInsuranceBack">{{ form.selectedInsuranceBack }}</span>
							<span class="upload-text" v-else>Upload Prescription</span>
						</label>

					</div>
					<div class="form-group">
						<label class="custom-checkbox">I agree to the <a href="#">Consent Form</a>
							<input type="checkbox" v-model="v$.form.agreeToConsent.$model">
							<span class="checkmark"></span>
						</label>
							<div
								class="input-errors"
								v-for="(error, index) of v$.form.agreeToConsent.$errors"
								:key="index"
							>
								<span class="error-msg">{{ error.$message }}</span>
							</div>
					</div>
					<div class="form-group">
						<button type="submit" :disabled="v$.form.$invalid" class="button button--blue submit" @click="nextStep">CONFIRM</button>
					</div>
		</section>
	</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
	setup() {
		return { v$: useVuelidate() };
	},
	data() {
		return {
			form: {
				ePrescriptionNo: null,
				insuranceCard: null,
				agreeToConsent: false,
				selectedFilePrescription: null,
				selectedFileClaim: null,
				selectedInsuranceFront: null,
				selectedInsuranceBack: null
			},
		};
	},
	methods: {
		nextStep() {
			this.$store.commit('SAVE_PRESCRIPTION', this.form);
			this.$emit('next-block', 5, 'next');
		},
		onFileChanged(event, inName) {
			if(inName === 'prescription'){
				  this.form.selectedFilePrescription = event.target.files[0].name
			}else if(inName === 'claim'){
					this.form.selectedFileClaim = event.target.files[0].name
			}else if(inName === 'insurance-front'){
				this.form.selectedInsuranceFront = event.target.files[0].name
			}else if(inName === 'insurance-back'){
				this.form.selectedInsuranceBack = event.target.files[0].name
			}
  	},
	},
	validations() {
		return {
			form: {
				selectedFilePrescription: {
					required
				},
				selectedInsuranceFront: {
					required
				},
				selectedInsuranceBack: {
					required
				},
				agreeToConsent: {
					required,
					checked: value => value === true
				}
			},
		};
	},
};
</script>

<style lang="scss" scoped>

</style>