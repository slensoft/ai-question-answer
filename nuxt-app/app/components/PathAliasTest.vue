<script setup lang="ts">
// Test imports using ~/* alias
import { testFunction, TEST_UTIL_CONSTANT } from '~/utils/test-utils';
import type { TestType } from '~/types/test';
import { TEST_CONSTANT } from '~/types/test';

// Test imports using @/* alias
import { testFunction as testFn2 } from '@/utils/test-utils';
import type { TestType as TestType2 } from '@/types/test';

// Test the imports
const testData: TestType = {
  id: '1',
  name: 'Test Name',
};

const result = testFunction('Hello from ~/* alias');
const result2 = testFn2('Hello from @/* alias');

console.log('Path alias test results:', {
  result,
  result2,
  TEST_CONSTANT,
  TEST_UTIL_CONSTANT,
  testData,
});
</script>

<template>
  <div class="path-alias-test">
    <h2>Path Alias Test Component</h2>
    <p>~/* alias result: {{ result }}</p>
    <p>@/* alias result: {{ result2 }}</p>
    <p>TEST_CONSTANT: {{ TEST_CONSTANT }}</p>
    <p>TEST_UTIL_CONSTANT: {{ TEST_UTIL_CONSTANT }}</p>
    <p>Test Data: {{ testData }}</p>
  </div>
</template>

<style scoped>
.path-alias-test {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 1rem;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
}
</style>
