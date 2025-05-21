<template lang="pug">
.btn(@click='changeLocale') 切换语言
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n({})

const changeLocale = (abc: any) => {
  const currentLocale = locale.value
  const newLocale = currentLocale === 'zh-CN' ? 'ja-JP' : 'zh-CN'
  locale.value = newLocale
  console.log('change locale to', newLocale)
}
</script>

<style scoped lang="less">
.btn {
  max-width: 6rem;
  margin: auto;
  margin-top: 0.24rem;
  cursor: pointer;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}
</style>
