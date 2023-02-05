import { Track, User } from './db.model';
import { NotFoundException } from '@nestjs/common';
import { Errors } from '../enum.service';
import { randomUUID } from 'crypto';

interface UpdateTrackDto {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
interface CreateTrackDto {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class DbTracks {
  tracks: Track[] = [];

  async getAll(): Promise<Track[]> {
    return this.tracks;
  }
  async getOne(id: string): Promise<Track> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    return track;
  }
  async create(data: CreateTrackDto): Promise<Track> {
    const track = {
      ...data,
      id: randomUUID(),
    };
    this.tracks.push(track);
    return track;
  }
  async remove(id: string): Promise<boolean> {
    const idx = this.tracks.findIndex((item) => item.id === id);
    if (!idx) throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    this.tracks = this.tracks.splice(idx, 1);
    return true;
  }
  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    let track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    track = { ...track, ...dto };
    return track;
  }
}
