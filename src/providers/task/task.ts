import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {Task} from "../../models/task";

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {

  constructor(private storage: Storage) {
    console.log('Hello TaskProvider Provider');
  }

  /**
   * Permet de sauvegarder les tâches.
   * @param {Task[]} tasks
   */
  saveTasks(tasks: Task[]) {
    this.storage.set('tasks', tasks);
  }

  /**
   * Récupère les tâches sauvegardées.
   * @returns {Promise<Task[]>}
   */
  getTasks(): Promise<Task[]> {
    return this.storage.get('tasks');
  }

}
