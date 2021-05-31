import { CreateEntryDto } from '@/dtos/create-entry.dto';
import { UpdateEntryDto } from '@/dtos/update-entry.dto';
import httpService from './http.service';


export class EntriesService {
	constructor() {}

	async create(createEntryDto: CreateEntryDto) {
    let response = await httpService.post('/entries', createEntryDto)
		return response.data;
	}

	async findAll(): Promise<any[]>{
		const response = await httpService.get('/entries');
    return response.data;
	}

	async findOne(id: number) {
		const response = await httpService.get('/entries/' + id);
    return response.data;
	}

	async update(updateEntryDto: UpdateEntryDto) {
    const response =  await httpService.patch('/entries/' + updateEntryDto.id, updateEntryDto);
    return response.data;
	}

	async delete(id: number) {
		return await httpService.delete('/entries/' + id);
	}
}
