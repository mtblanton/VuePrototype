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
            return `subsidiaryName${this.id}`;
        },
        taxIdId() {
            return `subsidiaryTaxId${this.id}`;
        },
        cityId() {
            return `subsidiaryCity${this.id}`;
        },
        stateId() {
            return `subsidiaryState${this.id}`;
        },
        removeButtonId() {
            return `subsidiaryRemove${this.id}`;
        }
    },
    template: `
        <div class="subsidiary">
            <label-input :id="nameId" label="Name" v-model="value.Name" :required.bool="true" :valid="isValidSubsidiaryName"></label-input>
            <label-input :id="taxIdId" label="Tax ID" v-model="value.TaxId" :valid="isValidTaxId"></label-input>
            <label-input :id="cityId" label="City" v-model="value.City" :required.bool="true" :valid="isValidCity"></label-input>
            <label-select :id="stateId" label="State" v-model="value.State" :options="states" :required.bool="true" :valid="isValidState" />
            <button :id="removeButtonId" @click="removeSubsidiary">X</button>
        </div>`
};

var vm = new Vue({
    el: '#app-7',
    mounted() {
            this.setInitialData();
    },
    data() {
        return {
            GroupName: '',
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
        }
    },
    computed: {
        isValidGroupName() {
            return !this.GroupName || this.GroupName.length > 2;
        }
    },
    components: {
        'subsidiary': subsidiaryComponent
    }
});