<template>
    <Teleport to="#target">
      <div>
          Hello from Teleport
      </div>
    </Teleport>
      <div v-if="error">
          {{ error }}
      </div>
      <router-view v-slot="{ Component }" v-else>
        <template v-if="Component">
          <suspense timeout="0">
            <template #default>
              <component :is="Component"></component>
            </template>
            <template #fallback>
              <div>Loading... Please wait.</div>
            </template>
          </suspense>
        </template>
    </router-view>
</template>

<script lang="ts">
import { ref, onErrorCaptured, defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup () {
    const error = ref(null);

    onErrorCaptured((e: any) => {
      error.value = e

      return true;
    });
    
    return { error };
  }
});
</script>


