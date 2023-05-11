<script>
  import { onMount } from "svelte";
  import showdown from 'showdown'; 
  
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
        
        let converter = new showdown.Converter();
        let html = converter.makeHtml(block.text);

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
        <h1>Please upload an exercise file... 🖊</h1>
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
