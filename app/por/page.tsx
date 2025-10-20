"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AddPORForm } from "@/components/forms/add-por-form"
import { FiEdit2 } from "react-icons/fi"
import { getPORs, POR, deletePOR } from "./api/por"

export default function PORPage() {
  const [porData, setPorData] = useState<POR[]>([])
  const [openAdd, setOpenAdd] = useState(false)
  const [editPOR, setEditPOR] = useState<POR | null>(null)

  const fetchPORs = async () => {
    try {
      const data = await getPORs()
      console.log(data)
      setPorData(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPORs()
  }, [])

  return (
    <div className="container-max py-12 relative">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Positions of Responsibility</h1>
        <p className="text-muted-foreground">Leadership roles and organizational contributions.</p>
      </motion.div>

      <div className="grid gap-6">
        {porData.map((por, index) => (
          <motion.div
            key={por.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <article className="card-base p-5 rounded-2xl border bg-card hover:shadow-lg transition-all relative">
              <div className="absolute top-3 right-3 flex gap-2">
                <FiEdit2
                  size={20}
                  className="cursor-pointer text-gray-500 hover:text-gray-800"
                  onClick={() => setEditPOR(por)}
                />
                <button
                  onClick={async () => {
                    try {
                      await deletePOR(por.id)
                      // Refresh the list after deletion
                      setPorData((prev) => prev.filter((p) => p.id !== por.id))
                    } catch (err) {
                      console.error(err)
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
                
              <h3 className="text-xl font-semibold mb-1">👔 {por.position}</h3>
              <p className="text-muted-foreground mb-1">🏛️ {por.sphere}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {por.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-2">🗓️ {por.tenure}</p>
              <p className="text-muted-foreground">💬 {por.description}</p>
            </article>
          </motion.div>
        ))}
      </div>


      <Button
        onClick={() => setOpenAdd(true)}
        className="fixed bottom-8 right-8 rounded-full px-6 py-3 text-lg shadow-lg"
      >
        + Add POR
      </Button>

      <AddPORForm
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSuccess={fetchPORs} // refresh list
      />

      {editPOR && (
        <AddPORForm
          open={!!editPOR}
          onOpenChange={() => setEditPOR(null)}
          onSuccess={fetchPORs}
          initialData={editPOR} // populate form for edit
        />
      )}
    </div>
  )
}
