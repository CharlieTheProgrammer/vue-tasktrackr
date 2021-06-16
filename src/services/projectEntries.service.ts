// import { CreateEntryDto } from '@/dtos/create-entry.dto';
// import { UpdateEntryDto } from '@/dtos/update-entry.dto';
import { Entry } from '@/entities/entry.entity';
import httpService from './http.service';
import { plainToClass } from 'class-transformer';

export class ProjectEntriesService {
	constructor() {}

	// async create(createEntryDto: CreateEntryDto) {
	// 	let response = await httpService.post('/entries', createEntryDto);
	// 	return response.data;
	// }

	async findAllByProjectId(projectId): Promise<any[]> {
		const response = await httpService.get(`/projects/${projectId}/entries`);
		// @ts-ignore
		return plainToClass(Entry, response.data);
	}

	// async findOne(id: number) {
	// 	const response = await httpService.get('/entries/' + id);
	// 	return response.data;
	// }

	// async update(updateEntryDto: UpdateEntryDto) {
	// 	const response = await httpService.patch('/entries/' + updateEntryDto.id, updateEntryDto);
	// 	return response.data;
	// }

	// async delete(id: number) {
	// 	return await httpService.delete('/entries/' + id);
	// }
}
