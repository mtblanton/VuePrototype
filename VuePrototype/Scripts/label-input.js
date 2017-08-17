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
