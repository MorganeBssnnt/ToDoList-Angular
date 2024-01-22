import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-first-one',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './first-one.component.html',
  styleUrl: './first-one.component.css'
})
export class FirstOneComponent {
  submitted: boolean = false;
  taches: any[] = [];
  //afficher toutes les taches par defaut
  filter: string = 'all'

  //renseigner les ctrl a fabriquer
  newTache: FormGroup = this.fb.group({
    nomTache: [""],
    quantite: [0],
    accomplie: [false]
  });

  //injection formbuilder ds constructeur du composant
  constructor(private fb: FormBuilder) {

  }

  get form() {
    return this.newTache.controls;
  }

  //ajouter un elem valide a la liste + reinitialiser le form 
  private addTache = () => {
    this.taches.push(this.newTache.value);
    this.newTache.reset();
    this.submitted = false;
  }

  // verif si elem valid et etat du form, @returns un boolean 

  handleSubmitForm = (): boolean => {
    this.submitted = true;
    if (this.newTache.valid) {
      this.addTache();
      return true;
    } else if (this.newTache.invalid) {
      console.log("nouvelle tache invalide", this.newTache.value)
      return false;
    } else {
      console.log("autre probleme");
      return false
    }
  }

  //Checkbox qui affiche une alerte pour valider la tache
  oncheck = () => {
    alert("Tache terminée")
  }

  //Supprimer une tache
  deleteTask(index: number): void {
    this.taches.splice(index, 1);
  }

  //Filtre permmettant d'afficher le statut des taches (terminée, supprimée, toutes)
  setFilter(filter: string): void {
    this.filter = filter;
  };


}
