<template>
    <div class="timerSet-root">
        <div class="header">
            <span>{{timer[5]+''+timer[4]}}</span>
            <span>小时</span>
            <span>{{timer[3]+''+timer[2]}}</span>
            <span>分钟</span>
            <span>{{timer[1]+''+timer[0]}}</span>
            <span>秒</span>
            <Icon name="ic_backspace" class="delIcon" @click="delTimer"></Icon>
        </div>
        <NumberPanel @input="input" class="number">
        </NumberPanel>
        <div class="bottom">
            <Icon :name="'ic_clear'" class="cancel" v-if="canCancel" @click="$emit('cancel')">取消</Icon>
            <transition name="icon">
                <Icon v-if="timer.length > 6" :name="start ? 'ic_pause' : 'ic_play_arrow'" class="actionButton" @click="changeStart"></Icon>
            </transition>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon';
    import NumberPanel from './NumberPanel';

    export default {
        props: {
            canCancel: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                timer: new Array( 6 ).fill( 0 ),
                start: false
            }
        },
        components: {
            NumberPanel, Icon
        },
        methods: {
            input ( n ) {
                if ( n === 0 && this.timer.length === 6 || this.timer.length >= 12 ) return;
                this.timer.unshift( n );
            },
            changeStart () {
                this.start = !this.start;
                if ( this.start ) this.$emit( 'start', {
                    h: Number( this.timer[5] + '' + this.timer[4] ),
                    m: Number( this.timer[3] + '' + this.timer[2] ),
                    s: Number( this.timer[1] + '' + this.timer[0] )
                } )
            },
            delTimer () {
                if ( this.timer.length > 6 )
                    this.timer.shift();
            }
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
    .timerSet-root {
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      margin-bottom: 5mm;
    }

    .header {
      margin-bottom: 43vh;
      color: white;
      font-size: 40px;

      span:nth-child(2n) {
        font-size: 16px;
      }
      .delIcon {
        width: 24px;
        height: 24px;
        margin-left:6px;
        fill: rgb(166, 205, 223);
      }
    }

    .cancel {
      position: absolute;
      bottom: 6mm;
      left: 32vw;
      background: transparent;
      width: 36px;
      height: 36px;
      fill: #ccc;
      cursor: pointer;
    }
    .cancel:active {
      transition: all 1s ease;
      transform: scale(1.2);
      fill: white;
    }

    .actionButton {
      position: absolute !important;
      bottom: 5mm;
      left: calc(47vw - 20px);
    }

    @media all and (min-width: 600px) {
      .timerSet-root .number {
        height: 76vh;
        width: 58vh;
        margin-left:8vw;
      }
    }

    @media all and (max-width:600px){
        .timerSet-root{
            flex-direction: column;
            width:100%;
            max-height:100%;
            justify-content: center;
            box-sizing: border-box;
            padding-bottom: calc(3mm + 40px)
        }
        .timerSet-root .number{
            width:94vw;
            height:100vw;
        }
        .timerSet-root .header{
            margin-bottom: 3mm;
            margin-top:3mm;
        }
        .timerSet-root .cancel{
            left:12vw;
        }
    }
</style>