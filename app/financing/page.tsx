import Link from 'next/link'
import { FinanceCalculator } from '@/components/FinanceCalculator'

export const metadata = { title: 'Financing' }

const steps = [
 ['Choose a car', 'Browse the collection and request confirmation of the actual car, price and documentation.'],
 ['Estimate your payments', 'Adjust the deposit, loan term and annual interest rate in the calculator.'],
 ['Discuss financing options', 'Ask our team about available independent lenders. Every loan requires lender checks and approval.']
]
export default function Financing() {
 return <section className="section-wrap py-12 md:py-20">
  <div className="eyebrow">VEHICLE FINANCE</div>
  <h1 className="mt-3 max-w-4xl break-words text-4xl font-black leading-[1.05] tracking-[-.05em] sm:text-5xl md:text-7xl">Make room for the car you want.</h1>
  <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">Explore indicative monthly repayments before discussing a loan with a financial institution. These are estimates, not credit offers or guaranteed approvals.</p>
  <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-start">
   <FinanceCalculator/>
   <div className="min-w-0 space-y-4">{steps.map(([title,description],i)=><div key={title} className="rounded-3xl bg-card p-6 ring-1 ring-black/5"><span className="grid h-9 w-9 place-items-center rounded-full bg-black text-sm font-bold text-white">{i+1}</span><h2 className="mt-4 text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p></div>)}<div className="rounded-3xl border border-black/10 p-6"><h2 className="font-bold">About lending partners</h2><p className="mt-2 text-sm leading-6 text-neutral-600">We only display bank logos once a financing partnership has been verified. Contact our team to ask which lenders, if any, are currently available.</p><Link href="/contact" className="pill-black mt-5">Ask about financing</Link></div></div>
  </div>
 </section>
}
