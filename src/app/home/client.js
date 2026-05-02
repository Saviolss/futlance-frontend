"use client"

import HomeRenderer from "./renderer"

export default function HomeClient({ widgets = [] }) {
  console.log("Widgets recebidos do back:", widgets)

  return (
    <main>
      <HomeRenderer widgets={widgets} />
    </main>
  )
}