<template>
    <div class="system" v-if="name === 'admin'">
        <p class="text-xs-center">
            {{text}}
        </p>
        <hr>
    </div>
    <div class="wrap"  v-else>
        <div class="message" :class="{owner}">
            <small><b>{{name}}:</b></small>
            <p>{{text}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            text: String,
            owner: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .system {
        margin-bottom: 1rem;
    }

    .system p {
        margin-bottom: 1rem;
    }


    .wrap {
        display: flex;
        flex-direction: column;
    }
    .message {

        padding: 1rem;
        width: 60%;
        margin: 1rem;
        box-shadow: 0 1px 0 0 rgba(50,50,50, 0.3);
        border-radius: 5px;
        background: #1976d2;
        position: relative;
    }

    .message small {
        font-size: 20px;
    }

    .message p {
        font-size: 17px;
        margin-bottom: 0;
    }

    .owner {
        background: #fff;
        color: #000;
        align-self: flex-end;
    }

</style>