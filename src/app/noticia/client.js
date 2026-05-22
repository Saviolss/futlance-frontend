"use client"

import NoticiasRenderer from "./renderer"

export default function NoticiasClient({
  widgets = []
}) {

  return (
    <main className="w-full">
      <NoticiasRenderer widgets={widgets} />
    </main>
  )
}