<template>
    <div class="alarmPanel-root">
        <transition-group name="group">
            <div class="item" v-for="(item,index) in alarmList" :key="item.id" :style="{background: (curItem === index && expand)?'#005000':'transparent'}">
                <div class="header">
                    <Fly ShowType="fullScreen" v-model="item.clockShow">
                        <span slot="target" class="time" :style="{color: item.enable ? 'white' : '#cccc'}">
                            {{item.time.h + ':' + (item.time.m
                            < 10 ? '0' + item.time.m : item.time.m) }} </span>
                                <select-time slot="fly" @select="time => setTime(time,item)" @cancel="item.clockShow = false"></select-time>
                    </Fly>
                    <Btn v-model="item.enable"></Btn>
                </div>

                <div class="expand" v-if="curItem === index && expand">
                    <div class="repeat">
                        <div>
                            <CheckBox v-model="item.canRepeat">
                                <span style="margin-left:2mm;font-size:.8em">重复</span>
                            </CheckBox>
                        </div>
                        <div v-if="item.canRepeat">
                            <CircleCheckBox v-model="item.repeat[0]">日</CircleCheckBox>
                            <CircleCheckBox v-model="item.repeat[1]">一</CircleCheckBox>
                            <CircleCheckBox v-model="item.repeat[2]">二</CircleCheckBox>
                            <CircleCheckBox v-model="item.repeat[3]">三</CircleCheckBox>
                            <CircleCheckBox v-model="item.repeat[4]">四</CircleCheckBox>
                            <CircleCheckBox v-model="item.repeat[5]">五</CircleCheckBox>
                            <CircleCheckBox v-model="item.repeat[6]">六</CircleCheckBox>
                        </div>
                    </div>
                    <Fly ShowType="fullScreen" v-model="item.ringShow">
                        <div slot="target" class="ring iconText-wrap">
                            <Icon name="ic_notifications_none" class="icon"></Icon>
                            <span class="iconText">{{item.ring}}</span>
                        </div>
                        <transition name="slideIn" slot="fly">
                            <ring-select :ring="item.ring" @select="ring => setRing(ring,item)" @back="item.ringShow = false"></ring-select>
                        </transition>
                    </Fly>
                    <Fly ShowType="fullScreen" v-model="item.inputShow">
                        <div slot="target" class="lable iconText-wrap">
                            <Icon name="ic_bookmark" class="icon"></Icon>
                            <span class="iconText">{{item.label}}</span>
                        </div>
                        <input-dialog slot="fly" title="输入标签名" @done="label => setLabel(label,item)" @cancel="item.inputShow = false"></input-dialog>
                    </Fly>
                    <div class="cancel iconText-wrap" v-if="canCancel(item)" @click="item.enable = false">
                        <Icon name="ic_alarm_off" class="icon"></Icon>
                        <span class="iconText">取消</span>
                    </div>
                    <div class="btm">
                        <div class="iconText-wrap" @click="remove(index)">
                            <Icon name="ic_delete" class="icon"></Icon>
                            <span class="iconText">删除</span>
                        </div>
                        <Icon name="ic_expand_less" @click="expandLess(index)" class="icon icon-right"></Icon>
                    </div>
                </div>

                <div class="bottom" v-else @click="expandMore(index)">
                    <div>
                        <span>{{getDays( item )}}</span>
                        <div class="iconText-wrap" v-if="canCancel(item)" @click.stop="item.enable = false">
                            <Icon name="ic_alarm_off" class="icon"></Icon>
                            <span class="iconText">取消</span>
                        </div>
                    </div>
                    <Icon :name="'ic_expand_more'" class="icon icon-right" @click="expandMore(index)"></Icon>
                </div>
            </div>
        </transition-group>

        <Fly ShowType="fullScreen" v-model="addFlyShow">
            <Icon slot="target" :name="'ic_add'" class="actionButton btnIcon"></Icon>
            <select-time slot="fly" @cancel="addFlyShow = false" @select="time => addClock(time)"></select-time>
        </Fly>
    </div>
</template>

