
Vue.use(VTooltip, {
    // Default tooltip placement relative to target element
    defaultPlacement: 'top',
    // Default CSS classes applied to the tooltip element
    defaultClass: 'vue-tooltip-theme',
    // Default HTML template of the tooltip element
    // It must include `tooltip` & `tooltip-inner` CSS classes
    defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    // Delay (ms)
    defaultDelay: 0,
    // Default events that trigger the tooltip
    defaultTrigger: 'focus',
    // Default position offset (px)
    defaultOffset: 0,
    // Default container where the tooltip will be appended
    defaultContainer: 'body',
    defaultBoundariesElement: undefined,
    defaultPopperOptions: {},
  });

var subsidiaryComponent = {
    props: {
        value: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        states: {
            type: Array,
            required: true
        }
    },
    methods: {
        removeSubsidiary() {
            this.$emit('remove');
        },
        updateSubsidiary() {
            this.$emit('input', this.subsidiary)
        }
    },
    data() {
        return {
            subsidiary: Object.assign({
                Name: '',
                TaxId: '',
                City: '',
                State: ''
            }, this.value)
        }
    },
    watch: {
        'value': function () {
            Object.assign(this.subsidiary, this.value);
        }
    },
    computed: {
        isValidSubsidiaryName() {
            return !this.value.Name || this.value.Name.length > 2;
        },
        isValidTaxId() {
            return !this.value.TaxId || this.value.TaxId.length === 0 || this.value.TaxId.length === 9;
        },
        isValidCity() {
            return true;
        },
        isValidState() {
            return true;
        },
        nameId() {
            return `subsidiary${this.index}_Name`;
        },
        taxIdId() {
            return `subsidiary${this.index}_TaxId`;
        },
        cityId() {
            return `subsidiary${this.index}_City`;
        },
        stateId() {
            return `subsidiary${this.index}_State`;
        },
        removeButtonId() {
            return `subsidiary${this.index}_Remove`;
        }
    },
    template: `
        <div class="subsidiary">
            <label-input 
                :id="nameId" 
                label="Name" 
                v-model="subsidiary.Name" 
                :required.bool="true" 
                :valid="isValidSubsidiaryName" 
                @input="updateSubsidiary" ></label-input>
            <label-input 
                :id="taxIdId" 
                label="Tax ID" 
                v-model="subsidiary.TaxId" 
                :valid="isValidTaxId" 
                @input="updateSubsidiary" ></label-input>
            <label-input 
                :id="cityId" 
                label="City" 
                v-model="subsidiary.City" 
                :required.bool="true" 
                :valid="isValidCity" 
                @input="updateSubsidiary" ></label-input>
            <label-select 
                :id="stateId" 
                label="State" 
                v-model="subsidiary.State" 
                :options="states" 
                :required.bool="true" 
                :valid="isValidState"  
                @input="updateSubsidiary"></label-select>
            <button type="button"
                :id="removeButtonId" 
                class="btn btn-danger btn-x btn-remove-subsidiary" 
                @click="removeSubsidiary">X</button>
        </div>`
};

var groupShell = new Vue({
    el: '#app-7',
    mounted() {
            this.setInitialData();
    },
    data() {
        return {
            GroupName: '',
            TaxState: '',
            PolicyState: '',
            PolicyStateSameAsTaxState: false,
            BluePartner: '',
            BluePartnerOptions:
            [
            ],
            BenefitAddressSameAsOrganization: false,
            BenefitContactAddress: {
                Line1: '',
                Line2: '',
                Line3: '',
                City: '',
                State: '',
                Zip: ''
            },
            OrganizationContactAddress: {
                Line1: '',
                Line2: '',
                Line3: '',
                City: '',
                State: '',
                Zip: ''
            },
            Subsidiaries: [],
            States: []
        }
    },
    methods: {
        setInitialData() {
            Object.assign(this.$data, groupShellModel);
        },
        addSubsidiary() {
            this.Subsidiaries.push({
                Id: this.Subsidiaries.length + 1,
                Name: '',
                TaxId: '',
                City: '',
                State: ''
            });
        },
        removeSubsidiary(index) {
            this.Subsidiaries.splice(index, 1);
        },
        copyOrganizationAddressToBenefitAddress() {
            if (this.BenefitAddressSameAsOrganization) {
                if (!this.BenefitContactAddress) {
                    this.BenefitContactAddress = {
                        Line1: '',
                        Line2: '',
                        Line3: '',
                        City: '',
                        State: '',
                        Zip: ''
                    };
                }
                Object.assign(this.BenefitContactAddress, this.OrganizationContactAddress)
            }
        },
        copyTaxStateToPolicyState() {
            if (this.PolicyStateSameAsTaxState) {
                this.PolicyState = this.TaxState;
            }
        },
        submitGroupShell: async function () {
            const response = await fetch('/Home/SaveGroupShell', getJSONPostOptions(this.$data));
        }
    },
    computed: {
        isValidGroupName() {
            return !this.GroupName || this.GroupName.length > 2;
        },
        shouldShowBenefitContactAddress() {
            return !this.BenefitAddressSameAsOrganization;
        }
    },
    components: {
        'subsidiary': subsidiaryComponent
    }
});
