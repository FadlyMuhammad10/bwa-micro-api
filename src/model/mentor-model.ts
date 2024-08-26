import { Mentor } from "@prisma/client";

export type MentorResponse = {
  id: number;
  name: string;
  email: string;
  profession?: string | null;
  avatar?: string | null;
  public_id?: string | null;
};
export type MentorRequest = {
  name: string;
  email: string;
  profession?: string;
};

export function ToMentorResponse(mentor: Mentor): MentorResponse {
  return {
    id: mentor.id,
    name: mentor.name,
    email: mentor.email,
    profession: mentor.profession,
    avatar: mentor.avatar,
    public_id: mentor.public_id,
  };
}
