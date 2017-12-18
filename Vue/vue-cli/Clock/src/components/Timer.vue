<template>
    <CircleProgress class="circle" color="#8080c0" :deg="progress">
        <div class="timer-root">
            <Fly ShowType="fullScreen" :show="flyShow" @change="s => flyShow = s">
                <div slot="target" @click="flyShow = true" style="font-size:1em;color:#ccc;cursor:pointer">{{label}}</div>
                <InputDialog slot="fly" title="请输入标签名" @cancel="flyShow=false" @done="setLabel"></InputDialog>
            </Fly>
            <div :class="[timerTextCls,{blink:pause}]" class="timerText">
                {{ timerText }}
            </div>
            <div v-if="! pause" @click="addAMinute">+1:00</div>
            <div v-if="pause" @click="Timer = timer">重置</div>
        </div>
    </CircleProgress>
</template>

<script>
    import CircleProgress from './CircleProgress';
    import Fly from './Fly';
    import InputDialog from './InputDialog';

    export default {
        beforeMount () {
            this.interval = setInterval( () => {
                if ( this.pause ) return;
                let { h, m, s } = this.Timer;
                let seconds = h * 3600 + m * 60 + s;
                seconds--;
                this.Timer = {
                    h: Math.floor( seconds / 3600 ),
                    m: Math.floor( seconds % 3600 / 60 ),
                    s: seconds % 60
                }
                let total = this.totalTime.h * 3600 + this.totalTime.m * 60 + this.totalTime.s;
                this.progress = ( total - seconds ) / total * 360;
                if ( seconds === 0 ) {
                    window.alarmBell.$emit( 'alarm', this.label );
                    clearInterval( this.interval );
                    this.progress = 359.99;
                };
            }, 1000 )
        },
        beforeDestroy () {
            clearInterval( this.interval );
        },
        props: {
            timer: {
                type: Object,
                required: true
            },
            pause: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                label: '标签',
                Timer: Object.assign( {}, this.timer ),
                totalTime: Object.assign( {}, this.timer ),
                flyShow: false,
                progress: 0,
                timerTextCls: ''
            }
        },
        methods: {
            addAMinute () {
                let { h, m, s } = this.Timer;
                let seconds = h * 3600 + m * 60 + s;
                seconds += 60;
                this.Timer = {
                    h: Math.floor( seconds / 3600 ),
                    m: Math.floor( seconds % 3600 / 60 ),
                    s: seconds % 60
                };
                let total = this.totalTime.h * 3600 + this.totalTime.m * 60 + this.totalTime.s;
                total += 60;
                this.totalTime = {
                    h: Math.floor( total / 3600 ),
                    m: Math.floor( total % 3600 / 60 ),
                    s: total % 60
                }
                this.progress = ( total - seconds ) / total * 360;
            },
            setLabel ( label ) {
                this.label = label;
                this.flyShow = false;
            }
        },
        computed: {
            timerText () {
                if ( !this.Timer ) {
                    return '0';
                }
                let text = '';
                let s = this.Timer.s < 10 ? '0' + this.Timer.s : this.Timer.s;
                if ( this.Timer.h === 0 ) {
                    if ( this.Timer.m === 0 ) {
                        text = this.Timer.s;
                        this.timerTextCls = 'timerText-largest';
                    }
                    else {
                        text = this.Timer.m + ':' + s;
                        this.timerTextCls = 'timerText-large';
                    }
                }
                else {
                    let { h, m } = this.Timer;
                    m = m < 10 ? '0' + m : m;
                    text = h + ':' + m + ':' + s;
                    this.timerTextCls = 'timerText-normal';
                }
                return text;
            }
        },
        components: {
            CircleProgress, Fly, InputDialog
        }
    }
</script>

<style scoped>
    .timer-root {
      width: 100%;
      height: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }

    .timer-root > :nth-child(n + 3) {
      font-size: 1em;
      color: white;
      cursor: pointer;
    }

    .timer-root > :nth-child(n + 3):hover {
      transform: scale(1.2);
      opacity: 0.8;
      transition: all 1s ease;
    }

    @keyframes blink {
      0% {
        opacity: 0;
      }
      30% {
        opacity: 0.7;
      }
      70% {
        opacity: 1;
      }
      100% {
        opacity: 1;
      }
    }
    .pause {
      animation: blink 1.2s ease infinite;
      animation-delay: 0.3s;
    }
</style>