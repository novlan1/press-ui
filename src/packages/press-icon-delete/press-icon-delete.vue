<!-- eslint-disable max-len -->
<template>
  <!-- #ifdef H5 -->
  <svg
    class="press-number-keyboard__delete-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 22"
  >
    <path
      d="M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z"
      fill="currentColor"
    />
  </svg>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <image
    class="press-number-keyboard__delete-icon"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAyMiI+PHBhdGggZD0iTTI4IDBhNCA0IDAgMCAxIDQgNHYxNGE0IDQgMCAwIDEtNCA0SDEwLjRhMiAyIDAgMCAxLTEuNC0uNkwxIDEzLjFjLS42LS41LS45LTEuMy0uOS0yIDAtMSAuMy0xLjcuOS0yLjJMOSAuNmEyIDIgMCAwIDEgMS40LS42em0wIDJIMTAuNGwtOC4yIDguM2ExIDEgMCAwIDAtLjMuN2MwIC4zLjEuNS4zLjdsOC4yIDguNEgyOGEyIDIgMCAwIDAgMi0yVjRjMC0xLjEtLjktMi0yLTJ6bS01IDRhMSAxIDAgMCAxIC43LjMgMSAxIDAgMCAxIDAgMS40TDIwLjQgMTFsMy4zIDMuM2MuMi4yLjMuNS4zLjcgMCAuMy0uMS41LS4zLjdhMSAxIDAgMCAxLS43LjMgMSAxIDAgMCAxLS43LS4zTDE5IDEyLjRsLTMuNCAzLjNhMSAxIDAgMCAxLS42LjMgMSAxIDAgMCAxLS43LS4zIDEgMSAwIDAgMS0uMy0uN2MwLS4yLjEtLjUuMy0uN2wzLjMtMy4zLTMuMy0zLjNBMSAxIDAgMCAxIDE0IDdjMC0uMy4xLS41LjMtLjdBMSAxIDAgMCAxIDE1IDZhMSAxIDAgMCAxIC42LjNMMTkgOS42bDMuMy0zLjNBMSAxIDAgMCAxIDIzIDZ6IiBmaWxsPSJjdXJyZW50Q29sb3IiIC8+PC9zdmc+"
  />
  <!-- #endif -->
</template>
<script>
export default {
  name: 'PressIconPlusDelete',
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
