<script lang="ts">
    import {user} from '../store';
    import {get} from 'svelte/store';

    if (!get(user).isAdmin && !get(user).isStudent) {
        window.location.href = '/login';
    }

    import { currentExercise } from '../store';

    import { getExercises, getExo } from '../lib/utils/supabse'
    import { onMount } from 'svelte';
    import ExerciseHero from '../lib/ExerciseHero.svelte';

    let exos = []

    onMount(async () => {
        exos = await getExercises();
    })

    const openExo = async (name: string) => {
        let blob = await getExo(`${name}`);
        
        let fr = new FileReader();
        fr.onload = () => {
            $currentExercise.text = fr.result as string;
            window.location.href = '/exercise';
        }
        fr.readAsText(blob);
    }   
</script>


<div>
    <div id="exo-wrapper">
        <h1>
            Excercises
        </h1>
        <div class="exercises">
            {#each exos as exo}
                <ExerciseHero name={exo.name} onClick={() => openExo(exo.name)}/>
            {/each}
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
</style>