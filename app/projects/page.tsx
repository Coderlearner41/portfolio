"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProjectForm } from "@/components/forms/project-form"
import { FiEdit2 } from "react-icons/fi"
import { getProjects, Project, deleteProject } from "./api/projects"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [openAdd, setOpenAdd] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error("Error fetching projects:", err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="container-max py-12 relative">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-muted-foreground">
          A collection of projects showcasing my technical expertise and innovation.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <article className="card-base p-5 rounded-2xl border bg-card hover:shadow-lg transition-all relative">
              {/* Edit & Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <FiEdit2
                  size={20}
                  className="cursor-pointer text-gray-500 hover:text-gray-800"
                  onClick={() => setEditProject(project)}
                />
                <button
                  onClick={async () => {
                    try {
                      await deleteProject(project.id)
                      setProjects((prev) => prev.filter((p) => p.id !== project.id))
                    } catch (err) {
                      console.error(err)
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
                
              <h3 className="text-xl font-semibold mb-1">💻 {project.title}</h3>
              {project.date && (
                <p className="text-sm text-muted-foreground mb-1">🗓️ {project.date}</p>
              )}
      
              {project.skills && project.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-muted text-sm px-3 py-1 rounded-full text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
      
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline hover:cursor-pointer"
                >
                  🔗 Visit Project
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-primary hover:underline hover:cursor-pointer"
                >
                  🐙 GitHub
                </a>
              )}
      
              <p className="mt-2 text-muted-foreground">🧠 {project.description}</p>
            </article>
          </motion.div>
        ))}
      </div>


      {/* Floating Add Button */}
      <Button
        onClick={() => setOpenAdd(true)}
        className="fixed bottom-8 right-8 rounded-full px-6 py-3 text-lg shadow-lg"
      >
        + Add Project
      </Button>

      {/* Add Project Form */}
      <ProjectForm
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSuccess={fetchProjects} // refresh list after adding
      />

      {/* Edit Project Form */}
      {editProject && (
        <ProjectForm
          project={editProject}
          open={!!editProject}
          onOpenChange={() => setEditProject(null)}
          onSuccess={fetchProjects} // refresh list after editing
        />
      )}
    </div>
  )
}
