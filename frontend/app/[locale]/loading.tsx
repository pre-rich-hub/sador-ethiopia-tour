/** Shown instantly while the next page renders, so a tap gets visible feedback. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="min-h-[70vh]">
      <div className="fixed inset-x-0 top-0 z-[80] h-[3px] overflow-hidden">
        <div className="route-progress h-full w-full bg-[image:var(--sun-gradient)]" />
      </div>
    </div>
  )
}
