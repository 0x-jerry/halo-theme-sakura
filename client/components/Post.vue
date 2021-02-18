<template>
  <div
    class="post flex mt-16 shadow-xl rounded-2xl overflow-hidden"
    :class="{ flip }"
  >
    <article class="post-article flex">
      <div class="content p-5">
        <h1 class="title overflow-hidden text-3xl font-bold">
          {{ post.title }}
        </h1>
        <div class="summary break-words mt-5 overflow-hidden">
          {{ post.summary }}
        </div>
      </div>
      <div class="thumb overflow-hidden">
        <img
          src="https://cdn.jsdelivr.net/gh/LIlGG/halo-theme-sakura@1.3.0/source/images/hd.jpg"
        />
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['post', 'flip'],
}
</script>

<style scoped>
.post {
  height: 300px;
}

.flip > .post-article {
  @apply flex-row-reverse;
}

.post-article {
}

.content {
  width: 45%;
}

.thumb {
  width: 55%;
}

.thumb img {
  transform: scale(1);
  transition: transform ease 0.4s;
}

.post:hover .thumb img {
  transform: scale(1.2);
}
</style>
