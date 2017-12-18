<template>
    <div class="fly-root">
        <div ref="target">
            <slot name="target">
            </slot>
        </div>
        <transition :name="transitionName">
            <div class="fly" ref="flyElm" v-show="show" :class="{'fly-full':ShowType === 'fullScreen', 'fly-middle': placement.startsWith('middle') && ShowType === 'normal'}">
                <transition :name="transitionName">
                    <slot name="fly" v-if="show"></slot>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'show',
            event: 'change'
        },
        mounted () {
            this.setTargetEvents();
            if ( this.autoClose )
                document.addEventListener( 'click', this.bundleClick );
        },
        computed: {
            transitionName () {
                return this.ShowType === 'fullScreen' ? 'fullFade' : 'fade';
            }
        },
        watch: {
            show ( newVal ) {
                if ( newVal ) {
                    this.setFlyPosition();
                    if ( this.autoClose )
                        document.addEventListener( 'click', this.bundleClick );
                }
                else {
                    this.setTargetEvents();
                }
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            autoClose: {
                type: Boolean,
                default: true
            },
            ShowType: {
                type: String,
                default: 'normal',
                validator ( val ) {
                    return val === 'normal' || val === 'fullScreen';
                }
            },
            triggerType: {
                type: String,
                default: 'click',
                validator ( val ) {
                    return /(click)|(hover)|(longClick)/.test( val );
                }
            },
            placement: {
                type: String,
                default: 'middleBottom',
                validator ( val ) {
                    return /(leftTop)|(rightTop)|(middleTop)|(leftBottom)|(rightBottom)|(middleBottom)/
                        .test( val );
                }
            }
        },
        methods: {
            setFlyPosition () {
                if ( this.ShowType === 'fullScreen' ) return;
                let target = this.$refs.target;
                let fly = this.$refs.flyElm;
                fly.style.left = 'unset';
                fly.style.top = 'unset';
                fly.style.right = 'unset';
                fly.style.bottom = 'unset';

                let tw = target.offsetWidth, th = target.offsetHeight;
                let bw = window.innerWidth;
                let bh = window.innerHeight;
                let left = 0, top = 0;
                let t = target;
                while ( t ) {
                    left += t.offsetLeft;
                    top += t.offsetTop;
                    t = t.offsetParent;
                }
                switch ( this.placement ) {
                    case 'leftTop':
                        fly.style.left = left + 'px';
                        fly.style.bottom = bh - top + 'px';
                        break;
                    case 'middleTop':
                        fly.style.left = left + tw / 2 + 'px';
                        fly.style.bottom = bh - top + 'px';
                        break;
                    case 'rightTop':
                        fly.style.right = bw - left - tw + 'px';
                        fly.style.bottom = bh - top + 'px';
                        break;
                    case 'leftBottom':
                        fly.style.left = left + 'px';
                        fly.style.top = top + th + 'px';
                        break;
                    case 'middleBottom':
                        fly.style.left = left + tw / 2 + 'px';
                        fly.style.top = top + th + 'px';
                        break;
                    case 'rightBottom':
                        fly.style.right = bw - left - tw + 'px';
                        fly.style.top = top + th + 'px';
                        break;
                    default:
                        break;
                }
            },
            setTargetEvents () {
                let target = this.$refs.target;
                if ( this.triggerType === 'click' )
                    target.addEventListener( 'click', this.targetClick, { once: true } );
                if ( this.triggerType === 'hover' )
                    target.addEventListener( 'mouseenter', this.targetHover, { once: true } );
            },
            bundleClick ( e ) {
                if ( !this.show ) {
                    document.removeEventListener( 'click', this.bundleClick );
                    return;
                }
                /** @type {HTMLElement} */
                let fly = this.$refs.flyElm;
                if ( this.ShowType === 'fullScreen' ) {
                    if ( fly === e.target ) {
                        this.$emit( 'change', false );
                        document.removeEventListener( 'click', this.bundleClick );
                    }
                }
                else if ( !fly.contains( e.target ) ) {
                    this.$emit( 'change', false );
                    document.removeEventListener( 'click', this.bundleClick );
                }
            },
            targetClick ( e ) {
                this.$emit( 'change', true );
                e.stopPropagation();
            },
            targetHover ( e ) {
                this.$emit( 'change', true );
                let hide = true;
                let flyElm = this.$refs.flyElm;
                flyElm.addEventListener( 'mouseenter', () => { hide = false; }, { once: true } );
                setTimeout( () => {
                    if ( hide ) {
                        this.$emit( 'change', false );
                    }
                    else {
                        flyElm.addEventListener( 'mouseleave', () => this.$emit( 'change', false ), { once: true } );
                    }
                }, 800 );
            }
        }
    }
</script>

<style scoped>
    .fly {
      display: inline-block;
      z-index: 99999;
      position: absolute;
      box-shadow: 2px 2px 3px rgba(124, 63, 63, 0.6);
      margin: 8px 0;
      border-radius: 5% 5%;
    }

    .fly-middle {
      transform: translateX(-50%);
    }

    .fly-full {
      top: 0px; 
      left: 0px;
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: rgba(32, 16, 32, 200);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999 !important;
    }

    .fly-full > * {
      margin-top: -8mm;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.5s ease;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0.1;
      transform: scaleY(0.3);
      transform-origin: top center;
    }

    .fullFade-enter-active,
    .fullFade-leave-active {
      transition: opacity 1s ease;
    }

    .fullFade-enter,
    .fullFade-leave-to {
      opacity: 0.2;
    }

    @media all and (min-width: 800px) {
      .fly-full {
        padding: 2vh 10vw;
        box-sizing: border-box;
      }
    }
</style>