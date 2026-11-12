<template>
  <div>
    <label class="mb-1 block text-sm font-medium" :for="id">{{ label }}<span v-if="required" class="ml-1 text-red-500" aria-hidden="true">*</span></label>
    <select
      :id="id"
      :name="name"
      :class="selectClass"
      :required="required"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      :aria-describedby="[help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') || undefined"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" :disabled="placeholderDisabled">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
    <p v-if="help" :id="`${id}-help`" class="mt-1 text-xs text-gray-500">{{ help }}</p>
    <p v-if="error" :id="`${id}-error`" class="mt-1 text-sm font-medium text-red-700">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  name: { type: String, default: undefined },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  options: { type: Array, required: true },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  help: { type: String, default: '' },
  error: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  placeholderDisabled: { type: Boolean, default: true },
  selectClass: { type: String, default: 'form-select w-full text-sm' },
})
defineEmits(['update:modelValue'])
</script>
