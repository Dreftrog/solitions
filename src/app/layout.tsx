import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { ProjectProvider } from '@/components/ProjectContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Simple CRM',
  description: 'A simple CRM for managing projects and requests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectProvider>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </ProjectProvider>
      </body>
    </html>
  )
}