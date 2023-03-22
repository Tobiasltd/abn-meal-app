<template>
   <section class="video-container">
    <iframe
      class="video"
      :src="youtubeEmbedUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      >
    </iframe>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  strYoutube: string;
}>();

const youtubeEmbedUrl = computed(() => {
  if (props.strYoutube) {
    const videoId = props.strYoutube.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return undefined;
});

</script>

<style lang="scss" scoped>
.video-container {
  margin-top: 2rem;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
