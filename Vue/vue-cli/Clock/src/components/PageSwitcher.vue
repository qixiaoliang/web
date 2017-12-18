<template>
    <div class="pageSwitcher" ref="slide" @touchmove="swipe" @touchend="touchend">
        <div class="header">
            <div class="option" @click="view = 'AlarmPanel'" :class="{selected: view === 'AlarmPanel'}">
                <Icon name="ic_access_alarms" class="icon"></Icon>
                <span>闹钟</span>
            </div>
            <div class="option" @click="view = 'ClockPanel'" :class="{selected: view === 'ClockPanel'}">
                <Icon name="ic_access_time" class="icon"></Icon>
                <span>时钟</span>
            </div>
            <div class="option" @click="view = 'TimerPanel'" :class="{selected: view === 'TimerPanel'}">
                <Icon name="ic_hourglass_empty" class="icon"></Icon>
                <span>定时器</span>
            </div>
            <div class="option" @click="view = 'CountDown'" :class="{selected: view === 'CountDown'}">
                <Icon name="ic_timer" class="icon"></Icon>
                <span>秒表</span>
            </div>
        </div>
        <transition :name="groupName">
            <keep-alive>
                <div :is="view" class="content" :key="view"></div>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import AlarmPanel from './AlarmPanel';
    import ClockPanel from './ClockPanel';
    import TimerPanel from './TimerPanel';
    import CountDown from './CountDown';
    import Icon from './Icon';
    const viewList = ['AlarmPanel', 'ClockPanel', 'TimerPanel', 'CountDown']

    export default {
        data () {
            return {
                view: 'ClockPanel',
                groupName: 'group'
            }
        },
        watch: {
            view ( newVal, oldVal ) {
                let index = viewList.indexOf( newVal );
                let oldIndex = viewList.indexOf( oldVal );
                this.groupName = index < oldIndex ?
                    'group' : 'groupReverse';
            }
        },
        components: {
            Icon, TimerPanel, ClockPanel, CountDown, AlarmPanel
        },
        methods: {
            /** @param {TouchEvent} e */
            swipe ( e ) {
                /** @type {HTMLElement} */
                let container = this.$refs.slide;
                let view = container.lastChild;
                /** @type {HTMLElement} */
                let t = e.target;
                if ( t === view || view.contains( t ) ) {
                    let isFly = false;
                    while ( t !== view ) {
                        if ( t.classList.contains( 'fly-root' ) ) {
                            isFly = true;
                            break;
                        }
                        t = t.parentElement;
                    }
                    if ( isFly ) return;

                    const screenX = e.touches[e.touches.length - 1].screenX;
                    if ( !this.movementX )
                        this.movementX = 0;
                    if ( !this.prePoint )
                        this.prePoint = screenX;
                    this.movementX += screenX - this.prePoint;
                    this.prePoint = screenX;
                    view.style.transform = 'translateX(' + this.movementX + 'px)';
                }

            },
            touchend ( e ) {
                if ( !this.movementX ) return;
                /** @type {HTMLElement} */
                let view = this.$refs.slide.lastChild;
                let i = viewList.indexOf( this.view );
                if ( Math.abs( this.movementX ) > 80 ) {
                    if ( this.movementX < 0 ) {
                        if ( i + 1 === viewList.length ) {
                            view.style.transform = 'none';
                        } else {
                            this.view = viewList[i + 1];
                            view.addEventListener( 'transitionend', () => {
                                view.style.transform = 'none';
                            }, { once: true } )
                        }
                    }
                    else {
                        if ( i === 0 ) {
                            view.style.transform = 'translateX(0)';
                        } else {
                            this.view = viewList[i - 1];
                            view.addEventListener( 'transitionend', () => {
                                view.style.transform = 'none';
                            }, { once: true } ) 
                        }
                    }
                }
                else {
                    view.style.transform = 'none';
                }
                this.movementX = this.prePoint = 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pageSwitcher {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .header {
        margin-bottom: 5mm;
        margin-top: 3mm;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;

        .option {
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: all 0.6s ease;
          cursor: pointer;
          .icon {
            width: 28px;
            height: 28px;
            fill: white;
          }
          span {
            font-size: 0.8em;
            color: white;
            margin-left: 3mm;
          }
        }
        .selected {
          opacity: 1;
        }
      }
      .content {
        flex: 1;
        width: 100%;
      }
    }

    @media all and (max-width: 540px) {
      .pageSwitcher .header {
        padding: 0 3mm;
        .option {
          flex-direction: column;
          justify-content: center;
          span {
            margin-left: 0;
            margin-top: 2mm;
          }
        }
      }
    }

    .group-enter {
      transform: translateX(-100%) !important;
    }
    .group-enter-active {
      transition: transform 0.8s ease;
    }

    .group-leave-active {
      transition: all 0.8s ease;
      position: absolute;
      top: 60px;
    }
    .group-leave-to {
      transform: translateX(100%) !important;
    }

    .groupReverse-enter {
      transform: translateX(100%) !important;
    }
    .groupReverse-enter-active {
      transition: transform 0.8s ease;
    }

    .groupReverse-leave-active {
      transition: all 0.8s ease;
      position: absolute;
      top: 60px;
    }
    .groupReverse-leave-to {
      transform: translateX(-100%) !important;
    }
</style>

