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
        },
        errorMessage: {
            type: String,
            required: false,
            default: ''
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
            return this.isDirty && ((this.required && !this.value) || !this.isValid);
        },
        isValid() {
            return this.value && this.valid;
        },
        classObject() {
            return {
                error: this.shouldShowError,
                required: this.required,
                valid: this.isValid
            };
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
                :class="classObject" 
                :value="value" 
                :disabled="disabled" 
                v-tooltip="errorMessage"
                @input="updateValue($event.target.value)" />
        </div>`
});
