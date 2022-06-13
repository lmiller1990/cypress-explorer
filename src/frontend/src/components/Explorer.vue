<script lang="ts" setup>
import type { Spec } from "../main";
import { writeSpecs } from "./api";
import { exWrapper } from "../explorerStyle";

const props = defineProps<{
  specs: Spec[];
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const checked = new Map<string, boolean>(
  props.specs.map((spec) => [spec.relative, false])
);

async function handleSubmit() {
  // @ts-expect-error - it exists, trust me
  const projectRoot = Cypress.config("projectRoot");

  const specs = Array.from(checked).reduce<string[]>((acc, curr) => {
    if (curr[1]) {
      return acc.concat(curr[0]);
    }
    return acc;
  }, []);

  await writeSpecs(projectRoot, specs);

  handleClose()
}

function handleInput(spec: string) {
  const currentValue = checked.get(spec)!;
  checked.set(spec, !currentValue);
}

function handleClose() {
  emit("close");
}
</script>

<template>
  <div :id="exWrapper">
    <div class="ex-wrapper">
      <div class="ex-top-bar">
        <button id="ex-close-explorer" class="ex-button" @click="handleClose">
          ✖
        </button>
      </div>
      <form class="ex-form">
        <ul class="ex-ul">
          <li v-for="spec of specs" :key="spec.relative" class="ex-spec-item">
            <input
              :id="spec.relative"
              :name="spec.relative"
              class="ex-input"
              type="checkbox"
              :value="checked.get(spec.relative!)"
              @input="handleInput(spec.relative)"
            />
            <label :for="spec.relative">{{ spec.relative }}</label>
          </li>
        </ul>
      </form>

      <div class="ex-button-wrapper">
        <button
          type="submit"
          @click="handleSubmit"
          class="ex-submit-button ex-button"
        >
          Run
        </button>
      </div>
    </div>
  </div>
</template>
