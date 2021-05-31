import { CreateCategoryDto } from '@/dtos/create-category.dto';
import { UpdateCategoryDto } from '@/dtos/update-category.dto';
import httpService from './http.service';


export class CategoriesService {
	constructor() {}

	async create(createCategoryDto: CreateCategoryDto) {
    let response = await httpService.post('/categories', createCategoryDto)
		return response.data;
	}

	async findAll(): Promise<any[]>{
		const response = await httpService.get('/categories');
    return response.data;
	}

	async findOne(id: number) {
		const response = await httpService.get('/categories/' + id);
    return response.data;
	}

	async update(updateCategoryDto: UpdateCategoryDto) {
    const response =  await httpService.patch('/categories/' + updateCategoryDto.id, updateCategoryDto);
    return response.data;
	}

	async delete(id: number) {
		return await httpService.delete('/categories/' + id);
	}
}
