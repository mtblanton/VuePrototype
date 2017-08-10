function getFriendlyName(string) {
    let newString = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    newString = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
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
            <input type="text" :id="id" :class="{ error: shouldShowError, required: required, valid: isValid }" :value="value" @input="updateValue($event.target.value)" />
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
            <select :id="id" :value="value" @input="updateValue($event.target.value)" :class="{ error: shouldShowError, required: required, valid: isValid }">
                <option
                    v-for="option in options"
                    :value="option.Value" >
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
            <input type="checkbox" :id="id" :checked.bool="value" @change="updateValue($event.target.checked)">
        </div>`
});

Vue.component('add-ress',
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
            return `${addressIdPrefix}${fieldName}`;
        }
    },
    computed: {
        isValidCityStateZip() {
            // make ajax call to check
        },
        line1Id() {
            return getAddressId('Line1');
        },
        line2Id() {
            return getAddressId('Line2');
        },
        line3Id() {
            return getAddressId('Line3');
        },
        cityId() {
            return getAddressId('City');
        },
        stateId() {
            return getAddressId('State');
        },
        zipId() {
            return getAddressId('Zip');
        }
    },
    template: `
        <div class="address">
            <label-input :id="line1Id" label="Line 1" v-model:"value.Line1" :required.bool="true" />
            <input :id="line2Id" v-model:"value.Line2" />
            <input :id="line3Id" v-model:"value.Line3" />
            <label-input :id="cityId" label="City" v-model:"value.City" :required.bool="true" />
            <label-select :id="stateId" label="State" v-model:"value.State" :required.bool="true" />
            <label-input :id="zipId" label="Zip" v-model:"value.Zip" :required.bool="true" />
        </div>`
});
