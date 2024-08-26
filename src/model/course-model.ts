import { Course } from "@prisma/client";

export type CourseResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  level: string;
  type: string;
  status: string;
  mentor_id: number;
  category_id: number;
  thumbnail?: string | null;
  public_id?: string | null;
  Category?: string | null;
  Mentor?: string | null;
  chapters?: string | null;
};

export type CourseRequest = {
  name: string;
  description: string;
  price: string;
  level: string;
  type: string | any;
  status: string | any;
  mentor_id: string;
  category_id: string;
};

export function ToCourseResponse(course: Course): CourseResponse {
  return {
    id: course.id,
    name: course.name,
    description: course.description,
    price: course.price,
    level: course.level,
    type: course.type,
    status: course.status,
    thumbnail: course.thumbnail,
    public_id: course.public_id,
    mentor_id: course.mentor_id,
    category_id: course.category_id,
  };
}
