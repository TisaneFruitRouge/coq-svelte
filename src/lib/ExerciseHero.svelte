<script>
    export let name = '';
    export let onClick = null;
</script>

<div class="wrapper" on:click={onClick} on:keyup={onClick}>
    <div class="bg">
    </div>
    <p>{name}</p>
</div>

<style>

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wrapper:hover > .bg {
        background-color: black;
        cursor: pointer;
    }

    .bg {
        width: 6em;
        height: 6em;

        border-radius: 10px;

        background-color: gray;
        opacity: 0.3;

        transition-duration: 300ms;
    }

    p {
        text-decoration: underline;
    }
</style>