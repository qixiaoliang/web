<template>
    <div class="clockPanel-root">
        <Clock @timezone="flyShow = true" :timezoneList="timezoneList">
        </Clock>
        <Fly ShowType="fullScreen" :show="flyShow">
            <div slot="target" style="display:none"></div>
            <transition name="appear" slot="fly">
                <TimeZoneList @back="flyShow = false" :selectedCitys="timezoneList" @change="list=>timezoneList=list"></TimeZoneList>
            </transition>
        </Fly>
    </div>
</template>

<script>
    import Clock from './Clock';
    import TimeZoneList from './TimeZoneList';
    import Fly from './Fly';

    export default {
        components: {
            Clock, TimeZoneList, Fly
        },
        data () {
            return {
                flyShow: false,
                timezoneList: this.getStorage()
            }
        },
        watch: {
            timezoneList ( newVal ) {
                this.setStorage( newVal );
            }
        },
        methods: {
            getStorage () {
                const data = window.localStorage.getItem( 'clock' );
                if ( data ) {
                    return JSON.parse( data );
                }
                else {
                    return [];
                }
            },
            setStorage ( item ) {
                window.localStorage.setItem( 'clock', JSON.stringify( item ) );
            },
        }
    }
</script>

<style scoped>
    .clockPanel-root {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    }

    .group-move {
      transition: all 0.6s ease;
    }
</style>
