<script lang="ts">
    import { get } from 'svelte/store';
    import {user} from '../store';

    import ExerciseHero from '../lib/ExerciseHero.svelte';
    import { getExercises, uploadFile } from '../lib/utils/supabse'
    import { onMount } from 'svelte';

    if (!get(user).isAdmin) {
        window.location.href = '/login';
    }

    let exos = []

    onMount(async () => {
        exos = await getExercises();
    })

    const onFileSelected = (e) => {
        let fr = new FileReader();   
        fr.onload = async () => {
            let uploadedFile = (await uploadFile(fr.result, e.target.files[0].name) ?? [])[0];
            if (uploadedFile !== null && uploadedFile !== undefined) {
                exos = [...exos, uploadedFile];
                //window.location.reload();
            }
        }
      fr.readAsText(e.target.files[0]);
    }

</script>

<div>
    <div id="exo-wrapper">
        <h1>
            Excercises
        </h1>
        <div class="exercises">
            {#each exos as exo}
                <ExerciseHero name={exo.name}/>
            {/each}
            <div class="wrapper">
                <div class="bg">
                    <label for="add-file">+</label>
                    <input 
                        style="display: none" 
                        id="add-file" 
                        name="add-file" 
                        type="file" 
                        accept=".v," 
                        on:change={onFileSelected}>
                </div>
            </div>
        </div> 
    </div>    
</div>

<style>

    #exo-wrapper {
        margin-left: 2em ;
        margin-top: 2em;
    }

    .exercises {
        display: flex;
        gap: 1em;
    }

    h1 {
        font-weight: bold;

    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wrapper:hover > .bg {
        background-color: gray;
        cursor: pointer;
    }

    .bg {
        width: 6rem;
        height: 6rem;

        border-radius: 10px;

        background-color: lightgray;

        transition-duration: 300ms;

        font-size: 3.5em;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    label {
        height: 100%;
        width: 100%;
        text-align: center;
    }
</style>