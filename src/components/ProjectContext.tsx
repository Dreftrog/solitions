'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { Project } from '@/models/Project'

type ProjectContextType = {
  projects: Project[];
  addProject: (project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addProject = async (project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      })
      if (!response.ok) {
        throw new Error('Failed to add project')
      }
      const newProject = await response.json()
      setProjects(prevProjects => [...prevProjects, newProject])
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, isLoading }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}