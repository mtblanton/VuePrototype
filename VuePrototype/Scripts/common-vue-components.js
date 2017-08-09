function getFriendlyName(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return string;
}

function getLabelWithColon(label, id) {
    if (!label) {
        label = getFriendlyName(id);
    }
    return label + ':';
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