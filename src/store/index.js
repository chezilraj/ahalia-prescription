import { createStore } from 'vuex'

const store = createStore({
	state: {
		orderDetails: {
			name: null,
			email: null,
			phone: null,
			emiratesId: null,
			agreeTerms: false,
			selLocation: null,
			area: null,
			buildingStreet: null,
			flatNo: null,
			deliveryInstructions: null,
			addContact: null,
			ePrescriptionNo: null,
			uploadPriscription: null,
			uploadClaim: null,
			insuranceCard: null,
			frontInsurance: null,
			backInsurance: null,
			agreeToConsent: false,
			paymentOption: null,
		}

	}, 
	getters: {
	},
	mutations: {
		SAVE_DETAILS (state, payload) {
			state.orderDetails.name = payload.name
			state.orderDetails.email = payload.email
			state.orderDetails.phone = payload.phone
			state.orderDetails.emiratesId = payload.emiratesId
			state.orderDetails.agreeTerms = payload.agreeTerms
		},
		SAVE_LOCATION (state, location) {
			state.orderDetails.selLocation = location
		},
		SAVE_ADDRESS (state, payload) {
			state.orderDetails.area = payload.area
			state.orderDetails.buildingStreet = payload.buildingStreet
			state.orderDetails.flatNo = payload.flatNo
			state.orderDetails.deliveryInstructions = payload.deliveryInstructions
			state.orderDetails.addContact = payload.addContact
		},
		SAVE_PRESCRIPTION (state, payload) {
			state.orderDetails.ePrescriptionNo = payload.ePrescriptionNo
			state.orderDetails.uploadPriscription = payload.uploadPriscription
			state.orderDetails.uploadClaim = payload.uploadClaim
			state.orderDetails.insuranceCard = payload.insuranceCard
			state.orderDetails.agreeToConsent = payload.agreeToConsent
			state.orderDetails.frontInsurance = payload.frontInsurance
			state.orderDetails.backInsurance = payload.backInsurance
		},
		SAVE_PAYMENT (state, payload) {
			state.orderDetails.paymentOption = payload
		}
	}, 
	actions: {}
})

export default store