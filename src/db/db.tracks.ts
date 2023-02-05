import { Track, User } from './db.model';

export class DbTracks {
  tracks: Track[] = [];

  async getAll(): Promise<Track[]> {
    return this.tracks;
  }
  async getOne(id: string): Promise<Track> {}
  async create() {}
  async remove() {}
  async update() {}
}
