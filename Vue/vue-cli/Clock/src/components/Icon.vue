<template>
    <svg style="display:inline-block" v-on="$listeners">
        <use :xlink:href="iconPath+'#'+name" width="100%" height="100%"></use>
    </svg>
</template>

<script>
import IconPath from '../assets/img.svg';

export default {
    props:{
        name:{
            type:String,
            required:true
        }
    },
    data(){
        return {
            iconPath:IconPath
        }
    }
}
</script>



