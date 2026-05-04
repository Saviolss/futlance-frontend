"use client"

import HomeRenderer from "./renderer"

export default function HomeClient({ widgets = [] }) {

  return (
    <main>
      <HomeRenderer widgets={widgets} />
    </main>
  )
}