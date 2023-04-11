<div class="jscoq-main">
  <div id="ide-wrapper" class="toggled">
    <div id="code-wrapper">
      <div id="document">
        <h1>Welcome to your own jsCoq development</h1>
        <p>
            Want to create a document like this one?
            Copy <tt>node_modules/jscoq/examples/npm-template.html</tt>
            and start editing.
        </p>
        <textarea class="coq-code">
          From Coq Require Import List.
          Import ListNotations.
          
          Lemma rev_snoc_cons A :
            forall (x : A) (l : list A), rev (l ++ [x]) = x :: rev l.
            
          Proof.
            induction l.
            - reflexivity.
            - simpl. rewrite IHl. simpl. reflexivity.
          Qed.
          
          
          Theorem rev_rev A : forall (l : list A), rev (rev l) = l.
          Proof.
            induction l.
            - reflexivity.
            - simpl. rewrite rev_snoc_cons. rewrite IHl.
              reflexivity.
          Qed.
          
          
          From Coq.Program Require Import Basics.
          From Coq Require Import FunctionalExtensionality.
          Open Scope program_scope.
          
          Theorem rev_invol A : rev (A:=A) ∘ rev (A:=A) = id.
          Proof.
            apply functional_extensionality.
            intro x.
            unfold compose, id. rewrite rev_rev.
            reflexivity.
          Qed.     
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
