<script lang="ts">
  import { currentExercise } from '../store';

  let fileinput;
  
  const onFileSelected = (e) => {
    
    let fr = new FileReader();
    
    fr.onload = () => {
      $currentExercise.text = fr.result as string;
    }
              
    fr.readAsText(e.target.files[0]);
  }

</script>

<nav class="">   
  <a href="/">Home</a>
  <div>
    <label for="add-file">Upload an exercise</label>
    <input id="add-file" name="add-file" style="display:none" type="file" accept=".v," on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
  </div>
</nav>


<style>
  nav {
    width: 100vw;

    height: 64px;

    background-color: #eeeeee;

    gap: 2rem;
    padding: 0 1rem;

    display: flex;
    align-items: center;
  }

  nav > a:hover {
    text-decoration: underline;
  }

  nav > div {
    height: 100%;
    transition-duration: 300ms;

    display: flex;
    align-items: center;

    padding: 0 0.5rem;
  }

  nav > div:hover {
    cursor: pointer;
    background-color: #cccccc;
  }

  nav > div > *:hover {
    cursor: pointer;
  }
</style>