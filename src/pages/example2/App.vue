<template>
  <div class="page-wrapper">
    <div class="title">{{ t('example2.title') }}</div>
    <div class="content">
      <p>{{ t('example2.content.hello') }}</p>
      <p>{{ t('example2.content.world') }}</p>
      <p>{{ t('example2.content.welcome') }}</p>
      <p>{{ t('example2.content.description') }}</p>
    </div>
    <example-btn />
  </div>
</template>

<script setup lang="ts">
// 多语言文件配置在 src/locales/目录 下
import { useI18n } from 'vue-i18n'
import exampleBtn from './components/example-btn.vue'
import { onMounted } from 'vue'
import { api } from '@/api'

const { t } = useI18n({})

onMounted(() => {
  console.log('example page mounted')

  console.log('api: ', api.example)
})
</script>

<style scoped lang="less">
.page-wrapper {
  padding: 0.24rem;
  margin: auto;

  .title {
    font-size: 0.32rem;
    color: #333;
    text-align: center;
    margin-bottom: 0.24rem;
  }

  .content {
    font-size: 0.24rem;
    color: #666;
    text-align: center;
    margin-bottom: 0.12rem;

    .p {
      margin-bottom: 0.12rem;
    }
  }
}
</style>
