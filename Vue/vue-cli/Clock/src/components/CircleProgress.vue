<template>
    <div class="cp-root">
        <div class="slot">
            <slot></slot>
        </div>
        <svg viewBox="0 0 100 100">
            <path v-if="backCircle" d="M50 3 A47 47 0 1 1 49.99992617257264 3.0000000000579803" stroke-width="2" fill-opacity="0" :stroke="back"></path>
            <path v-if="foreCircle" :d="d" stroke-width="2" fill-opacity="0" :stroke="color"></path>
            <ellipse v-if="foreCircle" :cx="circleCenter.x" :cy="circleCenter.y" rx="2" ry="2" :fill="color"></ellipse>
        </svg>
    </div>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: 'white'
            },
            back:{
                type:String,
                default:'white'
            },
            backCircle:{
                type:Boolean,
                default:true
            },
            foreCircle:{
                type:Boolean,
                default:true
            },
            deg: {
                type: Number,
                default: 0,
                validator( val ) {
                    return 0 <= val <= 360;
                }
            }
        },
        data(){
            return {
                circleCenter:{
                    x:50,y:3
                }
            }
        },
        computed: {
            d() {
                let deg = - this.deg + 90;
                deg = Math.PI / 180 * deg;
                let y = 47 * Math.sin( deg );
                y = y < 0 ? - y + 50 : 50 - y;
                let x = 50 + 47 * Math.cos( deg );
                let large = this.deg > 180 ? 1 : 0;
                this.circleCenter = { x, y };
                return 'M50 3 A47 47 0 ' + large + ' 1 ' + x + ' ' + y
            }
        }
    }
</script>

<style scoped>
    .cp-root {
        display: inline-flex;
    }

    .slot {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        z-index: 99;
    }

    svg {
        width: 100%;
        height: 100%;
        margin-left: -100%;
    }
</style>