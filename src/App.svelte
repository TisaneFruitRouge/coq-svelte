<script>
  import TheNavbar from "./lib/TheNavbar.svelte";

  import { currentExercise } from './store';
  import { parseExercise } from './lib/utils/execises';

  currentExercise.subscribe(newStore => {
    
    parseExercise(newStore);

  });

</script>

<TheNavbar />
<div class="jscoq-main">
  <div id="ide-wrapper" class="toggled">
    <div id="code-wrapper">
      <div id="document">
        <h1>Exercice</h1>
        <textarea class="coq-code">  
        </textarea>
      </div>
    </div>
  </div>

  <!-- jsCoq configuration part -->
  <script type="module">

    import { JsCoq } from './node_modules/jscoq/jscoq';

    var jscoq_ids  = ['.coq-code'];
    var jscoq_opts = {
        prelude:       true,
        implicit_libs: true,
        editor:        { mode: { 'company-coq': true } },
        init_pkgs:     ['init'],
        all_pkgs:      ['coq']
    };

    JsCoq.start(jscoq_ids, jscoq_opts);
  </script>
</div>
