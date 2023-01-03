<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <table class="min-w-full divide-y divide-gray-200">
            <thead>
            <tr>
                <th>No.</th>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Name</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Email</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Address</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Website</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Edit / Delete</span>
                </th>
            </tr>
            </thead>
            
            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <tr class="bg-white" v-for="(client, index) in clients" :key="index">
                    <th class="align-middle">{{ (meta.currentPage - 1) * meta.perPage + index + 1 }}</th>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.name }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.email }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.address }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.website }}
                    </td>
                    <td class="px-6 py-4 text-sm text-center leading-5 text-gray-900 whitespace-no-wrap">
                        <router-link :to="{ name: 'client.edit', params: { id: client.id } }"
                            class="mr-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                            Edit
                        </router-link>
                        <button @click="deleteClient(client.id, index)"
                            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useClient from '@/composables/clients';

export default defineComponent({
    name: 'ClientTable',

    props: {
        clients: {
            type: Array as () => Array<any>,
            required: true,
            default: () => []
        },
        meta: {
            type: Object,
            required: true
        },
    } as any,

    setup(props: any) {
        const { destroyClient } = useClient();

        const deleteClient = async (id: number, index: number): Promise<void> => {
            if (!window.confirm('You sure?')) {
                return
            }
            await destroyClient(id);

            props.clients.splice(index, 1);
        };

        return {
            deleteClient
        }
    },
});
</script>