<script lang="ts" setup>
import type { Spec } from "./types";
import { writeSpecs } from "./api";
import { exWrapper } from "./explorerStyle";
import { computed, isVNode, ref } from "vue";

const props = defineProps<{
  specs: Spec[];
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const checked = new Map<string, boolean>(
  props.specs.map((spec) => [spec.relative, false])
);

const filter = ref('')

function normalize (spec: string) {
  // normalize path separators, remove / and \, lowercase
  return spec.replace(/\//gi, "").replace(/\\/gi, "").toLowerCase();
}

const filteredSpecs = computed(() => {
  return props.specs.filter((x) => {
    if (!filter.value) {
      return true
    }
    let s = normalize(x.relative)
    return s.includes(filter.value.toLowerCase())
  });
});

async function handleSubmit() {
  // @ts-expect-error - it exists, trust me
  const projectRoot = Cypress.config("projectRoot");

  const specs = Array.from(checked).reduce<string[]>((acc, curr) => {
    // if not filter, return all checked specs
    if (!filter.value) {
      if (curr[1]) {
        return acc.concat(curr[0]);
      }
    }

    // checked AND in filter
    if (curr[1] && normalize(curr[0]).includes(filter.value.toLowerCase())) {
      return acc.concat(curr[0]);
    }

    return acc;
  }, []);

  await writeSpecs(projectRoot, specs);

  handleClose();
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
      <div class="ex-input-wrapper">
        <input class="ex-text-input" v-model="filter" placeholder="Filter specs..." />
      </div>
      <form id="ex-form">
        <ul id="ex-ul">
          <li
            v-for="spec of filteredSpecs"
            :key="spec.relative"
            class="ex-spec-item"
          >
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
