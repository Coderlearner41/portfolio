"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AddExperienceForm } from "@/components/forms/add-experience-form"
import { FiEdit2 } from "react-icons/fi"
import { getExperiences, Experience,deleteExperience } from "./api/experience"
import { ExperienceCard } from "@/components/experience-card"

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [openAdd, setOpenAdd] = useState(false)
  const [editExperience, setEditExperience] = useState<Experience | null>(null)

  const fetchExperiences = async () => {
    try {
      const data = await getExperiences()
      setExperiences(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  return (
    <div className="container-max py-12 relative">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Experience</h1>
        <p className="text-muted-foreground">Professional internships and work experience.</p>
      </motion.div>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <FiEdit2
                size={20}
                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-800"
                onClick={() => setEditExperience(exp)}
              />
              <ExperienceCard
                {...exp}
                onDelete={async (id) => {
                  try {
                    await deleteExperience(id)
                    setExperiences((prev) => prev.filter((e) => e.id !== id))
                  } catch (err) {
                    console.error(err)
                  }
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Button
        onClick={() => setOpenAdd(true)}
        className="fixed bottom-8 right-8 rounded-full px-6 py-3 text-lg shadow-lg"
      >
        + Add Experience
      </Button>

      <AddExperienceForm
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSuccess={fetchExperiences}
      />

      {editExperience && (
        <AddExperienceForm
          open={!!editExperience}
          onOpenChange={() => setEditExperience(null)}
          onSuccess={fetchExperiences}
          initialData={editExperience}
        />
      )}
    </div>
  )
}
