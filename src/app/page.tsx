'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useProjects } from '@/components/ProjectContext'
import { Project } from '@/models/Project'
import Chart from 'chart.js/auto'

export default function ProjectsPage() {
  const { projects, addProject, isLoading } = useProjects()
  const [newProject, setNewProject] = useState<Omit<Project, '_id' | 'createdAt' | 'updatedAt'>>({ 
    name: '', 
    description: '', 
    client: '', 
    value: 0, 
    status: 'En Progreso',
    progress: 0,
    startDate: new Date(),
  })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const progressChartRef = useRef<HTMLCanvasElement>(null)
  const tasksChartRef = useRef<HTMLCanvasElement>(null)

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    await addProject(newProject)
    setNewProject({ 
      name: '', 
      description: '', 
      client: '', 
      value: 0, 
      status: 'En Progreso', 
      progress: 0,
      startDate: new Date(),
    })
  }

  useEffect(() => {
    if (selectedProject && progressChartRef.current && tasksChartRef.current) {
      const progressChart = new Chart(progressChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Diseño', 'Desarrollo', 'Pruebas', 'Documentación'],
          datasets: [{
            label: 'Progreso (%)',
            data: [80, 65, 45, 30], // Estos datos deberían venir del proyecto seleccionado
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Progreso del Proyecto por Etapas'
            }
          }
        }
      })

      const tasksChart = new Chart(tasksChartRef.current, {
        type: 'pie',
        data: {
          labels: ['Completadas', 'En Progreso', 'Pendientes'],
          datasets: [{
            data: [30, 15, 55], // Estos datos deberían venir del proyecto seleccionado
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Estado de las Tareas'
            }
          }
        }
      })

      return () => {
        progressChart.destroy()
        tasksChart.destroy()
      }
    }
  }, [selectedProject])

  if (isLoading) {
    return <div>Cargando proyectos...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Nuevo Proyecto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Proyecto</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProject} className="space-y-4">
              <Input
                placeholder="Nombre del Proyecto"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
              <Input
                placeholder="Descripción"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <Input
                placeholder="Cliente"
                value={newProject.client}
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Valor"
                value={newProject.value}
                onChange={(e) => setNewProject({ ...newProject, value: Number(e.target.value) })}
                required
              />
              <Select
                value={newProject.status}
                onValueChange={(value) => setNewProject({ ...newProject, status: value as Project['status'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="En Pausa">En Pausa</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Progreso (%)"
                value={newProject.progress}
                onChange={(e) => setNewProject({ ...newProject, progress: Number(e.target.value) })}
                required
                min="0"
                max="100"
              />
              <Button type="submit">Agregar Proyecto</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>${project.value}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.progress}%</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedProject(project)}>Ver Avances</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedProject && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Avances de {selectedProject.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <canvas ref={progressChartRef}></canvas>
            </div>
            <div>
              <canvas ref={tasksChartRef}></canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}