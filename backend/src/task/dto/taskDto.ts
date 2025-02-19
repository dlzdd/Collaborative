import { ParseIntPipe } from "@nestjs/common";
import { TaskPriority, TaskStatus } from "@prisma/client";

export class CreateTaskDto {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  status:     TaskStatus
  createdById: string;
  assigneeId?: string;
}