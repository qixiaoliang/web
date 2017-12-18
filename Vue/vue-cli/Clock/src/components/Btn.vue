<template>
    <div class="btn-root" :class="{on,off:!on}" :style="{width,height}" @click="click">
        <div class="back" :style="backStyle"></div>
        <div class="toggle" :style="toggleStyle"></div>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'on',
            event: 'toggle'
        },
        props: {
            on: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '36px'
            },
            height: {
                type: String,
                default: '21px'
            },
            background: {
                type: Object,
                default () {
                    return {
                        on: '#dda9',
                        off: '#999'
                    }
                },
                validator: this.colorValidator
            },
            color: {
                type: Object,
                default () {
                    return {
                        on: '#d92',
                        off: '#dda',
                    }
                },
                validator: this.colorValidator
            }
        },
        methods: {
            click () {
                this.$emit( 'toggle', !this.on );
            },
            colorValidator ( val ) {
                return typeof ( val ) === 'object' && 'on' in val && off in val
                    && typeof ( val[on] ) === 'string' && typeof ( val[off] ) === 'string';
            }
        },
        computed: {
            toggleStyle () {
                return {
                    background: this.on ? this.color['on'] : this.color['off'],
                    width: this.height,
                    height: this.height,
                    transform: this.on ? `translateX(calc(${this.width} - ${this.height}))` : 'unset'
                }
            },
            backStyle () {
                return {
                    background: this.on ? this.background['on'] : this.background['off']
                }
            }
        },
        data () {
            return {
                
            }
        }
    }
</script>

<style scoped>
    .btn-root {
      display: inline-flex;
      align-items: center;
    }

    .btn-root > * {
      transition: background 0.5s ease-in-out, transform 0.2s ease-in 0.2s;
    }

    .back {
      border-radius: 15%/50%;
      width: 100%;
      height: 66%;
    }

    .toggle {
      border-radius: 50%;
      margin-left: -100%;
      z-index: 99;
    }

    .off > .toggle {
    }

    .on > .toggle {
    }
</style>