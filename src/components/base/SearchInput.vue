<template>
  <div>
    <label for="input-live">Input keyword:</label>
    <b-form-input
      id="input-live"
      v-model="localValue"
      :state="valueState"
      type="search"
      aria-describedby="input-live-help input-live-feedback"
      :placeholder=placeholder
      trim
      @input="inputValue"
      @keyup.enter="pressEnter"
    />
    <b-form-invalid-feedback id="input-live-feedback">
      Enter only english letters
    </b-form-invalid-feedback>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    valueState() {
      if (!this.localValue) {
        return null;
      }
      const regex = /^[a-zA-Z]+$/;
      return regex.test(this.localValue);
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    inputValue() {
      this.$emit('input', this.localValue);
    },
    pressEnter() {
      if (this.valueState) {
        this.$emit('pressEnter');
      }
    },
  },
};
</script>
