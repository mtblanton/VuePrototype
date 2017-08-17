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
