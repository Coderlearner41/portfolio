"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Project, updateProject, createProject } from "../../app/projects/api/projects"

interface ProjectFormProps {
  project?: Project // if provided → edit mode, else add mode
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ProjectForm({ project, open, onOpenChange, onSuccess }: ProjectFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    github: "",
    demo: "",
  })

  // Prefill form if editing
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        skills: project.skills?.join(", ") || "",
        github: project.links?.github || "",
        demo: project.links?.demo || "",
      })
    } else {
      setForm({ title: "", description: "", skills: "", github: "", demo: "" })
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (project) {
        // Edit mode
        await updateProject(project.id, {
          title: form.title,
          description: form.description,
          skills: form.skills.split(",").map((s) => s.trim()),
          links: { github: form.github, demo: form.demo },
        })
      } else {
        // Add mode
        await createProject({
          title: form.title,
          description: form.description,
          skills: form.skills.split(",").map((s) => s.trim()),
          links: { github: form.github, demo: form.demo },
        })
      }
      onOpenChange(false)
      if (onSuccess) onSuccess() // refresh list
    } catch (err) {
      console.error("Failed to save project:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
          />
          <Input
            placeholder="GitHub Link"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
          />
          <Input
            placeholder="Demo Link"
            value={form.demo}
            onChange={(e) => setForm({ ...form, demo: e.target.value })}
          />
          <Button type="submit" className="w-full mt-2">
            {project ? "Update Project" : "Add Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
