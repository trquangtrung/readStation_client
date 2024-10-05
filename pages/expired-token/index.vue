<template>
    <a-result status="404" title="Token đã hết hạn" sub-title="Xin lỗi, token của bạn hiện tại đã hết hạn.">
      <template #extra>
        <NuxtLink href="/">
            <a-button type="primary">Back Home</a-button>
        </NuxtLink>
      </template>
    </a-result>
  </template>