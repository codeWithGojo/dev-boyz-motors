import { CarCardSkeleton } from '@/components/CarCard'

export default function ShowroomLoading() {
  return <section className="section-wrap py-8 sm:py-10 md:py-14" aria-busy="true" aria-label="Loading showroom">
    <div className="skeleton h-3 w-32" />
    <div className="skeleton mt-6 h-16 w-72 max-w-full" />
    <div className="mt-10 grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
      <div className="skeleton hidden h-[520px] rounded-3xl lg:block" />
      <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <CarCardSkeleton key={i} />)}</div>
    </div>
  </section>
}
