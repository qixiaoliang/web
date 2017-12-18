<template>
    <div class="ring-root">
        <div class="header">
            <Icon name="ic_arrow_back" class="icon" @click="$emit('back')"></Icon>
            <h4>响铃提示音</h4>
        </div>
        <div class="itemWrap">
            <div class="item" :class="{active: index === curItem}" @click="play(index)" v-for="(item,index) in rings" :key="'ringItem-' + index">
                <div>
                    <Icon class="icon" :name="'ic_notifications'"></Icon>
                    <span>{{ item.name }}</span>
                </div>
                <Icon class="icon" name="ic_check" v-if="index === curItem"></Icon>
            </div>
        </div>
        <audio ref="audio" style="display:none"></audio>
    </div>
</template>

<script>
    import Icon from './Icon';
    let reqs = require.context( '../assets/alarm', false, /\.ogg$/ );
    const rings = reqs.keys().map( r => {
        let src = reqs( r );
        let name = src.match( /([^\/^\.]*)\.[^\/]*$/ )[1];
        return { src, name }
    } );

    export default {
        props: {
            ring: {
                type: String,
                default: 'Rise'
            }
        },
        data () {
            let i = rings.findIndex( r => r.name === this.ring );
            return { rings, curItem: i < 0 ? 0 : i }
        },
        components: {
            Icon
        },
        methods: {
            play ( index ) {
                this.$refs.audio.pause();
                this.$refs.audio.src = this.rings[index].src;
                this.curItem = index;
                this.$refs.audio.play();
                this.$emit( 'select', this.rings[index].name );
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ring-root {
      width: 100%;
      height: 100%;
      display: flex;
      overflow-x: hidden;
      flex-direction: column;

      .header {
        display: flex;
        align-items: center;
        padding: 2mm 2mm;

        .icon {
          width: 28px;
          height: 28px;
          fill: white;
          margin-right: 6mm;
          cursor: pointer;
        }
        .icon:active {
          opacity: 0.6;
        }
      }

      .itemWrap {
        overflow-y: auto;
        padding-left: 3mm;
        padding-right: 28px;
        flex: 1;
        width: calc(100% + 28px);
        box-sizing: border-box;

        .item {
          display: flex;
          padding: 3.2mm 3mm 3.2mm 3mm;
          justify-content: space-between;
          align-items: center;
          opacity: 0.7;
          cursor: pointer;

          > div {
            display: flex;
            align-items: center;
            > span {
              font-size: 1em;
              margin-left: 5mm;
              color: white;
            }
            > .icon {
              width: 26px;
              height: 26px;
              fill: white;
            }
          }
          > .icon {
            width: 26px;
            height: 26px;
            fill: #7cb5e7;
            margin-right: 3%;
          }
        }

        .item[class*="active"] {
          opacity: 1;
          transition: all 0.6s ease;
          background: #444;
          border-radius: 3px;

          > div > .icon {
            animation: shake .5s ease infinite backwards;
            transform-origin: 0.5 0;
          }
        }
      }

      @keyframes shake {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(20deg);
        }
        75% {
          transform: rotate(-20deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    }
</style>
