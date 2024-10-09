import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ProjectModel, { Project } from '@/models/Project'

export async function GET() {
  await dbConnect()
  const projects = await ProjectModel.find({})
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  await dbConnect()
  const body: Omit<Project, '_id'> = await request.json()
  const project = await ProjectModel.create(body)
  return NextResponse.json(project)
}