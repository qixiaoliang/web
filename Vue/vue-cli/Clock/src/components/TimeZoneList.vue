<template>
    <div class="timezone-root">
        <div class="header">
            <Icon class="icon" :name="'ic_arrow_back'" @click="$emit('back')"></Icon>
            <transition name="input">
                <input v-model="searchText" type="text" v-if="search" placeholder="搜索" autofocus="true">
            </transition>
            <Icon @click="cancelSearch" :name="'ic_clear'" v-if="search" :class="['clearIcon',{invalid:searchText.length<=0}]"></Icon>
            <div v-if="!search">
                <Icon class="icon" :name="'ic_search'" @click="search = true"></Icon>
                <!-- <Icon class="icon" :name="'ic_more_vert'" @click="search=true"></Icon> -->
            </div>
        </div>
        <div class="list">
            <div class="item" v-if="item.show" v-for="item in List" :key="item.id">
                <div class="group">
                    <span>{{item.group[0]}}</span>
                    <span>{{item.group[1]}}</span>
                </div>
                <CheckBox class="name" @change="val=>check(val,item)" :checked="item.selected">
                    <span>{{item.name}}</span>
                </CheckBox>
                <span class="time">{{item.time}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import timeZoneJSON from '../../src/assets/timeZone.json';
    import moment from 'moment-timezone';
    import CheckBox from './CheckBox';
    import Icon from './Icon';

    export default {
        props: {
            selectedCitys: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        watch: {
            searchText ( newVal ) {
                if ( !newVal )
                    return this.List.map( v => v.show = true );
                this.List.forEach( v => {
                    if ( !v.name.includes( newVal ) ) {
                        v.show = false;
                    }
                } )
                this.List = this.List.slice( 0 );
            }
        },
        data () {
            return {
                List: this.getTimeZoneList( this.selectedCitys ),
                search: false,
                searchText: ''
            }
        },
        methods: {
            check ( val, item ) {
                item.selected = val;
                this.$emit( 'change',
                    this.List.filter(
                        v => v.selected
                    ) )
            },
            cancelSearch () {
                if ( this.searchText.length > 0 ) {
                    this.searchText = '';
                }
                else {
                    this.search = false;
                }
            },
            getTimeZoneList ( selectedCitys ) {
                let list = [];
                selectedCitys.forEach( ( v, i ) => {
                    if ( i === 0 )
                        v.group = ['已选择', '']
                    else {
                        v.group = ['', '']
                    }
                } )

                for ( let k in timeZoneJSON ) {
                    if ( selectedCitys.some( v => {
                        return k === v.id;
                    } ) ) {
                        continue;
                    }
                    let m = moment( new Date() ).tz( k );

                    let d = new Date();
                    let timeRange = Math.round( m.format( 'H' ) - d.getHours() + ( m.format( 'mm' ) - d.getMinutes() ) / 60 );
                    timeRange = timeRange > 0 ? '晚' + timeRange : '早' + -timeRange;
                    timeRange += '小时';
                    m.format( 'D' ) > d.getDate() ? timeRange = '明天 ' + timeRange : timeRange = '昨天 ' + timeRange;

                    list.push( {
                        name: timeZoneJSON[k],
                        id: k,
                        time: m.format( 'HH:mm' ),
                        sortTime: m.millisecond(),
                        zone: m.format( 'Z' ),
                        timeRange,
                        show: true,
                        selected: false
                    } )
                };

                list = list.sort( ( a, b ) => {
                    return a.zone > b.zone;
                } )

                let preGroup = null;
                list = list.map( v => {
                    v.sortTime = undefined;
                    if ( v.zone !== preGroup ) {
                        v.group = ['GMT', v.zone];
                        preGroup = v.zone;
                        v.zone = undefined;
                    }
                    else {
                        v.group = ['', '']
                    }
                    return v;
                } )

                return selectedCitys.concat( list );
            }
        },
        components: {
            CheckBox, Icon
        }
    }
</script>

<style lang="scss" scoped>
    .timezone-root {
      width: 94%;
      height: 98%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-top: 6mm;
    }

    .timezone-root > .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4mm;
      margin-right: 5mm;

      input {
        height: 32px;
        margin-left: 1.5em;
        flex: 1;
        background: transparent;
        padding: 0 1em;
        color: white;
        border: 0;
        font-size: 1em;
      }
      .clearIcon {
        width: 26px;
        height: 26px;
        fill: white;
        margin-left: -32px;
        display: inline-block;
        background: transparent;
      }
      .invalid {
        opacity: 0.7;
        cursor: unset;
      }

      .icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        fill: white;
        background: transparent;
      }
      .icon:hover,
      .clearIcon:hover {
        fill: #fff9;
        transition: all 1s ease;
        cursor: pointer;
      }
    }

    .timezone-root > .list {
      flex: 1;
      width: calc(100% + 5mm);
      overflow: auto;

      .item {
        margin-top: 5mm;
        margin-bottom: 5mm;
        margin-right: 11mm;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .group {
          width: 3.8em;
          margin-right: 5mm;
          display: inline-block;
          > span {
            text-align: center;
            display: block;
          }
          > span:first-child {
            font-size: 1.2em;
          }
          > span:nth-child(2) {
            font-size: 0.8em;
            margin: 6px 0;
            letter-spacing: 1px;
          }
        }
        .name {
          flex: 1;
          font-size: 14px;
          font-weight: lighter;
          letter-spacing: 2px;
        }
        .time {
          font-size: 12px;
        }
      }
    }

    .input-enter,
    .input-leave {
      width: 20px;
      position: absolute;
    }
    .input-enter-active,
    .input-leave-active {
      transition: width .6s ease;
    }
</style>

