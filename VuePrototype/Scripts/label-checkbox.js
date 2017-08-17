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