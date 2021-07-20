<template>
	<div class="details">
		<section class="details__hero">
			<span class="details__hero_back"><span class="icon-left-arrow"></span> BACK <span class="logo logo-white logo-side"></span></span>
		</section>
		<section class="details__form-container">
					<h1>Prescription & Insurance</h1>
					<div class="form-group">
						<label>E - Prescription number ( Optional )</label>
						<input type="text" v-model="form.ePrescriptionNo" placeholder="Bur Dubai" />
					</div>
					<div class="form-group">
						<label>Upload Prescription *</label>
						<input type="text" v-model="v$.form.uploadPriscription.$model" placeholder="Building Name" />
					</div>
					<div class="form-group">
						<label>Upload Claim Form ( If Available )</label>
						<input type="text" v-model="form.uploadClaim" placeholder="2389423" />
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
					<div class="form-group">
						<label>Upload Insurance Front *</label>
						<input type="text" v-model="v$.form.frontInsurance.$model" placeholder="Upload Front" />
							<div
								class="input-errors"
								v-for="(error, index) of v$.form.frontInsurance.$errors"
								:key="index"
							>
								<span class="error-msg">{{ error.$message }}</span>
							</div>
					</div>
					<div class="form-group">
						<label>Upload Insurance Back *</label>
						<input type="text" v-model="v$.form.backInsurance.$model" placeholder="Upload Back" />
							<div
								class="input-errors"
								v-for="(error, index) of v$.form.backInsurance.$errors"
								:key="index"
							>
								<span class="error-msg">{{ error.$message }}</span>
							</div>
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
						<button type="submit" class="button button--blue submit" @click="nextStep">CONFIRM</button>
					</div>
		</section>
	</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, requiredUnless } from "@vuelidate/validators";
import { useStore } from 'vuex'

export default {
	setup() {
		const store = useStore
		return { v$: useVuelidate() };
	},
	data() {
		return {
			form: {
				ePrescriptionNo: null,
				uploadPriscription: null,
				uploadClaim: null,
				insuranceCard: null,
				frontInsurance: null,
				backInsurance: null,
				agreeToConsent: false,
			},
		};
	},
	methods: {
		nextStep() {
			this.$store.commit('SAVE_PRESCRIPTION', this.form);
			this.$emit('next-block', 5);
		},
	},
	validations() {
		return {
			form: {
				uploadPriscription: {
					required
				},
				frontInsurance: {
					required
				},
				backInsurance: {
					required
				},
				agreeToConsent: {
					required
				}
			},
		};
	},
};
</script>

<style lang="scss" scoped>

</style>