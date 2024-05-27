import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../shared/interface/user.interface';
import { UserService } from '../../shared/service/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { Assignment, Matiere, Person } from '../../shared/interface/assignment.interface';
import { MatiereService } from '../../shared/service/matiere.service';
import { AssignmentService } from '../../shared/service/assignment.service';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule
  ],
  /*providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],*/
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {
  // liste des etudiants
  etudiants: Person[] = [];

  // Champ pour les formulaires
  nomAssignment: string = '';
  dateDeRendu!: Date;
  remarque: string = '';

  // pour la pagination des etudiants
  pageEtudiant = 1;
  limitEtudiant = 20;
  totalDocsEtudiant!: number;
  totalPagesEtudiant!: number;
  nextPageEtudiant!: number;
  prevPageEtudiant!: number;
  hasNextPageEtudiant!: boolean;
  hasPrevPageEtudiant!: boolean;

  // liste des matieres
  matieres: Matiere[] = []
  // pour la pagination des etudiants
  pageMatiere = 1;
  limitMatiere = 20;
  totalDocsMatiere!: number;
  totalPagesMatiere!: number;
  nextPageMatiere!: number;
  prevPageMatiere!: number;
  hasNextPageMatiere!: boolean;
  hasPrevPageMatiere!: boolean;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  faDelete = faDeleteLeft
  faEdit = faEdit;

  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private matiereService: MatiereService,
    private assignmentService: AssignmentService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEtudiantsFromService();
    this.getMatiereFromService();
  }

  getEtudiantsFromService() {
    console.log('recup')
    // on récupère les etudiants depuis le service
    this.userService.getAllStudents(this.pageEtudiant, this.limitEtudiant)
      .subscribe(
        (data) => {
          // les données arrivent ici au bout d'un certain temps
          this.etudiants = data.docs;
          this.totalDocsEtudiant = data.totalDocs;
          this.totalPagesEtudiant = data.totalPages;
          this.nextPageEtudiant = data.nextPage;
          this.prevPageEtudiant = data.prevPage;
          this.hasNextPageEtudiant = data.hasNextPage;
          this.hasPrevPageEtudiant = data.hasPrevPage;
        });

  }

  // pour la pagination
  pagePrecedenteEtudiant() {
    this.pageEtudiant = this.prevPageEtudiant;
    this.getEtudiantsFromService();
  }

  pageSuivanteEtudiant() {
    this.pageEtudiant = this.nextPageEtudiant;
    this.getEtudiantsFromService();
  }

  premierePageEtudiant() {
    this.pageEtudiant = 1;
    this.getEtudiantsFromService();
  }

  dernierePageEtudiant() {
    this.pageEtudiant = this.totalPagesEtudiant;
    this.getEtudiantsFromService();
  }


  getMatiereFromService() {
    console.log('recup')
    // on récupère les etudiants depuis le service
    this.matiereService.getAllMatieres(this.pageMatiere, this.limitMatiere)
      .subscribe(
        (data) => {
          // les données arrivent ici au bout d'un certain temps
          this.matieres = data.docs;
          this.totalDocsMatiere = data.totalDocs;
          this.totalPagesMatiere = data.totalPages;
          this.nextPageMatiere = data.nextPage;
          this.prevPageMatiere = data.prevPage;
          this.hasNextPageMatiere = data.hasNextPage;
          this.hasPrevPageMatiere = data.hasPrevPage;
        });

  }

  // pour la pagination
  pagePrecedenteMatiere() {
    this.pageMatiere = this.prevPageMatiere;
    this.getMatiereFromService();
  }

  pageSuivanteMatiere() {
    this.pageMatiere = this.nextPageMatiere;
    this.getMatiereFromService();
  }

  premierePageMatiere() {
    this.pageMatiere = 1;
    this.getMatiereFromService();
  }

  dernierePageMatiere() {
    this.pageMatiere = this.totalPagesMatiere;
    this.getMatiereFromService();
  }

  // l'objet pour stocker l'assignment a enregistrer
  assignment: Assignment = new Assignment;

  setInformationGeneral() {
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateRendu = this.dateDeRendu;
    this.assignment.remarque = this.remarque;
    this.assignment.rendu = false;
    console.log(this.assignment)
  }


  setSelectedEtudiant(etudiant: Person) {
    this.assignment.etudiant = new Person()
    this.assignment.etudiant._id = etudiant._id;
    this.assignment.etudiant.nom = etudiant.nom;
    this.assignment.etudiant.email = etudiant.email;
    this.assignment.etudiant.avatar = etudiant.avatar;
    console.log(this.assignment)
  }

  setSelectedMatiere(matiere: Matiere) {
    this.assignment.matiere = new Matiere();
    this.assignment.matiere._id = matiere._id;
    this.assignment.matiere.nom = matiere.nom;
    this.assignment.matiere.coefficient = matiere.coefficient;

    this.assignment.matiere.professeur = new Person();
    this.assignment.matiere.professeur._id = matiere.professeur._id;
    this.assignment.matiere.professeur.nom = matiere.professeur.nom;
    this.assignment.matiere.professeur.email = matiere.professeur.email;
    this.assignment.matiere.professeur.avatar = matiere.professeur.avatar;

    this.assignment.matiere.image = matiere.image;
    console.log(this.assignment)
  }

  confirmation() {
    this.assignmentService.addAssignment(this.assignment)
      .subscribe(
        message => {
          // redirection vers la liste des assignments
          this.router.navigate(['/assignment/list']);
        }
      )
  }
}
