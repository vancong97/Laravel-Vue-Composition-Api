<template>
    <div class="flex place-content-end mb-4">
        <div class="px-6 py-4 text-sm text-center leading-5 text-gray-900 whitespace-no-wrapr">
            <router-link :to="{ name: 'client.create' }" class="mr-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">Create Client</router-link>
        </div>
    </div>
    <div class="py-4">
        Name
        <input class="rounded-md font-semibold text-xs" 
            type="search" 
            v-model="dataSearch.name"
            @keyup.enter="search"
        >
        Email
        <input class="rounded-md font-semibold text-xs" 
            type="search" 
            v-model="dataSearch.email"
            @keyup.enter="search"
        >
    </div>
    <client-table :meta="meta" :clients="clients"></client-table>
    <paginate :meta="meta" :links="links" @page="page" @per-page="perPage"></paginate>
</template>

<script lang="ts">
    
import { defineComponent, onMounted, reactive } from 'vue';
import useClient from '@/composables/clients'
import ClientTable from '@/components/clients/ClientTable.vue'
import Paginate from '@/components/paginate/Paginate.vue'

function asyncSetTimeout(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
 
export default defineComponent({
    name: 'ClientIndex',

    components: {
		ClientTable,
        Paginate
	},

    async setup() {
        

        const dataSearch = reactive({
            name: '',
            email: ''
        });
        const paginate = reactive({
            page: 1,
            perPage: 100,
        });
        const { meta, links, clients, getClients } = useClient();
 
        onMounted(() => getClients(paginate.page, paginate.perPage, dataSearch.name, dataSearch.email)); // onMounted(getClients)

        const page = (page: number): void => {
            getClients(page, paginate.perPage, dataSearch.name, dataSearch.email);
        };

        const perPage = (perPage: number): void => {
            paginate.perPage = perPage;
            getClients(paginate.page, perPage, dataSearch.name, dataSearch.email);
        };

        const search = (): void => {
            getClients(paginate.page, paginate.perPage, dataSearch.name, dataSearch.email)
        };

        await asyncSetTimeout(3000);
 
        return {
            clients,
            meta,
            links,
            dataSearch,
            search,
            page,
            perPage,
        }
    }
});
</script>