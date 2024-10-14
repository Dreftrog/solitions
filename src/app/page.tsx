'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function Home() {
  const progressChartRef = useRef<HTMLCanvasElement>(null)
  const tasksChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (progressChartRef.current && tasksChartRef.current) {
      const progressChart = new Chart(progressChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Diseño', 'Desarrollo', 'Pruebas', 'Documentación'],
          datasets: [{
            label: 'Progreso (%)',
            data: [80, 65, 45, 30],
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
              text: 'Progreso General del Proyecto'
            }
          }
        }
      })

      const tasksChart = new Chart(tasksChartRef.current, {
        type: 'pie',
        data: {
          labels: ['Completadas', 'En Progreso', 'Pendientes'],
          datasets: [{
            data: [30, 15, 55],
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
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Avances del Proyecto Solitions</h1>
      
      <div className="mb-8">
        <canvas ref={progressChartRef}></canvas>
      </div>
      
      <div className="mb-8">
        <canvas ref={tasksChartRef}></canvas>
      </div>
    </div>
  )
}