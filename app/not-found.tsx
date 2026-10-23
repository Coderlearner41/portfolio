import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container-max flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-5xl font-semibold text-white">Nothing here.</h1>
      <p className="mt-3 text-dim">That page doesn&apos;t exist, but plenty of other things do.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back home
      </Link>
    </div>
  )
}
