<template>
    <component :is="element[variant]" :class="classes">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";
import { TypographyVariant } from "../../types";

interface Props {
    variant?: TypographyVariant;
    bold?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "body",
});

const element: { [key: string]: string } = {
    "xxl-title": "h1",
    "xl-title": "h2",
    "l-title": "h3",
    body: "p",
};

const classes = computed(() => ({
    "font-bold": props.bold,
    "xxl-title": props.variant === "xxl-title",
    "xl-title": props.variant === "xl-title",
    "l-title": props.variant === "l-title",
    "body": props.variant === "body"
}));
</script>

<style lang="scss" scoped>
.font-bold {
  font-weight: bold;
}

.xxl-title {
  font-size: 42px;
  line-height: 42px;
  @media (min-width: 640px) {
    font-size: 54px;
    line-height: 54px;
  }
  @media (min-width: 1024px) {
    font-size: 60px;
    line-height: 60px;
  }
  @media (min-width: 1280px) {
    font-size: 72px;
    line-height: 72px;
  }
}

.xl-title {
  font-size: 30px;
  line-height: 30px;
  @media (min-width: 640px) {
    font-size: 36px;
    line-height: 36px;
  }
  @media (min-width: 1024px) {
    font-size: 42px;
    line-height: 42px;
  }
  @media (min-width: 1280px) {
    font-size: 54px;
    line-height: 54px;
  }
}

.l-title {
  font-size: 36px;
  line-height: 36px;
  @media (min-width: 640px) {
    font-size: 30px;
    line-height: 30px;
  }
  @media (min-width: 1024px) {
    font-size: 36px;
    line-height: 36px;
  }
}

.body {
  font-size: 16px;
  line-height: 24px;
  @media (min-width: 1024px) {
    font-size: 18px;
    line-height: 30px;
  }
  @media (min-width: 1280px) {
    font-size: 24px;
    line-height: 36px;
  }
}
</style>
