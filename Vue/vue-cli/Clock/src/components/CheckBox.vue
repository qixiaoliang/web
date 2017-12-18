<template>
    <div class="checkbox-root" @click="click">
        <Icon v-if="checked" :name="'ic_check_box'" class="checked"></Icon>
        <Icon v-if="!checked" :name="'ic_check_box_outline_blank'" class="uncheck"></Icon>
        <slot></slot>
    </div>
</template>

<script>
    import Icon from './Icon';

    export default {
        model:{
            prop:'checked',
            event:'change'
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            click () {
                this.$emit( 'change', !this.checked );
            }
        },
        components: {
            Icon
        }
    }
</script>

<style scoped>
    .checkbox-root {
      display: inline-flex;
      padding: 0.2em 0;
      align-items: center;
    }
    .uncheck,
    .checked {
      margin-right: 3mm;
      width: 26px;
      height: 26px;
    }
    .uncheck {
      stroke: white;
      fill: white;
      animation: appear .6s ease backwards;
    }
    .checked {
      fill: white;
      stroke: black;
      animation: appear .6s ease backwards;
    }

    @keyframes appear {
        0%{
            fill: transparent;
        }
        100%{
            fill: white
        }
    }
</style>

