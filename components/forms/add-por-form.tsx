"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { createPOR, updatePOR, POR } from "../../app/por/api/por"

interface AddPORFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  initialData?: POR
}

export function AddPORForm({ open, onOpenChange, onSuccess, initialData }: AddPORFormProps) {
  const [form, setForm] = useState<{
    sphere: string
    position: string
    tenure: string
    description: string
    skills: string[]
  }>({
    sphere: "",
    position: "",
    tenure: "",
    description: "",
    skills: [],
  })
  

  useEffect(() => {
    if (initialData) setForm({ ...initialData, skills: Array.isArray(initialData.skills) ? initialData.skills : [] })
    else setForm({ sphere: "", position: "", tenure: "", description: "", skills: [] })
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("hehe",form)
    e.preventDefault()
    try {
      if (initialData?.id) {
        await updatePOR(initialData.id, form)
      } else {
        await createPOR(form)
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
          <DialogTitle>{initialData ? "Edit POR" : "Add New Position of Responsibility"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Sphere" value={form.sphere} onChange={(e) => setForm({ ...form, sphere: e.target.value })} />
          <Input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
          <Input placeholder="Tenure" value={form.tenure} onChange={(e) => setForm({ ...form, tenure: e.target.value })} />
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input
              placeholder="Skills (comma-separated)"
              value={form.skills?.join(", ") || ""}
              onChange={(e) =>
                setForm({ ...form, skills: e.target.value.split(",").map(s => s.trim()) })
              }
            />

          {/* <Input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /> */}
          <Button type="submit" className="w-full mt-2">
            {initialData ? "Update POR" : "Add POR"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
