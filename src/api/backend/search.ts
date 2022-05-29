import { SearchResponse } from '../../types/api';
import { Base } from './Base';

class Search extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/search`;

  getTasks(): Promise<SearchResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/tasks`));
  }
}

export const search = new Search();
