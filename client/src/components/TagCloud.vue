<template>
  <div class="tag-cloud" @mousemove="controlByMouse" @mouseleave="resetRotate">
    <div class="tag-cloud-wrapper">
      <span
        v-for="o in tagsPos"
        :key="o.tag.id"
        class="tag"
        :style="getStyle(o)"
        @mouseleave="stop = false"
        @mouseenter="stop = true"
      >
        <slot :tag="o.tag">
          {{ o.name }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script>
const BASEANGLE = Math.PI / 360

/**
 * Inspired By {@link https://github.com/crazylxr/3d-tag-cloud-for-react}
 */
export default {
  props: {
    tags: Array,
    speed: {
      type: Number,
      default: 1,
    },
    radius: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      stop: false,
      tagsPos: [],
      angleX: this.speed * BASEANGLE,
      angleY: this.speed * BASEANGLE,
    }
  },
  computed: {
    focalLength() {
      return this.radius * 1.5
    },
  },
  created() {
    this.initTagsPos()
  },
  mounted() {
    const animation = () => {
      if (!this.stop) {
        this.rotateX()
        this.rotateY()
      }
      requestAnimationFrame(animation)
    }

    requestAnimationFrame(animation)
  },
  methods: {
    initTagsPos() {
      const tags = this.tags
      const len = tags.length

      this.tagsPos = tags.map((tag, i) => {
        const angleA = Math.acos((2 * (i + 1) - 1) / len - 1)
        const angleB = angleA * Math.sqrt(len * Math.PI)

        const z = this.radius * Math.cos(angleA)
        const y = this.radius * Math.sin(angleA) * Math.sin(angleB)
        const x = this.radius * Math.sin(angleA) * Math.cos(angleB)
        // eslint-disable-next-line unicorn/number-literal-case
        const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16)

        const tagProp = {
          name: tag.name,
          x,
          y,
          z,
          color,
          tag,
        }

        return tagProp
      })
    },

    getStyle(tag) {
      const r = this.radius
      const scale = this.focalLength / (this.focalLength - tag.z)
      const alpha = (tag.z + r) / (2 * r)

      return {
        left: tag.x + 'px',
        top: tag.y + 'px',
        fontSize: 14 * scale + 'px',
        opacity: alpha + 0.5,
        color: tag.color,
      }
    },

    rotateX() {
      const cos = Math.cos(this.angleX)
      const sin = Math.sin(this.angleX)

      this.tagsPos.forEach((tag) => {
        const y = tag.y * cos - tag.z * sin
        const z = tag.z * cos + tag.y * sin
        tag.y = y
        tag.z = z
      })
    },

    rotateY() {
      const cos = Math.cos(this.angleY)
      const sin = Math.sin(this.angleY)

      this.tagsPos.forEach((tag) => {
        const x = tag.x * cos - tag.z * sin
        const z = tag.z * cos + tag.x * sin
        tag.x = x
        tag.z = z
      })
    },

    resetRotate() {
      this.angleX = this.speed * BASEANGLE
      this.angleY = this.speed * BASEANGLE
    },

    controlByMouse(e) {
      const x = e.offsetX
      const y = e.offsetY
      const w = e.target.clientWidth
      const h = e.target.clientHeight

      const halfW = w / 2
      const halfH = h / 2

      const scaleX = (x - halfW) / halfW
      const scaleY = (y - halfH) / halfH

      const shouldReverse = scaleX * scaleY > 0 ? -1 : 1

      this.angleX = scaleX * this.speed * BASEANGLE * shouldReverse * 2
      this.angleY = scaleY * this.speed * BASEANGLE * shouldReverse * 2
    },
  },
}
</script>

<style scoped>
.tag-cloud {
  width: 600px;
  height: 500px;

  @apply inline-block text-center;

  /* @apply shadow; */
}

.tag-cloud-wrapper {
  width: 1px;
  height: 300px;
  margin-top: 200px;
  @apply relative;
  @apply inline-block;
}

.tag {
  display: inline-block;
  position: absolute;
  height: 50px;
  line-height: 50px;
  text-decoration: none;
  width: max-content;

  @apply cursor-pointer;
}
</style>
