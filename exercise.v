(**
    [config]
        showGoal: false
        canChangeSettings: false
    [/config]

    # First part
    ## second part
    **damn**, this is *great*
**)

From Coq Require Import List.
Import ListNotations.
          
Lemma rev_snoc_cons A :
forall (x : A) (l : list A), rev (l ++ [x]) = x :: rev l.
            
Proof.
    induction l.
    - reflexivity.
    - simpl. rewrite IHl. simpl. reflexivity.
Qed.
          

(**
    Second Part
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
**)          
          
Theorem rev_rev A : forall (l : list A), rev (rev l) = l.
Proof.
    induction l.
    - reflexivity.
    - simpl. rewrite rev_snoc_cons. rewrite IHl. reflexivity.
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