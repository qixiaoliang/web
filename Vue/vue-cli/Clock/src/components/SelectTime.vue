<template>
    <div class="selectTime-root">
        <!-- vertical layout -->
        <div class="selectTime">
            <div class="header">
                <div class="headerAm">
                    <div :class="{select:isAm}" @click="isAm = true">
                        上午
                    </div>
                    <div :class="{select:!isAm}" @click="isAm = false">
                        下午
                    </div>
                </div>
                <div class="headerText">
                    <div @click="curClock = 'h'" :class="{select:curClock === 'h'}">
                        {{ (0
                        < hTime && hTime < 10 ? '0' : '') + (hTime===0 ? '12' : hTime)}} </div>
                            <div>:</div>
                            <div @click="curClock = 'm'" :class="{select:curClock === 'm'}">
                                {{mTime
                                < 10 ? '0' + mTime : mTime}} </div>
                            </div>
                    </div>

                    <div class="clockPlat">
                        <div class="clock indicator" :style="{transform: 'rotate(' + rotate + 'deg)'}">
                            <div class="l-Circle">
                                <div class="s-Circle"></div>
                            </div>
                            <div class="line"></div>
                        </div>

                        <div class="clock" :style="{transform: 'rotate(' + p.deg + 'deg)'}" :key="p.text" v-for="p in clock">
                            <span :style="{transform: 'rotate(-' + p.deg + 'deg)'}">{{p.text}}</span>
                        </div>
                        <div class="clock" ref="clock" @click="click" @mousemove="click" @touchmove.prevent="click"></div>
                    </div>

                    <div class="bottomBtns">
                        <button class="select" @click="select(true)">确定</button>
                        <button class="select" @click="select(false)">取消</button>
                    </div>
                </div>

                <!-- horizontal layout -->
                <div class="selectTime selectTime-Horizontal">
                    <div class="header header-Horizontal">
                        <div class="headerText headerText-Horizontal">
                            <div @click="curClock = 'h'" :class="{select:curClock === 'h'}">
                                {{( 0
                                < hTime && hTime < 10 ? '0' : '') + (hTime===0 ? '12' : hTime)}} </div>
                                    <div>:</div>
                                    <div @click="curClock = 'm'" :class="{select:curClock === 'm'}">
                                        {{mTime
                                        < 10 ? '0' + mTime : mTime}} </div>
                                    </div>
                                    <div class="headerAm">
                                        <div :class="{select:isAm}" @click="isAm = true">
                                            上午
                                        </div>
                                        <div :class="{select:!isAm}" @click="isAm = false">
                                            下午
                                        </div>
                                    </div>
                            </div>

                            <div>
                                <div class="clockPlat">
                                    <div class="clock indicator" :style="{transform: 'rotate(' + rotate + 'deg)'}">
                                        <div class="l-Circle">
                                            <div class="s-Circle"></div>
                                        </div>
                                        <div class="line"></div>
                                    </div>

                                    <div class="clock" :style="{transform: 'rotate(' + p.deg + 'deg)'}" :key="p.text" v-for="p in clock">
                                        <span :style="{transform: 'rotate(-' + p.deg + 'deg)'}">{{p.text}}</span>
                                    </div>
                                    <div class="clock" ref="clockHor" @click="click" @mousemove="click" @touchmove.prevent="click"></div>
                                </div>
                                <div class="bottomBtns">
                                    <button class="select" @click="select(true)">确定</button>
                                    <button class="select" @click="select(false)">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
</template>

