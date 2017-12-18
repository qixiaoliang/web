<template>
    <div class="timerList">
        <div class="timers">
            <div ref="timerDom" @touchmove.prevent="swipe" @touchend="touchend">
                <transition-group :name="transitionName">
                    <Timer v-for="(item,index) in List" :pause="item.pause" :timer="item" v-show="index === curItem" :key="item.id">
                    </Timer>
                </transition-group>
            </div>
            <indicator :length="List.length" :curItem="curItem" @change="change"></indicator>
        </div>
        <div class="bottom">
            <Icon @click="remove" name="ic_clear" class="icon"></Icon>
            <Icon @click="pause" :name=" List[curItem].pause ? 'ic_play_arrow' : 'ic_pause'" class="actionButton"></Icon>
            <Icon @click="add" name="ic_add" class="icon"></Icon>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon';
    import Timer from './Timer';
    import Indicator from './Indicator';

    export default {
        data () {
            return {
                curItem: 0,
                List: this.list.map( ( timer, index ) => {
                    timer.pause = false;
                    timer.id = 'timerList-' + index;
                    return timer;
                } ),
                transitionName: 'list'
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            }
        },
        watch:{
            curItem(newVal,oldVal){
                this.transitionName = newVal < oldVal ? 'listReverse' : 'list';
            }
        },
        components: {
            Icon, Timer, Indicator
        },
        methods: {
            /** @param {TouchEvent} e */
            swipe ( e ) {
                /** @type {HTMLElement} */
                let container = this.$refs.timerDom;
                let view = container.children[0].children[this.curItem];
                /** @type {HTMLElement} */

                const screenY = e.touches[e.touches.length - 1].screenY;
                if ( !this.movementY )
                    this.movementY = 0;
                if ( !this.prePoint )
                    this.prePoint = screenY;
                this.movementY += screenY - this.prePoint;
                this.prePoint = screenY;
                view.style.transform = 'translateY(' + this.movementY + 'px)';
            },
            touchend ( e ) {
                if ( !this.movementY ) return;
                /** @type {HTMLElement} */
                let view = this.$refs.timerDom.children[0].children[this.curItem];
                let i = this.curItem;
                if ( Math.abs( this.movementY ) > 80 ) {
                    if ( this.movementY < 0 ) {
                        if ( i + 1 === this.List.length ) {
                        } else {
                            this.curItem = i + 1;
                        }
                    }
                    else {
                        if ( i === 0 ) {
                        } else {
                            this.curItem = i - 1;
                        }
                    }
                }
                view.style.transform = 'translateY(0)';
                this.movementY = this.prePoint = 0
            },
            pause () {
                let curItem = this.curItem;
                let item = this.List[curItem];
                item.pause = !item.pause;
                this.List.splice( curItem, 1, item );
            },
            remove () {
                this.List.splice( this.curItem, 1 );
                this.$emit( 'remove', this.List );
                if ( this.curItem >= this.List.length ) this.curItem = this.List.length - 1;
            },
            add () {
                this.$emit( 'add' );
            },
            change ( i ) {
                this.curItem = i;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .timerList {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .timers {
        display: flex;
        flex: 1;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        > div:first-child {
          flex: 1;
          display: flex;
          justify-content: center;
          margin-right: -20px;
        }
      }

      .bottom {
        box-sizing: border-box;
        padding: 0 15%;
        margin-bottom: 6mm;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
          fill: #ddd;
          width: 32px;
          height: 32px;
          cursor: pointer;
          background: transparent;
        }
        .icon:active {
          transition: all 1s ease;
          transform: scale(1.3);
          fill: white;
        }
      }
    }

    @media all and (max-width: 600px) {
      .timerList .circle {
        width: 230px;
        height: 230px;
      }
      .timerList .bottom {
        padding: 0 6%;
      }
    }

    @media all and (min-width: 600px) {
      .timerList .circle {
        width: 210px;
        height: 210px;
      }
      .timerList .bottom {
        padding: 0 15%;
      }
    }

    @media all and (min-width: 1000px) {
      .timerList .circle {
        width: 320px;
        height: 320px;
      }
    }

    .list-enter-active,
    .listReverse-enter-active {
      transition: transform .8s ease, opacity 0.7s ease;
    }
    .listReverse-enter {
      transform: translateY(-100%) !important;
      opacity: 0.3;
      position: absolute;
    }
    .list-enter {
      transform: translateY(100%) !important;
      opacity: 0.3;
      position: absolute;
    }
</style>