<template>
	<div class="details">
		<section class="details__hero">
			<span class="details__hero_back"><span @click="$emit('next-block', 4, 'prev')" class="icon-left-arrow"></span> BACK <span class="logo logo-white logo-side"></span></span>
		</section>
		<section class="details__form-container">
					<h1>Prescription & Insurance</h1>
					<div class="form-group">
						<label>E - Prescription number (Optional)</label>
						<input type="text" v-model="form.ePrescriptionNo" placeholder="E - Prescription number" />
					</div>
					<div class="form-group form-group__upload">
						<label>Upload Prescription *</label>
						<input type="file" id="prescription" 	@change="onFileChanged('prescription', $event.target.files)" />
						<label for="prescription" class="file-upload">
							<span class="icon-upload"></span>
							<span class="upload-item" v-if="form.selectedFilePrescription">{{ splitFilePrescription }}</span>
							<span class="upload-text" v-else>Upload Prescription</span>
						</label>
					</div>
					<div class="form-group form-group__upload">
						<label>Upload Claim Form (If Available)</label>
						<input type="file" id="claimform" @change="onFileChanged('claim', $event.target.files)" />
						<label for="claimform" class="file-upload">
							<span class="icon-upload"></span>
							<span class="upload-item" v-if="form.selectedFileClaim">{{ splitFileClaim }}</span>
							<span class="upload-text" v-else>Upload Prescription</span>
						</label>
					</div>
					<div class="form-group">
						<div class="form-group__card">
								<h4>Insurance Card</h4>
								<label class="custom-radio">I don’t have insurance
									<input type="radio" value="no_insurance" @change="enableUpload('no_insurance')" v-model="form.insuranceCard" checked="checked" name="insurance-card">
									<span class="checkmark"></span>
								</label>
								<label class="custom-radio">Emirates ID is insurance card
									<input type="radio" value="emirates_id" @change="enableUpload('emirates_id')" v-model="form.insuranceCard" name="insurance-card">
									<span class="checkmark"></span>
								</label>
								<label class="custom-radio">I have separate insurance card
									<input type="radio" value="separate_card" @change="enableUpload('separate_card')" v-model="form.insuranceCard" name="insurance-card">
									<span class="checkmark"></span>
								</label>
						</div>
					</div>
					<template v-if="isUploadInsurance">
						<div class="form-group form-group__upload">
							<label>Upload Insurance Front *</label>
							<input type="file" id="insuranceFront" 	@change="onFileChanged('insurance-front', $event.target.files)" placeholder="Upload Front" />
													<label for="insuranceFront" class="file-upload">
								<span class="icon-upload"></span>
								<span class="upload-item" v-if="form.selectedInsuranceFront">{{ splitFileInsuranceFront }}</span>
								<span class="upload-text" v-else>Upload Prescription</span>
							</label>
						</div>
						<div class="form-group form-group__upload">
							<label>Upload Insurance Back *</label>
							<input type="file" id="insuranceBack" @change="onFileChanged('insurance-back', $event.target.files)" placeholder="Upload Back" />
													<label for="insuranceBack" class="file-upload">
								<span class="icon-upload"></span>
								<span class="upload-item" v-if="form.selectedInsuranceBack">{{ splitFileInsuranceBack }}</span>
								<span class="upload-text" v-else>Upload Prescription</span>
							</label>

						</div>
					</template>
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
			splitFilePrescription: null,
			splitFileClaim: null,
			splitFileInsuranceFront: null,
			splitFileInsuranceBack: null,
			isUploadInsurance: false
		};
	},
	methods: {
		nextStep() {
			this.$store.commit('SAVE_PRESCRIPTION', this.form);
			this.$emit('next-block', 5, 'next');
		},
		onFileChanged (fieldName, files) {
			let file = files[0]
			this.getSignedUrl(fieldName, file, file.type)
  	},
		async getSignedUrl (fieldName, file, ContentType) {
			return await fetch('/api/v1/imports/signed_url?filename='+file.name+'&content_type='+ContentType, {
				method: 'get',
				mode: 'no-cors',
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
				this.signedUrl = json.data;
				if(fieldName === 'prescription'){
					this.form.selectedFilePrescription = this.signedUrl.key
					this.splitFilePrescription = this.signedUrl.key.split('/')[1]
					let signedUrl = this.signedUrl.signed_url.split('.com')[1]
					fetch(signedUrl, {
						method: 'PUT',
						body: file
					})
					.then(json => {
						let t = json.data;
					})
				}
				if(fieldName === 'claim'){
					this.form.selectedFileClaim = this.signedUrl.key
					this.splitFileClaim = this.signedUrl.key.split('/')[1]
					let signedUrl = this.signedUrl.signed_url.split('.com')[1]
					fetch(signedUrl, {
						method: 'PUT',
						body: file
					})
					.then(json => {
						let t = json.data;
					})
				}
				if(fieldName === 'insurance-front'){
					this.form.selectedInsuranceFront = this.signedUrl.key
					this.splitFileInsuranceFront = this.signedUrl.key.split('/')[1]
					let signedUrl = this.signedUrl.signed_url.split('.com')[1]
					fetch(signedUrl, {
						method: 'PUT',
						body: file
					})
					.then(json => {
						let t = json.data;
					})
				}
				if(fieldName === 'insurance-back'){
					this.form.selectedInsuranceBack = this.signedUrl.key
					this.splitFileInsuranceBack = this.signedUrl.key.split('/')[1]
					let signedUrl = this.signedUrl.signed_url.split('.com')[1]
					fetch(signedUrl, {
						method: 'PUT',
						body: file
					})
					.then(json => {
						let t = json.data;
					})
				}
			})
		},
		enableUpload(val){
			if(val === 'separate_card'){
				this.isUploadInsurance = true
			}else{
				this.isUploadInsurance = false
			}
		}
	},
	computed: {
    rules () {
      return this.isUploadInsurance === true
        ? { selectedInsuranceFront: { required }, selectedInsuranceBack: { required }, selectedFilePrescription: { required }, agreeToConsent: { required, checked: value => value === true }} 
        : { selectedFilePrescription: { required }, agreeToConsent: { required, checked: value => value === true }  }
    }
  },
	validations() {
		return {
			form: this.rules
		};
	},
};
</script>

<style lang="scss" scoped>

</style>