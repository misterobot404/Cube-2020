<template>
    <v-row>
        <v-col
            v-for="section in sections"
            :key="section"
            class="col-12 col-md-4"
        >
            <component :is="section"/>
        </v-col>
    </v-row>
</template>

<script>
import SalesTypes from "../components/SalesTypes";
import Units from "../components/Units";
import PaymentTypes from "../components/PaymentTypes";

export default {
    name: "Directory",
    components: {
        SalesTypes,
        Units,
        PaymentTypes
    },
    data: () => ({
        sections: [
            'PaymentTypes', 'SalesTypes', 'Units'
        ],
    }),
}
</script>