<script>
    import Icon from './Icon';
    import CircleCheckBox from './CircleCheckBox';
    import Btn from './Btn';
    import CheckBox from './CheckBox';
    import Fly from './Fly';
    import InputDialog from './InputDialog';
    import SelectTime from './SelectTime';
    import RingSelect from './RingSelect';

    export default {
        beforeMount () {
            let interval = setInterval( () => {
                if ( new Date().getSeconds() === 0 ) {
                    clearInterval( interval );
                    this.interval = setInterval( () => {
                        this.alarmList = this.alarmList.map( ( item, index ) => {
                            item.days = this.getDays( item );
                            item.canCancel = this.canCancel( item );
                            let { h, m } = item.time;
                            let d = new Date();
                            if ( d.getHours() === h && d.getMinutes() === m ) {
                                if ( item.canRepeat ) {
                                    if ( item.repeat[d.getDay()] ) {
                                        window.alarmBell.$emit(
                                            'alarm', item.label,item.ring
                                        )
                                    }
                                } else {
                                    window.alarmBell.$emit(
                                        'alarm', item.label,item.ring
                                    )
                                }
                            }
                            return item;
                        } )
                    }, 1000 * 60 )
                }
            }, 1000 )
        },
        beforeDestroy () {
            clearInterval( this.interval );
        },
        beforeUpdate () {
            this.setStorage( this.alarmList );
            if ( this.alarmList ) {
                this.alarmList.forEach( item => {
                    if ( item.canRepeat ) {
                        if ( item.repeat.every( val => !val ) ) {
                            item.canRepeat = false;
                            let arr = new Array( 7 );
                            arr.fill( true );
                            item.repeat = arr;
                        }
                    }
                } )
            }
        },
        data () {
            return {
                addFlyShow: false,
                curItem: 0,
                expand: false,
                alarmList: this.getStorage().map( item => {
                    this.$set( item, 'id', item.h + ':' + item.m );
                    this.$set( item, "clockShow", false );
                    this.$set( item, 'inputShow', false );
                    this.$set( item, 'ringShow', false );
                    return item;
                } )
            }
        },
        components: {
            Icon,
            CircleCheckBox,
            Btn,
            CheckBox,
            Fly,
            InputDialog,
            SelectTime,
            RingSelect
        },
        computed: {},
        methods: {
            getStorage () {
                const data = window.localStorage.getItem( 'alarm' );
                if ( data ) {
                    return JSON.parse( data );
                }
                else {
                    return [{
                        ring: 'Flow',
                        enable: false,
                        time: { h: 8, m: 0 },
                        label: 'work',
                        repeat: [false, true, true, true, true, true, false],
                        canRepeat: true
                    }];
                }
            },
            setStorage ( item ) {
                window.localStorage.setItem( 'alarm', JSON.stringify( item ) );
            },
            expandMore ( index ) {
                this.curItem = index;
                this.expand = true;
            },
            expandLess ( index ) {
                this.expand = false;
            },
            getDays ( item ) {
                if ( item.canRepeat ) {
                    let repeats = item.repeat;
                    let days = [];
                    repeats.forEach( ( val, index ) => {
                        if ( val ) {
                            let d = '';
                            switch ( index ) {
                                case 0:
                                    d = '周日';
                                    break;
                                case 1:
                                    d = '周一';
                                    break;
                                case 2:
                                    d = '周二';
                                    break;
                                case 3:
                                    d = '周三';
                                    break;
                                case 4:
                                    d = '周四';
                                    break;
                                case 5:
                                    d = '周五';
                                    break;
                                case 6:
                                    d = '周六';
                                    break;
                            }
                            days.push( d );
                        }
                    } )
                    return days.length ? days.join( ' ' ) : '';
                } else {
                    let { h, m } = item.time;
                    let d = new Date();
                    d.setHours( h );
                    d.setMinutes( m );
                    return d > ( new Date() ) ? '今天' : '明天'
                }
            },
            canCancel ( item ) {
                let { h, m } = item.time;
                let d = new Date();
                d.setHours( h );
                d.setMinutes( m );
                return item.enable && ( d > ( new Date() ) ) && ( item.repeat[( new Date().getDay() )] || !item.canRepeat );
            },
            setTime ( time, item ) {
                let { h, m, am } = time;
                h = am ? h : 12 + h;
                item.clockShow = false;
                item.time = { h, m };
            },
            setLabel ( label, item ) {
                item.label = label;
                item.inputShow = false;
            },
            setRing ( ring, item ) {
                item.ring = ring;
            },
            addClock ( time ) {
                this.addFlyShow = false;
                let { h, m, am } = time;
                h = am ? h : 12 + h;
                this.alarmList.unshift( {
                    ring: 'Flow',
                    ringShow: false,
                    enable: true,
                    time: { h, m },
                    label: 'label',
                    repeat: [false, true, true, true, true, true, false],
                    canRepeat: false,
                    clockShow: false,
                    inputShow: false,
                    id: h + ':' + m
                } )
            },
            remove ( index ) {
                this.alarmList.splice( index, 1 );
            }
        }
    }
</script>

<style lang = "scss" scoped>
    .alarmPanel-root {
      width: 100%;
      box-sizing: border-box;
      padding-right: 32px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      .icon {
        width: 26px;
        height: 26px;
        margin-right: 5mm;
        fill: white;
        cursor: pointer;
      }
      .icon-right {
        margin-right: 0;
      }
      .iconText-wrap {
        display: flex;
        align-items: center;
        padding: 1mm 0;
        margin: 1mm 0;
        cursor: pointer;
        .iconText {
          letter-spacing: 2px;
          font-size: 0.8em;
        }
      }
      .icon:active,
      .iconText-wrap:active {
        transition: opacity 0.8s ease;
        opacity: 0.5;
      }
      .item {
        width: 100%;
        padding: 3mm 5mm;
        transition: all 1s ease;
        margin-bottom: 5mm;
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span.time {
            font-size: 2.6em;
            color: white;
          }
        }
        .expand {
          display: flex;
          flex-direction: column;
          padding: 4mm 0 0 2mm;
          .repeat {
            > div:nth-child(2) {
              margin-top: 2mm;
              margin-bottom: 4mm;
              margin-left: calc(26px + 3mm);
              > * {
                margin: 2mm;
              }
            }
          }
          .btm {
            margin-top: 4mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        .bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 4mm 0 0 2mm;
          > div {
            > span:first-child {
              display: block;
              font-size: 0.8em;
            }
          }
        }
      }
      .btnIcon {
        position: absolute;
        bottom:0;
        margin-bottom:5mm;
        left: calc(47vw - 20px);
      }
    }

    @media all and (max-height:500px){
        .alarmPanel-root .btnIcon{
            margin-bottom: 2mm;
        }
    }

    .slideIn-enter,
    .slideIn-leave-to {
      transform: translateX(90%);
    }

    .slideIn-enter-active,
    .slideIn-leave-active {
      transition: all 0.6s ease;
    }
</style>
