import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  // Inserta un nuevo tipo de gato
  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      throw new BadRequestException('Raza no encontrada');
    }

    return await this.catsRepository.save({
      ...createCatDto,
      breed,
    });
  }

  // Obtiene todos los tipos de datos
  async findAll() {
    return await this.catsRepository.find();
  }

  // Obtiene un gato por id
  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  // Actualiza un gato
  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catsRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

    let breed;

    if (updateCatDto.breed) {
      breed = await this.breedRepository.findOneBy({
        name: updateCatDto.name,
      });

      if (!breed) {
        throw new BadRequestException('Breed not found');
      }
    }
    return this.catsRepository.save({
      ...cat,
      ...updateCatDto,
      breed,
    });
  }

  // Remueve un gato por id
  async remove(id: number) {
    return await this.catsRepository.softRemove({ id });
  }
}
