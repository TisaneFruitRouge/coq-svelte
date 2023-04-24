(**
    [config]
        showGoal: true
        canChangeSettings: false
    [/config]

    Première partie
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
    LA SECONDE PARTIE
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