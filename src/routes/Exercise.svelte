<script lang="ts">
    import { onMount } from "svelte";
    import showdown from 'showdown'; 
  
    import { currentExercise } from '../store';
    import { parseExercise } from '../lib/utils/execises';
    
    import JsCoq, {jscoq_ids, jscoq_opts} from '../lib/utils/jscoq';
  
    let coq_worker = null;
    
    import { get } from 'svelte/store';
    import {user} from '../store';
  import type { ICurrentExercise } from "../lib/utils/interfaces";

    if (!get(user).isAdmin && !get(user).isStudent) {
        window.location.href = '/login';
    }


    let fileinput;

    const onFileSelected = (e) => {
      
      let fr = new FileReader();
      
      fr.onload = () => {
        $currentExercise.text = fr.result as string;
      }
                
      fr.readAsText(e.target.files[0]);
    }

    onMount(() => {
      JsCoq.start(jscoq_ids, jscoq_opts);
      if ($currentExercise.text !== '') {
        loadExercise($currentExercise);
      }
    })
    
    const loadExercise = async (store: ICurrentExercise) => {
      parseExercise(store);
  
      let coq_doc = document.getElementById('document');
      
      if (coq_doc === null) {
        return; 
      }
  
      coq_doc.replaceChildren();
  
      for (let block of store.blocks) {
        if (block.type === 'comment') {
          let newNode = document.createElement('div');
          
          let converter = new showdown.Converter();
          converter.setFlavor('github');
          
          let html = ""
          let textWithouthTabs = block.text.split('\n').map(line => line.trim()).join('\n');
  
          html = converter.makeHtml(textWithouthTabs);
  
          newNode.classList.add('comment');
          newNode.innerHTML = html;
  
          coq_doc.appendChild(newNode);
        } else if (block.type === "coq") {
          let newNode = document.createElement('textarea');
  
          newNode.classList.add('coq-code');
          for (const line of block.text.split("\n")) {
            newNode.innerHTML += `${line}\n`;
          }
          coq_doc.appendChild(newNode);
        }
      }
  
      document.getElementById('panel-wrapper').remove(); 
      // js coq creates a panel-wrapper every time it starts, so we need to remove the last one
      coq_worker = await JsCoq.start(jscoq_ids, jscoq_opts);
  
      await coq_worker.launch();
  
      if (store.showGoal) {
        document.getElementById("panel-wrapper").style.display = "inline";
      } else {
        document.getElementById("panel-wrapper").style.display = "none";
      }
    }

    currentExercise.subscribe(async (newStore) => {
      await loadExercise(newStore);
    });
  
  </script>
  
  <div class="jscoq-main">
    <div id="ide-wrapper" >
      <div id="code-wrapper">
        <div id="document">
          <h1>
            <div>
              <label for="add-file">Please upload an exercise file... 🖊</label>
              <input style="display: none" id="add-file" name="add-file" type="file" accept=".v," on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            </div></h1>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    h1 {
      font-size: 28px;
      text-align: center;
  
      margin-top: 4rem;
    }
    
    h2, h3, h4, h5, h6, li, ul, ol {
      all: initial;
    }
  </style> 
  