<script>
    export default {
        props: {
        },
        data () {
            return {
                curClock: 'h',
                isAm: true,
                hTime: 0,
                mTime: 0,
                rotate: 0
            }
        },
        watch: {
            curClock ( newValue ) {
                if ( newValue === 'h' ) this.rotate = this.hTime * 30;
                else this.rotate = this.mTime * 6;
            }
        },
        computed: {
            clock () {
                let arr = new Array( 12 ).fill( 0 );
                return this.curClock === 'h' ?
                    arr.map( ( v, i ) => {
                        let o = {};
                        o.deg = i * 30;
                        o.text = i === 0 ? 12 : i;
                        return o;
                    } ) :
                    arr.map( ( v, i ) => {
                        let o = {};
                        o.deg = i * 30;
                        i *= 5;
                        o.text = i < 10 ? '0' + i : i;
                        return o;
                    } )
            }
        },
        methods: {
            getClockPoints () {
                let { clock, clockHor } = this.$refs;
                let ref = clock.clientWidth > 0 ? clock : clockHor;
                let radius = ref.clientWidth / 2 - 18;
                let center = ref.clientWidth / 2;
                let deg = 90 * Math.PI / 180;
                let length = this.curClock === 'h' ? 12 : 60;
                let points = new Array( length ).fill( 0 );
                let steps = this.curClock === 'h' ?
                    -30 * Math.PI / 180 : -6 * Math.PI / 180;

                return points.map( ( v, i ) => {
                    let p = {
                        y: Math.floor( center - radius * Math.sin( deg ) ),
                        x: Math.floor( center + radius * Math.cos( deg ) )
                    };
                    deg += steps;
                    return p;
                } )
            },
            select ( isDone ) {
                if ( isDone )
                    this.$emit( 'select', {
                        h: this.hTime,
                        m: this.mTime,
                        am: this.isAm
                    } )
                else {
                    this.$emit( 'cancel' );
                }
            },
            /** @param {TouchEvent} e */
            click ( e ) {
                if ( e.type === 'mousemove' && e.buttons < 1 )
                    return;
                let p = null;
                if ( e.type === 'touchmove' ) {
                    if ( e.touches.length > 0 ) {
                        let touch = e.touches[e.touches.length - 1];
                        let t = e.target;
                        let baseLeft = 0, baseTop = 0;
                        while ( t ) {
                            baseLeft += t.offsetLeft;
                            baseTop += t.offsetTop;
                            t = t.offsetParent;
                        }
                        p = { x: touch.pageX - baseLeft, y: touch.pageY - baseTop };
                    } else return;
                }
                else {
                    p = {
                        x: e.offsetX,
                        y: e.offsetY
                    }
                }

                let { clock, clockHor } = this.$refs;
                let ref = clock.clientWidth > 0 ? clock : clockHor;
                let center = ref.clientWidth / 2;
                if ( Math.hypot( p.x - center, p.y - center ) < ( center - 36 ) ) {
                    return;
                }
                let minRange = Number.MAX_VALUE, index = 0;
                this.getClockPoints().forEach( ( element, i ) => {
                    let r = Math.hypot(
                        p.x - element.x,
                        p.y - element.y
                    )
                    if ( r < minRange ) {
                        minRange = r;
                        index = i;
                    }
                } );
                if ( this.curClock === 'h' ) {
                    if ( e.type === 'click' )
                        this.curClock = 'm';
                    this.hTime = index;
                    this.rotate = index * 30;
                }
                else {
                    this.mTime = index;
                    this.rotate = index * 6;
                }
                this.$emit( 'change', {
                    h: this.hTime,
                    m: this.mTime,
                    am: this.isAm
                } )
            }
        }
    }
</script>

<style scoped>
    .selectTime-root {
      display: block;
    }
    .selectTime-Horizontal {
      display: flex;
    }

    .headerText-Horizontal {
      margin-bottom: 12px;
    }

    .selectTime {
      padding: 12px 26px;
      background: #004c00;
      box-sizing: content-box;
      color: white;
    }

    .select {
      color: #e77;
    }

    .header {
      padding: 16px 0 18px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      z-index: 999;
    }

    .header-Horizontal {
      flex-direction: column;
      justify-content: center;
      margin-right: 16px;
      margin-left: 10px;
    }

    .headerAm {
      display: flex;
      margin: 0 30px 0 12px;
      flex-direction: column;
    }
    .headerAm > div {
      line-height: 1.8em;
      font-size: 0.8em;
    }

    .headerText {
      font-size: 46px;
    }

    .headerText > div {
      display: inline-block;
    }

    .clockPlat {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .clock {
      width: 100%;
      height: 100%;
      margin-left: -100%;
      transform-origin: center;
      text-align: center;
    }

    .clock:first-child {
      margin: 0;
    }

    .clock:last-child {
      z-index: 999;
    }

    .clock span {
      display: inline-block;
      line-height: 36px;
      height: 36px;
      font-size: 16px;
      font-weight: 300;
    }

    .indicator {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      transition: all 0.5s ease;
    }

    .l-Circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(250, 95, 58, 0.925);
    }

    .s-Circle {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: white;
      margin-top: calc(50% - 2.5px);
      margin-left: calc(50% - 2.5px);
    }

    .line {
      width: 2px;
      height: calc(50% - 36px);
      background: rgb(211, 60, 15);
    }

    .bottomBtns {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 12px;
    }

    .bottomBtns > button {
      background: rgba(250, 95, 58, 0);
      border: 0;
      margin: 0 8px;
    }

    .bottomBtns > button:active {
      background: rgba(200, 200, 100, 0.5);
    }

    .bottomBtns > button:last-child {
      margin-right: 0;
    }

    @media all and (max-width: 600px) {
      .selectTime-root > div:last-child {
        display: none;
      }
      .clockPlat {
        width: 260px;
        height: 260px;
      }
    }
    @media all and (min-width: 640px) {
      .selectTime-root > div:first-child {
        display: none;
      }
      .clockPlat {
        width: 320px;
        height: 320px;
      }
    }
</style>