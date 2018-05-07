import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Task} from "../../models/task";
import {TaskProvider} from "../../providers/task/task";
import * as _ from "lodash";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController,
              private taskProvider: TaskProvider) {

  }

  ngOnInit() {
    /**
     * Au chargementde mon application,
     * je récupère les tâches sauvegardées.
     */
    this.taskProvider.getTasks().then(
      tasks => {
        if(null !== tasks) {
          this.tasks = tasks;
        }
      }
    )
  }

  /** Création d'une tâche @type {Task} */
  task: Task = new Task();

  /** Liste des Tâches @type {any[]} */
  tasks: Task[] = [];

  /** Affichage du Formulaire @type {boolean} */
  active: boolean = true;

  /** Gestion des dates @type {Date} */
  date: Date = new Date();

  /**
   * Déclenche l'enregistrement
   * d'une nouvelle tâche.
   */
  saveTask(): void {
    /**
     * Si l'utilisateur à bien saisi
     * un titre, j'ajoute la tâche et
     * je sauvegarde le tout.
     */
    if(undefined !== this.task.title) {
      /** Attribution d'un id */
      this.task.id = Date.now();

      /** On ajoute la tâche dans le tableau */
      this.tasks.push(this.task);

      /** On sauvegarde les tâches dans le Storage */
      this.taskProvider.saveTasks(this.tasks);
    }
    /** Réinitialisation du Formulaire */
    this.task = new Task();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  /**
   * Déclenche l'enregistrement
   * lors de la pression sur "Entrer"
   * @param {number} keyCode
   */
  enterSave(keyCode: number): void {
    if (keyCode === 13) {
      this.saveTask();
    }
  }

  /**
   * Enregistre les Tâches
   */
  saveOurTasks() {
    this.taskProvider.saveTasks(this.tasks);
  }

  /**
   * Supprimer une tâche
   * @param {Task} task
   */
  deleteTask(task: Task): void {
    _.pullAllWith(this.tasks, [task], _.isEqual);
    this.taskProvider.saveTasks(this.tasks);
  }
}
