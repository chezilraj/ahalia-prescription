<template>
	<div class="details">
		<section class="details__hero">
			<span class="details__hero_back"
				><span @click="$emit('next-block', 3)"
					><span class="icon-left-arrow"></span> BACK</span
				>
				<span class="logo logo-white logo-side"></span
			></span>
		</section>
		<section class="details__form-container">
			<h1>Your Address</h1>
			<div class="form-group">
				<label>Area *</label>
				<input
					type="text"
					v-model="v$.form.area.$model"
					placeholder="Bur Dubai"
				/>
				<div
					class="input-errors"
					v-for="(error, index) of v$.form.area.$errors"
					:key="index"
				>
					<span class="error-msg">{{ error.$message }}</span>
				</div>
			</div>
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
						v-model="form.altphonecode"
						placeholder="+971"
					/>
					<input
						type="text"
						v-model="form.altphonenumber"
						placeholder="987654321432"
					/>
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
import {
	required
} from "@vuelidate/validators";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore;
		return { v$: useVuelidate() };
	},
	data() {
		return {
			form: {
				area: null,
				street: null,
				flat: null,
				deliveryInstructions: null,
				altphonecode: null,
				altphonenumber: null,
			},
		};
	},
	methods: {
		nextStep() {
			//this.$store.commit("SAVE_ADDRESS", this.form);
			this.$emit("next-block", 4);
		},
	},
	validations() {
		return {
			form: {
				area: {
					required,
				},
				street: {
					required,
				},
				flat: {
					required,
				},
			},
		};
	},
};
</script>


<style lang="scss" scoped>

</style>
