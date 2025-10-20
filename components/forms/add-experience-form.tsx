"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { createExperience, updateExperience, Experience } from "../../app/experience/api/experience"

interface AddExperienceFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  initialData?: Experience
}

// ✅ Extend Experience type locally (add `skills` without changing API)
type ExperienceWithSkills = Experience & { skills: string[] }

export function AddExperienceForm({ open, onOpenChange, onSuccess, initialData }: AddExperienceFormProps) {
  const [form, setForm] = useState<ExperienceWithSkills>({
    id: 0, // Default value for id
    company: "",
    role: "",
    duration: "",
    description: "",
    skills: [],
  })

  useEffect(() => {
    if (initialData)
      setForm({ ...initialData, skills: (initialData as any).skills || [] })
    else
      setForm({ id: 0, company: "", role: "", duration: "", description: "", skills: [] })
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (initialData?.id) {
        await updateExperience(initialData.id, form)
      } else {
        await createExperience(form)
      }
      onOpenChange(false)
      onSuccess?.()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Experience" : "Add New Experience"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Company Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <Input
            placeholder="Role / Position"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <Input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
          <Input
            placeholder="Skills (comma-separated)"
            value={form.skills.join(", ")}
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value.split(",").map((s) => s.trim()) })
            }
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Button type="submit" className="w-full mt-2">
            {initialData ? "Update Experience" : "Add Experience"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
