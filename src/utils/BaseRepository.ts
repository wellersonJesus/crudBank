import { EntityTarget, getRepository, Repository } from 'typeorm'

export default class BaseRepository<T> {
  private repository: Repository<T>

  _getRepo(entity: EntityTarget<T>): Repository<T> {
    if (!this.repository) {
      this.repository = getRepository(entity)
    }

    return this.repository
  }
}
