<template>
    <div class="paginate">
        <div class="d-flex justify-content-between">
            <span class="py-2">{{ meta.from ? meta.from : 0}}-{{ meta.to ? meta.to : 0 }} of {{ meta.total }}</span>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <li class="page-item m-1">
                        <span class="page-link" tabindex="-1" aria-disabled="true">
                            Hiển thị
                        </span>
                    </li>
                    <li class="page-item m-1">
                        <select 
                            class="form-select" 
                            v-model="perPage"
                            @change="showPerPage()"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </li>
                    <li 
                        class="page-item m-1"
                        :class="{ 'disabled': links.prev === null }"
                        @click.prevent="links.prev && getResults(currentPage)"
                    >
                        <a class="page-link" tabindex="-1" aria-disabled="true">first</a>
                    </li>
                    <li 
                        class="page-item m-1"
                        :class="{ 'disabled': links.prev === null }"
                        @click.prevent="links.prev && getResults(meta.currentPage - currentPage)"
                    >
                        <a class="page-link" tabindex="-1" aria-disabled="true">previous</a>
                    </li>
                    <li 
                        class="page-item m-1"
                        v-if="links.prev" @click.prevent="getResults(meta.currentPage - currentPage)"
                    >
                        <a class="page-link">{{ meta.currentPage - currentPage }}</a>
                    </li>
                    <li 
                        class="page-item m-1 active"
                    >
                        <a class="page-link">{{ meta.currentPage }}</a>
                    </li>
                    <li 
                        class="page-item m-1"
                        v-if="links.next" @click.prevent="getResults(meta.currentPage + currentPage)"
                    >
                        <a class="page-link">{{ meta.currentPage + currentPage }}</a>
                    </li>
                    <li 
                        class="page-item m-1"
                        :class="{ 'disabled': links.next === null }"
                        @click.prevent="links.next && getResults(meta.currentPage + currentPage)"
                    >
                        <a class="page-link">next</a>
                    </li>
                    <li 
                        class="page-item m-1"
                        :class="{ 'disabled': links.next === null }"
                        @click.prevent="links.next && getResults(Math.ceil(meta.total/meta.perPage))"
                    >
                        <a class="page-link">last</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Paginate',

    props: {
        meta: {
            type: Object,
            required: true
        },
        links: {
            type: Object,
            required: true
        },
    },

    emits: ['page', 'per-page'],

    setup(props, {emit}) {
        const currentPage = ref(1);
        const perPage = ref(100);

        const getResults = (page: number) => {
            emit('page', page);
        };

        const showPerPage = () => {
            emit('per-page', perPage.value);
        };
        

        return {
            currentPage,
            perPage,
            getResults,
            showPerPage
        }
    },
});
</script>

<style lang="scss" scoped>
</style>