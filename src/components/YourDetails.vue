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
					@change="onFileChangedFront"
				/>
				<label for="emirate-front" class="file-upload">
					<span class="icon-upload"></span>
					<span class="upload-item" v-if="form.selectedFileFront">{{ form.selectedFileFront }}</span>
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
					@change="onFileChangedBack"
				/>
				<label for="emirate-back" class="file-upload">
					<span class="icon-upload"></span>
					<span class="upload-item" v-if="form.selectedFileBack">{{ form.selectedFileBack }}</span>
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
				selectedFileBack: null
			}
		};
	},
	methods: {
		nextStep() {
			this.$store.commit('SAVE_DETAILS', this.form);
			this.$emit('next-block', 2, 'next');
		},
		onFileChangedFront (event) {
    this.form.selectedFileFront = event.target.files[0].name
  	},
		onFileChangedBack (event) {
    this.form.selectedFileBack = event.target.files[0].name
  	},
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
