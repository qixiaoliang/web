<template>
    <div class="input-root">
        <h4>{{title}}</h4>
        <input v-model="value" type="text" minlength="1" autofocus="true">
        <div>
            <button @click="done">确定</button>
            <button @click="$emit('cancel')">取消</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '输入内容'
            }
        },
        data () {
            return {
                value: ''
            }
        },
        methods: {
            done () {
                if ( this.value.length > 0 )
                    this.$emit( 'done', this.value );
            }
        }
    }
</script>

<style scoped>
    h4 {
      color: white;
      letter-spacing: 4px;
      margin-top: 8mm;
    }

    .input-root {
      width: 420px;
      height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      background: #004c00;
    }

    @media (max-width: 640px) {
      .input-root {
        width: 340px;
        height: 180px;
      }
    }

    .input-root > * {
      margin-left: 10mm;
      margin-right: 10mm;
    }

    input {
      margin-top: -8%;
      width: 80%;
      height: 8mm;
      padding: 0 12px;
      background: #004000;
      border: 0;
      color: white;
      border-radius: 5px;
    }

    .input-root > div {
      align-self: flex-end;
      margin-bottom: 6mm;
    }

    input:focus {
      border-bottom: 3px solid white;
      border-right: 2px solid white;
    }

    button {
      margin-left: 16px;
      border: 0;
      background: transparent;
      font-size: 0.8em;
      color: white;
    }
    button:active{
        background: #fff3;
    }
</style>