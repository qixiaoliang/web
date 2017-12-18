<template>
    <div v-show="length > 0" :class="{vertical:direction==='v'}" class="indicator-root">
        <div v-for="(item,index) in lengthList" @click="change(index)" :key="'indicator_'+index" :class="{selected:curItem===index}">
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            length: {
                type: Number,
                required: true
            },
            curItem: {
                type: Number,
                default: 0
            },
            direction: {
                type: String,
                default:'v',
                indicator ( val ) {
                    return val === 'h' || val === 'v';
                }
            }
        },
        computed: {
            lengthList () {
                return new Array( this.length ).fill( 0 );
            }
        },
        methods:{
            change(index){
                this.curItem = index;
                this.$emit('change',index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .indicator-root {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      > div {
          margin:6px;
          padding:8px;
          cursor: pointer;
              opacity: .6;
              transition: all 1s ease;

          >div{
              width:6px;
              height: 6px;
              border-radius: 50%;
              background:white;
          }
      }

      >div.selected{
              opacity:1.0;
              transform: scale(1.4);
          }
    }

    .vertical{
        flex-direction: column;
    }
</style>