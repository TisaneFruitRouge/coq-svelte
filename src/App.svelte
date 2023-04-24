<script>
  import { onMount } from "svelte";

  import TheNavbar from "./lib/TheNavbar.svelte";

  import { currentExercise } from './store';
  import { parseExercise } from './lib/utils/execises';
  
  import JsCoq, {jscoq_ids, jscoq_opts} from './lib/utils/jscoq';

  let coq_worker = null;

  onMount(() => {
    JsCoq.start(jscoq_ids, jscoq_opts);
  })

  currentExercise.subscribe(async (newStore) => {
    parseExercise(newStore);

    let coq_doc = document.getElementById('document');
    
    if (coq_doc === null) {
      return; 
    }

    coq_doc.replaceChildren();

    for (let block of newStore.blocks) {
      if (block.type === 'comment') {
        let newNode = document.createElement('div');
        
        newNode.classList.add('comment');
        newNode.innerText = block.text;

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
    coq_worker = await JsCoq.start(jscoq_ids, jscoq_opts);

    await coq_worker.launch();

    if (newStore.showGoal) {
      document.getElementById("panel-wrapper").style.display = "inline";
    } else {
      document.getElementById("panel-wrapper").style.display = "none";
    }
  });

</script>

<TheNavbar />
<div class="jscoq-main">
  <div id="ide-wrapper" >
    <div id="code-wrapper">
      <div id="document">
        <h1>Please upload and exercise file... 🖊</h1>
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
</style> 
