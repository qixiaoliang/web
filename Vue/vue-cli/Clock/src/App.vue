<template>
    <div id="app">
        <PageSwitcher>
        </PageSwitcher>
        <Fly ShowType="fullScreen" v-model="flyShow">
            <div slot="target"></div>
            <div class="alarmRing" slot="fly">
                <span>你的定时“{{label}}”时间已到</span>
        <audio class="aud" loop ref="audio" style="display:none"></audio>
            </div>
        </Fly>
    </div>
</template>

<script>
    import PageSwitcher from './components/PageSwitcher';
    import Fly from './components/Fly'
    let reqs = require.context( './assets/alarm', false, /\.ogg$/ );
    let rings = {};
    reqs.keys().forEach( r => {
        let src = reqs( r );
        let name = src.match( /([^\/^\.]*)\.[^\/]*$/ )[1];
        rings[name] = src;
    } );

    export default {
        name: 'app',
        beforeMount () {
            window.alarmBell.$on( 'alarm', ( label, ring ) => {
                this.flyShow = true;
                this.label = label;
                this.ring = ring ? rings[ring] : rings['Spaceship'];
            } )
        },
        updated () {
            if ( this.flyShow ) {
                this.$refs.audio.src = this.ring;
                this.$refs.audio.play();
            }
        },
        watch: {
            flyShow ( newVal ) {
                /* if ( !newVal )
                    this.$refs.audio.pause() */
            }
        },
        data () {
            return {
                flyShow: false,
                label: ''
            }
        },
        components: {
            PageSwitcher, Fly
        },
        methods: {

        }
    }
</script>

<style>
    :root {
      background: #130;
    }
    #app {
      font-family: "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      /* ============  disable select text  =============== */
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      width: 94vw;
      height: 94vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      margin: 0;
      color: white;
    }

    #app .alarmRing {
      height: 180px;
      width: 80vw;
      padding: 4mm 4mm 4mm 5mm;
      max-width: 500px;
      background: #008000;
      font-size: 2.2em;
      line-height: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      text-align-last: center;
    }

    @media all and (min-width: 800px) {
      #app {
        width: 80vw;
        margin-left: 10vw;
      }
    }
</style>