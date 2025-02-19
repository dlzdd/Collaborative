import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/taskDto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post() 
    async addTask(@Body() CreateTaskDto: CreateTaskDto) {
        return this.taskService.addTask(CreateTaskDto)
    }

    @Delete(':id') 
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTask(id)
    }

    @Get(':id')
    async getTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getTask(id)
    }

    @Patch()
    async updateTask(@Body() CreateTaskDto: CreateTaskDto) {
        return this.taskService.updateTask(CreateTaskDto)
    }
}
