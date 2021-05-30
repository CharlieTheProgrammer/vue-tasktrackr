import { CreateProjectDto } from '@/dtos/create-project.dto';
import { UpdateProjectDto } from '@/dtos/update-project.dto';
import httpService from './http.service';


export class ProjectsService {
	constructor() {}

	async create(createProjectDto: CreateProjectDto) {
    let response = await httpService.post('/projects', createProjectDto)
		return response.data;
	}

	async findAll(): Promise<any[]>{
		const response = await httpService.get('/projects');
    return response.data;
	}

	async findOne(id: number) {
		const response = await httpService.get('/projects/' + id);
    return response.data;
	}

	async update(updateProjectDto: UpdateProjectDto) {
    const response =  await httpService.patch('/projects/' + updateProjectDto.id, updateProjectDto);
    return response.data;
	}

	async delete(id: number) {
		return await httpService.delete('/projects/' + id);
	}
}
