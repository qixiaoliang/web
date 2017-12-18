<template>
    <div class="circle-root" :class="{checked,unchecked:!checked}" @click="$emit('change', !checked)">
        <slot>
        </slot>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .circle-root {
      width: 22px;
      height: 22px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: black;
      font-size: 14px;
      padding: 4px;
    }

    .unchecked {
      animation: uncheckAnim 0.8s ease backwards;
      background: #0000;
      color: white;
    }
    .checked {
      animation: checkedAnim 0.8s ease backwards;
      background: white;
    }

    @keyframes uncheckAnim {
      0% {
        background: white;
        transform:scale(1.0);
      }
      100% {
        background: #fff3;
        transform:scale(1.4);
      }
    }
    @keyframes checkedAnim {
      0% {
        background: #fff2;
      }
      100% {
        background: #fff;
      }
    }
</style>
