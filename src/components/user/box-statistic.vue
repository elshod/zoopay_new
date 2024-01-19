<template>
    <div class="box">
        <q-icon :name="box.icon" color="green-10" class="icon" />
        <div class="title">{{ box.title }}</div>
        <div class="value">{{ box.value }}</div>
        <div class="desc" v-if="box.desc">{{ box.desc }}</div>
    </div>
</template>

<script setup>
defineProps(['box'])
</script>

<style lang="scss" scoped>
    .box {
        background-color: #fff;
        border:1px solid #e4e4e4;
        padding: 15px;
        border-radius: 15px;
        position: relative;
        min-height: 110px;
        display: flex;
        flex-direction: column;
        .value {
            margin-top: auto;
            font-size: 26px;
            font-weight: 700;
        }
        .icon {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 24px;
            font-weight: 700;
        }
        .title {
            font-size: 18px;
            color: #3e3e3e;
            
        }
    }
</style>