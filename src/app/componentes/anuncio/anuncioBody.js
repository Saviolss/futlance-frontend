// // 'use client'

// import { useEffect } from 'react'

// export default function AnuncioInPagePush() {
//   useEffect(() => {
//     const script = document.createElement('script')

//     script.src = 'https://nap5k.com/tag.min.js'
//     script.async = true
//     script.dataset.zone = '11179286'

//     document.body.appendChild(script)

//     return () => {
//       script.remove()
//     }
//   }, [])

//   return (
//     <div
//       id="monetag-inpage-push"
//       className="w-full flex justify-center my-4"
//     />
//   )
// }