Vue.component('v-address',
{
    props: {
        value: {
            type: Object,
            required: false
        },
        states: {
            type: Array,
            required: true
        },
        addressIdPrefix: {
            type: String,
            required: false,
            default: 'address'
        }
    },
    methods: {
        getAddressId(fieldName) {
            return `${this.addressIdPrefix}_${fieldName}`;
        },
        updateAddress() {
            this.isValidCityStateZip();
            this.$emit('input', this.address);
        },
        isValidCityStateZip: async function () {
            const response = await fetch('/Home/IsValidAddress', getJSONPostOptions(this.address));
            this.isValidAddress = await response.json();
        },
    },
    data() {
        return {
            address: Object.assign({
                Line1: '',
                Line2: '',
                Line3: '',
                City: '',
                State: '',
                Zip: ''
            }, this.value),
            isValidAddress: true
        }
    },
    watch: {
        'value': function () {
            Object.assign(this.address, this.value);
        }
    },
    computed: {
        line1Id() {
            return this.getAddressId('Line1');
        },
        line2Id() {
            return this.getAddressId('Line2');
        },
        line3Id() {
            return this.getAddressId('Line3');
        },
        cityId() {
            return this.getAddressId('City');
        },
        stateId() {
            return this.getAddressId('State');
        },
        zipId() {
            return this.getAddressId('Zip');
        },
        tooltipMessage() {
            return this.isValidAddress ? '' : 'This City/State/Zip combination is invalid';
        }
    },
    template: `
        <div class="address">
            <div class="address-lines">
                <label-input 
                    :id="line1Id" 
                    label="Address" 
                    v-model="address.Line1" 
                    :required.bool="true" 
                    v-on:input="updateAddress" ></label-input>
                <div class="group">
                    <input :id="line2Id" v-model="address.Line2" v-on:input="updateAddress"></input>
                    <input :id="line3Id" v-model="address.Line3" v-on:input="updateAddress"></input>
                </div>
            </div>
            <label-input 
                :id="cityId" 
                label="City" 
                v-model="address.City" 
                :required.bool="true" 
                v-on:input="updateAddress" ></label-input>
            <label-select 
                :id="stateId" 
                label="State" 
                v-model="address.State" 
                :required.bool="true" 
                :options="states" 
                v-on:input="updateAddress" ></label-select>
            <label-input 
                :id="zipId" 
                label="Zip" 
                v-model="address.Zip" 
                :required.bool="true" 
                :valid="isValidAddress" 
                v-on:input="updateAddress"
                :errorMessage="tooltipMessage" ></label-input>
        </div>`
});
