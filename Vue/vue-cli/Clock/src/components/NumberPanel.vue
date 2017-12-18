<template>
    <div class="number-root">
        <div class="boxGroup">
            <div class="box" @click="$emit('input',1)">1</div>
            <div class="box" @click="$emit('input',2)">2</div>
            <div class="box" @click="$emit('input',3)">3</div>
        </div>
        <div class="boxGroup">
            <div class="box" @click="$emit('input',4)">4</div>
            <div class="box" @click="$emit('input',5)">5</div>
            <div class="box" @click="$emit('input',6)">6</div>
        </div>
        <div class="boxGroup">
            <div class="box" @click="$emit('input',7)">7</div>
            <div class="box" @click="$emit('input',8)">8</div>
            <div class="box" @click="$emit('input',9)">9</div>
        </div>
        <div class="boxGroup">
            <div class="box" @click="$emit('input',0)">0</div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
    .number-root {
      display: inline-flex;
      flex-direction: column;
      flex-wrap: wrap;
      box-sizing: border-box;
    }

    .boxGroup {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 25%;

      .box {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 2.2em;
        font-weight: 200;
        width:33%;
      }

      .box:not(:empty):active {
        height: 2.6em;
        width: 2.6em;
        background: rgba(255, 255, 255, 0.5);
        transition: background 1s cubic-bezier(0.1, 0.8, 0.9, 1.3);
      }
    }
</style>