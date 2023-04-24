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
    <label for="add-file">Choose Image</label>
    <input id="add-file" name="add-file" style="display:none" type="file" accept=".v," on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
  </div>
</nav>


<style>
  nav {
    width: 100vw;

    height: 32px;

    background-color: red;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
</style>