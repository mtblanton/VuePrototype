const jsonHeaders = new Headers({
        'Content-Type': 'application/json'
});

function getJSONPostOptions(body) {
    const jsonPostOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: jsonHeaders
    }

    return jsonPostOptions;
}


function getFriendlyName(string) {
    let newString = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    newString = newString.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return newString;
}

function getLabelWithColon(label, id) {
    let newLabel = label;
    if (!label) {
        newLabel = getFriendlyName(id);
    }
    return newLabel + ':';
}

Vue.component('label-input', {
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        value: {
            type: String,
            required: false,
            default: ''
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        valid: {
            type: Boolean,
            required: false,
            default: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        updateValue(value) {
            this.isDirty = true;
            this.$emit('input', String(value));
        }
    },
    computed: {
        labelWithColon() {
            return getLabelWithColon(this.label, this.id);
        },
        shouldShowError() {
            return this.isDirty && ((this.required && !this.value) || !this.isValid)
        },
        isValid() {
            return Boolean(this.value && this.valid);
        }
    },
    data() {
        return {
            isDirty: false
        }
    },
    template: `
        <div class="group">
            <label :for="id">
                {{ labelWithColon }}
            </label>
            <input type="text" 
                :id="id" 
                :class="{ error: shouldShowError, required: required, valid: isValid }" 
                :value="value" 
                :disabled="disabled" 
                @input="updateValue($event.target.value)" />
        </div>`
});

Vue.component('label-select', {
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        value: {
            type: String,
            required: false,
            default: ''
        },
        options: {
            type: Array,
            required: true
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        valid: {
            type: Boolean,
            required: false,
            default: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        updateValue: function (value) {
            this.isDirty = true;
            this.$emit('input', value);
        }
    },
    computed: {
        labelWithColon: function () {
            return getLabelWithColon(this.label, this.id);
        },
        shouldShowError() {
            return !this.valid || (this.isDirty && !this.value);
        },
        isValid() {
            return this.value && this.valid;
        }
    },
    data() {
        return {
            isDirty: false
        }
    },
    template: `
        <div class="group">
            <label :for="id">
                {{ labelWithColon }}
            </label>
                <select 
                    :id="id" 
                    :value="value" 
                    @input="updateValue($event.target.value)" 
                    :class="{ error: shouldShowError, required: required, valid: isValid }"
                    :disabled="disabled" >
                <option
                    v-for="option in options"
                    :value="option.Value"
                    :selected="option.Value == value" >
                    {{ option.Name }}
                </option>
            </select>
        </div>`
});

Vue.component('label-checkbox', {
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        value: {
            type: Boolean,
            required: false,
            default: ''
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        updateValue: function (value) {
            this.isDirty = true;
            this.$emit('input', Boolean(value));
        }
    },
    computed: {
        friendlyLabel() {
            if (this.label) {
                return this.label;
            } else {
                return getFriendlyName(this.id);
            }
        }
    },
    data() {
        return {
            isDirty: false
        }
    },
    template: `
        <div class="checkbox-group">
            <label :for="id">
                {{ friendlyLabel }}
            </label>
            <input type="checkbox" 
                :id="id" 
                :checked.bool="value" 
                :disabled="disabled"
                @change="updateValue($event.target.checked)" >
        </div>`
});

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
                v-on:input="updateAddress" ></label-input>
        </div>`
});
