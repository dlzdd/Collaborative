import { Injectable, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/taskDto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async addTask(createTaskDto: CreateTaskDto) {
    const { title, description, dueDate, priority, assigneeId, createdById } = createTaskDto;

    if (!title) {
      throw new Error('Title is required');
    }

    // 确保 dueDate 是 Date 对象，如果是字符串，则转换为 Date
    let validDueDate: Date;

    // 如果 dueDate 是字符串类型，转换为 Date 对象
    if (typeof dueDate === 'string') {
      validDueDate = new Date(dueDate);
      if (isNaN(validDueDate.getTime())) {
        throw new Error('Invalid dueDate format. Expected ISO-8601 DateTime');
      }
    } else {
      validDueDate = dueDate; // 如果已经是 Date 对象，则直接使用
    }
    console.log(validDueDate, 'validDueDate')
    const data = await this.prisma.task.create({
      data: {
        title,
        description,
        dueDate: validDueDate, // 这里传递的是 Date 对象，Prisma 会处理为正确的格式
        priority: priority || 'LOW',
        status: 'PENDING',
        createdById: Number(createdById), // 确保是数字
        assigneeId: assigneeId ? Number(assigneeId) : null, // 确保是数字，且如果没有负责人则为 null
      },
    });

    return data;
  }

  async deleteTask(id: number) {
    const res = await this.prisma.task.delete({
      where: {
        id: id,
      },
    });
    return res;
  }

  async getTask(id) {
    const res = await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    console.log(res, 'res')
    if (res) {
      return res;
    } else {
      return '未查到该任务';
    }
  }

  async updateTask(createTaskDto) {
    const { id, title, description, dueDate, priority, assigneeId, createdById, status } = createTaskDto;
    const res = await this.prisma.task.update({
        data: {
            title,
            description,
            dueDate: dueDate, // 这里传递的是 Date 对象，Prisma 会处理为正确的格式
            priority: priority || 'LOW',
            status: status,
            assigneeId: assigneeId ? Number(assigneeId) : null, // 确保是数字，且如果没有负责人则为 null
        },
        where: {
            id: Number(id)
        }
    })
    return res
  }
}
