<script lang="ts" setup>
import type { Spec } from "../main"
import { writeSpecs } from "./api"

const props = defineProps<{
  specs: Spec[]
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>()

const checked = new Map<string, boolean>(props.specs.map((spec) => [spec.relative, false]));

function handleSubmit() {
  // @ts-expect-error
  const projectRoot = Cypress.config('projectRoot')

  const specs = Array.from(checked).reduce<string[]>((acc, curr) => {
    if (curr[1]) {
      return acc.concat(curr[0])
    }
    return acc
  }, [])

  writeSpecs(projectRoot, specs)
  console.log(checked);
}

function handleInput (spec: string) {
  const currentValue = checked.get(spec)!
  checked.set(spec, !currentValue)
}

function handleClose () {
  emit('close')
}
</script>

<template>
  <div class="wrapper">
    <div class="top-bar">
      <button id="close-explorer" @click="handleClose">✖</button>
    </div>
    <form>
      <ul>
        <li v-for="spec of specs" :key="spec.relative" class="spec-item">
          <input
            :id="spec.relative"
            :name="spec.relative"
            type="checkbox"
            :value="checked.get(spec.relative!)"
            @input="handleInput(spec.relative)"
          />
          <label :for="spec.relative">{{ spec.relative }}</label>
        </li>
      </ul>
    </form>

    <div class="button-wrapper">
      <button type="submit" @click="handleSubmit" class="submit-button">Run</button>
    </div>
  </div>
</template>

<style scoped>
@import "./reset.css";

.top-bar {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  color: red;
  height: 50px;
}

.wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 2px solid gray;
  padding: 12px;
  font-size: 1.5rem;
  border-radius: 8px;
  background: #f3f4f6;
  box-shadow: 0px 5px 20px 1px;
  height: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.spec-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  margin: 5px 0;
}

input[type="checkbox"] {
  margin: 5px 8px 0 0;
}

ul {
  margin: 10px 0;
  /* height: 100%; */
}

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
}

button {
  font-size: 1.5rem;
  background: #4956e3;
  color: white;
  border-radius: 4px;
  border: none;
  padding: 11px 16px;
  cursor: pointer;
}

#close-explorer {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button {
  width: 100px;
}

button:hover {
  transition: 0.1s;
  outline: 2px solid #4956e338;
}
</style>
