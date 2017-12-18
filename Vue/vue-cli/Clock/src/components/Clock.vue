<template>
    <div class="root">
        <div class="clock-root" v-if="direction==='v' || timezoneList.length<=0">
            <div class="time">
                <span>
                    {{time}}
                </span>
                <span>{{date}}</span>
            </div>
            <div class="item" v-for="item in timezoneList" :key="item.id">
                <div>
                    <span>
                        {{item.name}}
                    </span>
                    <span>
                        {{item.timeRange}}
                    </span>
                </div>
                <div>
                    <span>
                        {{item.time}}
                    </span>
                </div>
            </div>
            <div class="bottom">
                <Icon :name="'ic_toys'" class="actionButton" @click="$emit('timezone')"></Icon>
            </div>
        </div>

        <div class="clock-root-hor" v-else>
            <div class="left">
                <div class="time">
                    <span>
                        {{time}}
                    </span>
                    <span>{{date}}</span>
                </div>
                <Icon :name="'ic_toys'" class="actionButton icon" @click="$emit('timezone')"></Icon>
            </div>

            <div class="wrap">
                <div class="right">
                    <div v-for="item in timezoneList" :key="item.id">
                        <span>{{item.time}}</span>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon';

    export default {
        props: {
            timezoneList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        created () {
            this.Interval = setInterval( () => {
                let d = new Date();
                let m = d.getMinutes();
                this.time = d.getHours() + ':' + ( m < 10 ? '0' + m : m );
                this.date = this.getDate();
            }, 1000 )
            this.watchSize = () => {
                if ( window.innerWidth < 500 ) {
                    if ( this.direction === 'v' ) return;
                    this.direction = 'v';
                }
                else {
                    if ( this.direction === 'h' ) return;
                    this.direction = 'h';
                }
            }
            window.onresize = this.watchSize;
            window.addEventListener( 'orientationchange', this.watchSize );
            this.watchSize();
        },
        beforeDestroy () {
            clearInterval( this.Interval );
            window.onresize = null;
            window.removeEventListener( 'orientationchange', this.watchSize );
        },
        data () {
            let d = new Date();
            let m = d.getMinutes();
            return {
                time: d.getHours() + ':' + ( m < 10 ? '0' + m : m ),
                date: this.getDate(),
                direction: 'v'
            }
        },
        methods: {
            getDate () {
                const d = new Date();
                const year = d.getFullYear() + '年';
                const month = d.getMonth() + 1 + '月';
                const day = d.getDate() + '日';
                let week = '';
                switch ( d.getDay() ) {
                    case 0: week = '星期日'; break;
                    case 1: week = '星期一'; break;
                    case 2: week = '星期二'; break;
                    case 3: week = '星期三'; break;
                    case 4: week = '星期四'; break;
                    case 5: week = '星期五'; break;
                    case 6: week = '星期六'; break;
                }
                return year + month + day + week;
            }
        },
        components: {
            Icon
        }
    }
</script>

<style lang="scss" scoped>
    .root {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
    }

    .clock-root {
      width: calc(100% + 32px);
      height: calc(100% - 6mm);
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;

      .time {
        width: 100%;
        text-align: center;
        margin-bottom: 18mm;
        padding-right: 32px;

        span {
          display: block;
        }
        > span:first-child {
          font-size: calc(100vmin/5.5);
          color: white;
          margin-top: 8mm;
          margin-bottom: 5mm;
          letter-spacing: 8px;
        }
        > span:nth-child(2) {
          font-size: 1em;
          color: white;
          letter-spacing: 2px;
        }
      }

      .item {
        padding-right: 32px;
        opacity: 0.86;
        display: flex;
        justify-content: space-between;
        margin: 4mm 6mm 4mm 6mm;
        align-items: center;

        > div:first-child {
          span {
            color: white;
            display: block;
          }
          span:first-child {
            font-size: 1em;
            letter-spacing: 1px;
          }
          span:nth-child(2) {
            font-size: 0.8em;
            margin-top: 14px;
            color: #ddd;
          }
        }
        > div:nth-child(2) {
          font-size: 3em;
          transform: scaleY(1.1);
          color: white;
        }
      }

      .bottom {
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        margin-bottom: 5mm;
        left: calc(47vw - 20px);
      }
    }

    .clock-root-hor {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 5mm;
      width: 100%;
      height: 100%;

      .left {
        display: flex;
        flex-direction: column;
        height: 90%;

        .time {
          width: 100%;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          span {
            display: block;
          }
          > span:first-child {
            font-size: calc(100vmin/5);
            color: white;
            letter-spacing: 8px;
            font-weight: lighter;
          }
          > span:nth-child(2) {
            font-size: 1em;
            color: white;
            font-weight: lighter;
            letter-spacing: 2px;
          }
        }
        .icon {
          margin: 0px -5% 6mm 0;
          align-self: flex-end;
        }
      }

      .wrap {
        height: 100%;
        overflow-x: hidden;
        display: flex;
        align-items: center;

        .right {
          overflow-x: hidden;
          margin-right: -26px;
          padding-right: 26px;
          min-height: 50%;
          max-height: 85%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;

          > div {
            margin: 5mm 0;
            text-align: center;
            > span {
              display: block;
              font-size: 1em;
              opacity: 0.9;
              margin-top: 8px;
              letter-spacing: 2px;
            }
            > span:first-child {
              font-size: 3.6em;
              letter-spacing: 4px;
              opacity: 0.9;
              margin-top: 0;
            }
          }
        }
      }

      @media all and (max-height: 500px) {
        .clock-root-hor .left {
          height: 100%;
          margin-top: 5%;
          margin-left: 0;
        }
        .clock-root .bottom{
            margin-bottom: 2mm;
        }
        .left .icon {
          margin-top: 0;
        }

        .wrap > .right > div > span:first-child {
          font-size: 2.6em;
        }

        .wrap > .right {
          max-height: 90%;
          min-height: 70%;
        }
      }
    }
</style>
