<template>
    <div class="countDown-root">
        <div class="body">
            <CircleProgress class="circle" :color="color" :back="back" :deg="deg" :foreCircle="foreCircle">
                <div class="time" @click="setStart" :class="{blink: !start && init}">
                    <span :class="timeCls">
                        {{totalText.slice(0,-3)}}
                    </span>
                    <span class="timerText-normal">
                        {{totalText.slice(-2)}} </span>
                </div>
            </CircleProgress>
            <transition name="fadeIn">
                <div class="list-wrap" v-if="timeList.length">
                    <div class="list">
                        <div class="item" :key="'countDown-total'">
                            <span>
                                {{'#' + this.timeList.length}}
                            </span>
                            <span>
                                {{getItemText(formatTime(progress).replace(':',' '))}}
                            </span>
                            <span>
                                {{totalText.replace(':',' ')}}
                            </span>
                        </div>
                        <div class="item" v-for="(item,index) in timeList" :key="'countDown-' + index">
                            <span>
                                {{'#' +( timeList.length - index - 1)}}
                            </span>
                            <span>
                                {{getItemText(item.progress) }}
                            </span>
                            <span>
                                {{getItemText(item.total)}}
                            </span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="bottom">
            <Icon name="ic_clear" :style="{visibility: start ? 'visible' : 'hidden'}" class="icon" @click="reset"></Icon>
            <Icon :name="start ? 'ic_pause' : 'ic_play_arrow'" @click="setStart" class="actionButton"></Icon>
            <Icon name="ic_circle" :style="{visibility: start ? 'visible' : 'hidden'}" class="icon" @click="setRing"></Icon>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon';
    import CircleProgress from './CircleProgress';
    const initState = {
        totalTime: 0,
        timeCls: 'timerText-largest',
        timeList: [],
        start: false,
        back: 'white',
        color: '#8080c0',
        foreCircle: false,
        deg: 0,
        perimeter: 0,
        progress: 0,
        init: false
    }

    export default {
        beforeMount () {
            this.interval = setInterval( () => {
                if ( this.start ) {
                    this.totalTime++;
                    if ( this.perimeter ) {
                        this.progress++;
                        this.deg = this.progress / this.perimeter * 360;
                        if ( this.deg > 360 ) {
                            this.back = this.color;
                            this.deg %= 360;
                        }
                    }
                }
            }, 10 );
        },
        beforeDestroy () {
            clearInterval( this.interval );
        },
        data () {
            return Object.assign( {}, initState )
        },
        components: {
            Icon, CircleProgress
        },
        computed: {
            totalText () {
                let a = this.formatTime( this.totalTime )
                    .replace( /^[0:]*/, '' );
                if ( a.length < 4 ) a = '0' + a;
                if ( a.length < 6 ) {
                    this.timeCls = 'timerText-largest';
                }
                else if ( a.length < 9 ) {
                    this.timeCls = 'timerText-large';
                }
                else {
                    this.timeCls = 'timerText-normal';
                }
                return a;
            }
        },
        methods: {
            setRing () {
                let total = this.formatTime( this.totalTime ).replace( ':', ' ' );
                if ( !this.perimeter ) {
                    this.perimeter = this.totalTime;
                    this.foreCircle = true;
                    let progress = this.formatTime( this.perimeter ).replace( ':', ' ' );
                    this.timeList.unshift(
                        { progress, total }
                    )
                }
                else {
                    let progress = this.formatTime( this.progress ).replace( ':', ' ' );
                    this.timeList.unshift(
                        { progress, total }
                    )
                    this.progress = 0;
                    this.back = 'white';
                }
            },
            reset () {
                Object.assign( this.$data, initState, { timeList: [] } )
            },
            formatTime ( time ) {
                let ms = time % 100 < 10 ? '.0' + time % 100 : '.' + time % 100
                let d = new Date( time * 10 );
                let a = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
                a = a.map( v => {
                    return v < 10 ? '0' + v : v
                } ).join( ':' );
                return a + ms;
            },
            getItemText ( time ) {
                return time.slice(
                    - this.totalText.length
                ).replace( ':', ' ' );
            },
            setStart () {
                this.init = true;
                this.start = !this.start;
            }
        }
    }
</script>

<style lang="scss">
    .countDown-root {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;

      .body {
        width: 80%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .circle {
          width: 260px;
          height: 260px;
        }
        @media all and (max-height: 500px) {
          .circle {
            width: 200px;
            height: 200px;
          }
        }
        @media all and (max-width: 580px) {
          .circle {
            height: 220px;
            width: 220px;
          }
        }

        .list-wrap {
          overflow: hidden;

          .list {
            max-height: 280px;
            overflow-y: auto;
            overflow-x: hidden;
            text-align: right;
            margin-right: -26px;
            padding-right: 26px;
            .item {
              padding: 1.5mm 0;
              > span {
                letter-spacing: 1px;
                color: white;
                font-size: 1em;
              }
              > span:first-child {
                color: #80d0d0;
                margin-right: 2mm;
              }
              > span:last-child {
                margin-left: 4mm;
              }
            }
          }
        }
      }

      .bottom {
        display: flex;
        width: 68%;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 4mm;
        margin-top: -6mm;

        .icon {
          width: 26px;
          height: 26px;
          fill: white;
          stroke: white;
          padding: 6px;
          background: transparent;
        }
        .actionButton {
          stroke: transparent;
        }

        > *:not(.actionButton) {
          cursor: pointer;
          &:active {
            opacity: 0.8;
            transform: scale(1.2);
            transition: all 0.8s ease;
          }
        }
      }
    }

    .fadeIn-enter-active {
      animation: move 0.6s ease;
      opacity: 0;
    }
    .fadeIn-leave-active {
      animation: move 0.6s ease reverse;
      opacity: 0;
    }

    @keyframes move {
      0% {
        width: 0px;
        height: 0px;
      }
      100% {
        width: 240px;
        height: 180px;
      }
    }

    @media all and (max-height: 500px) {
      .countDown-root .list {
        max-height: 200px !important;
      }
      .countDown-root .bottom {
        margin-top: 3mm;
        margin-bottom: 3mm;
        width: 76%;
      }
    }

    @media all and (max-width: 580px) {
      .countDown-root > .body {
        flex-direction: column;
        justify-content: center;
      }
      .countDown-root .list-wrap {
        margin-top: 4mm;
        margin-bottom: 3mm;
      }
      .countDown-root .list {
        max-height: 220px !important;
      }
      .countDown-root > .bottom {
        width: 100%;
      }
    }
</style>


