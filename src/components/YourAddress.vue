<template>
	<div class="details">
		<section class="details__hero">
			<span class="details__hero_back"
				><span @click="$emit('next-block', 3, 'prev')"
					><span class="icon-left-arrow"></span> BACK</span
				>
				<span class="logo logo-white logo-side"></span
			></span>
		</section>
		<section class="details__form-container">
			<h1>Your Address</h1>
			<div class="form-group">
				<label>Building Name / Street *</label>
				<input
					type="text"
					v-model="v$.form.street.$model"
					placeholder="Building Name"
				/>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.street.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group">
				<label>Flat / Room / Villa no / Office No *</label>
				<input
					type="text"
					v-model="v$.form.flat.$model"
					placeholder="2389423"
				/>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.flat.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group">
				<label>Delivery Instructions</label>
				<textarea
					type="text"
					v-model="form.deliveryInstructions"
					placeholder="Eg: Dont  Ring Bell"
				></textarea>
			</div>
			<div class="form-group">
				<label>Add additional Contact number</label>
				<div class="form-mobile">
					<input
						type="text"
						placeholder="+971"
						value="+971"
						disabled
					/>
					<input
						type="text"
						v-model="v$.form.altphonenumber.$model"
						placeholder="500000000"
					/>
				</div>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.altphonenumber.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
			<div class="form-group">
				<button
					type="submit"
					:disabled="v$.form.$invalid"
					class="button button--blue submit"
					@click="nextStep"
				>
					NEXT
				</button>
			</div>
		</section>
	</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, numeric, minLength } from "@vuelidate/validators";

export default {
	setup() {
		return { v$: useVuelidate() };
	},
	data() {
		return {
			form: {
				street: null,
				flat: null,
				deliveryInstructions: null,
				altphonenumber: null,
			},
		};
	},
	methods: {
		nextStep() {
			this.$store.commit("SAVE_ADDRESS", this.form);
			this.$emit("next-block", 4, 'next');
		},
	},
	validations() {
		return {
			form: {
				street: {
					required: helpers.withMessage('Street Name is required', required)
				},
				flat: {
					required,
				},
				altphonenumber: {
					numeric,
					min: minLength(9),
				}
			}
		}
	}
};
</script>


<style lang="scss" scoped>

</style>
