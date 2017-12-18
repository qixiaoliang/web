<template>
    <div class="timerPanel-root">
        <transition-group name="appear" tag="div">
            <timer-set @start="start" @cancel="view='list'" key="timer-set" :canCancel="canCancel && timerList.length" v-if="view === 'set'"></timer-set>
            <timer-list @remove="remove" key="timer-list" @add="add" v-if="view === 'list'" :list="timerList"></timer-list>
        </transition-group>
    </div>
</template>

<script>
    import TimerSet from "./TimerSet";
    import TimerList from './TimerList';

    export default {
        components: {
            TimerSet, TimerList
        },
        data () {
            return {
                view: 'set',
                timerList: this.getStorage(),
                canCancel: false
            }
        },
        watch: {
            timerList ( newVal ) {
                this.setStorage( newVal );
            }
        },
        methods: {
            getStorage () {
                const data = window.localStorage.getItem( 'timer' );
                if ( data ) {
                    return JSON.parse( data );
                }
                else {
                    return [];
                }
            },
            setStorage ( item ) {
                window.localStorage.setItem( 'timer', JSON.stringify( item ) );
            },
            start ( timer ) {
                this.timerList.unshift( timer );
                this.view = 'list';
            },
            remove ( list ) {
                if ( list.length <= 0 ) {
                    this.view = 'set';
                    this.timerList = [];
                    return;
                }
                this.timerList = list.slice( 0 );
                this.canCancel = false;
            },
            add () {
                this.view = 'set';
                this.canCancel = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .timerPanel-root,
    .timerPanel-root > div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .appear-enter {
      opacity: 0.5;
      transform: scale(0.4);
    }
    .appear-enter-active {
      transition: all 1s ease;
    }
</style>

