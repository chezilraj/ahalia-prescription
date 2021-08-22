<template>
	<div class="details">
		<section class="details__hero">
			<span class="logo logo-white"></span>
		</section>
		<section class="details__form-container">
			<h1>Add Deatils Here</h1>
			<div class="form-group">
				<label>Name *</label>
				<input
					type="text"
					v-model="v$.form.name.$model"
					placeholder="Enter your Name"
				/>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.name.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group">
				<label>Email *</label>
				<input
					type="text"
					v-model="v$.form.email.$model"
					placeholder="Enter your email "
				/>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.email.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group">
				<label>Phone Number *</label>
				<div class="form-mobile">
					<input
						type="text"
						v-model="v$.form.phonecode.$model"
						placeholder="+971"
					/>
					<input
						type="text"
						v-model="v$.form.phonenumber.$model"
						placeholder="987654321432"
					/>
				</div>
					<div
						class="input-errors"
						v-for="(error, index) of v$.form.phonecode.$errors"
						:key="index"
					>
						<span class="error-msg">{{ error.$message }}</span>
					</div>
					<div
						class="input-errors"
						v-for="(error, index) of v$.form.phonenumber.$errors"
						:key="index"
					>
						<span class="error-msg">{{ error.$message }}</span>
					</div>
			</div>
			<div class="form-group form-group__upload">
				<label>Upload Emirates ID *</label>
				<input
					type="file"
					id="emirate-front"
					@change="onFileChanged('front', $event.target.files)"
				/>
				<label for="emirate-front" class="file-upload">
					<span class="icon-upload"></span>
					<span class="upload-item" v-if="form.selectedFileFront">{{ splitFileFront }}</span>
					<span class="upload-text" v-else>Upload Back Side</span>
				</label>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.selectedFileFront.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group form-group__upload">
				<input
					type="file"
					id="emirate-back"
					@change="onFileChanged('back', $event.target.files)"
				/>
				<label for="emirate-back" class="file-upload">
					<span class="icon-upload"></span>
					<span class="upload-item" v-if="form.selectedFileBack">{{ splitFileBack }}</span>
					<span class="upload-text" v-else>Upload Back Side</span>
				</label>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.selectedFileBack.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group">
				<label class="custom-checkbox"
					>I agree to the <a href="#">Terms and Conditions</a>
					<input type="checkbox" v-model="v$.form.terms.$model" />
					<span class="checkmark"></span>
				</label>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.terms.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group form-group__action">
				<button
					type="submit"
					class="button button--blue submit"
					:disabled="v$.form.$invalid"
					@click="nextStep"
				>
					NEXT <icon class="icon__arrow icon-right-arrow" />
				</button>
			</div>
		</section>
	</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, numeric } from "@vuelidate/validators";

export default {
	setup() {
		return { v$: useVuelidate() };
	},
	data() {
		return {
			form: {
				email: null,
				email: null,
				phonecode: null,
				phonenumber: null,
				emiratesId: null,
				terms: false,
				selectedFileFront: null,
				selectedFileBack: null,
			},
			splitFileFront: null,
			splitFileBack: null,
			signedUrl: null
		};
	},
	methods: {
		nextStep() {
			this.$store.commit('SAVE_DETAILS', this.form);
			this.$emit('next-block', 2, 'next');
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
				if(fieldName === 'front'){
					this.form.selectedFileFront = this.signedUrl.key
					this.splitFileFront = this.signedUrl.key.split('/')[1]
					let signedUrl = this.signedUrl.signed_url.split('.com')[1]
					fetch(signedUrl, {
						method: 'PUT',
						body: file
					})
					.then(json => {
						let t = json.data;
					})
				}
				if(fieldName === 'back'){
					this.form.selectedFileBack = this.signedUrl.key
					this.splitFileBack = this.signedUrl.key.split('/')[1]
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
		}
	},
	validations() {
		return {
			form: {
				name: {
					required,
				},
				email: {
					required,
					email,
				},
				phonecode: {
					required,
					numeric,
					min: minLength(3),
				},
				phonenumber: {
					required,
					numeric,
					min: minLength(7),
				},
				selectedFileFront: {
					required
				},
				selectedFileBack: {
					required
				},
				terms: {
					checked: value => value === true,
					required
				},
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.details {
	&__hero {
		display: flex;
		justify-content: center;
		align-items: center;
		.logo {
			width: 180px;
			height: 100px;
		}
	}
	.icon__arrow {
		font-size: 16px;
		margin-left: 14px;
		&::before {
			color: #fff;
		}
	}
}
</style>
