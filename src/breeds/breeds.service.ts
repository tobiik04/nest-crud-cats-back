import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    const breed = this.breedRepository.create(createBreedDto);
    return await this.breedRepository.save(breed);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number) {
    return this.breedRepository.findOneBy({ id });
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    await this.breedRepository.update(id, updateBreedDto);
    return this.breedRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.breedRepository.delete(id);
  }
}
