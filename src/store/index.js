import { createStore } from 'vuex'

const store = createStore({
	state: {
		orderDetails: {
			name: null,
			email: null,
			phone: null,
			emirates_id_file_url_front: null,
			emirates_id_file_url_back: null,
			prescription_no: null,
			prescription_file_url: null,
			claim_form_file_url: null,
			insurance_type: null,
			insurance_card_file_url_front: null,
			insurance_card_file_url_back: null,
			payment_option: null,
			address: null,
			building_no: null,
			delivery_instructions: null,
			area_id: null,
			location: null,
			alt_phone: null
		}

	}, 
	getters: {
	},
	mutations: {
		SAVE_DETAILS (state, payload) {
			state.orderDetails.name = payload.name
			state.orderDetails.email = payload.email
			state.orderDetails.phone = payload.phonecode + payload.phonenumber
			state.orderDetails.emirates_id_file_url_front = payload.selectedFileFront
			state.orderDetails.emirates_id_file_url_back = payload.selectedFileBack
		},
		SAVE_LOCATION (state, location) {
			state.orderDetails.location = location
		},
		SAVE_AREA_ID (state, payload) {
			state.orderDetails.area_id = payload
		},
		SAVE_ADDRESS (state, payload) {
			state.orderDetails.address = payload.street
			state.orderDetails.building_no = payload.flat
			state.orderDetails.delivery_instructions = payload.deliveryInstructions
			state.orderDetails.alt_phone = payload.altphonecode + payload.altphonenumber
		},
		SAVE_PRESCRIPTION (state, payload) {
			state.orderDetails.prescription_no = payload.ePrescriptionNo
			state.orderDetails.prescription_file_url = payload.selectedFilePrescription
			state.orderDetails.claim_form_file_url = payload.selectedFileClaim
			state.orderDetails.insurance_type = payload.insuranceCard
			state.orderDetails.insurance_card_file_url_front = payload.selectedInsuranceFront
			state.orderDetails.insurance_card_file_url_back = payload.selectedInsuranceBack
		},
		SAVE_PAYMENT (state, payload) {
			state.orderDetails.payment_option = payload
		}
	}, 
	actions: {}
})

export default store