import { redirect } from 'next/navigation'
/** Legacy checkout does not accept payments; reservations are enquiry forms. */
export default function Checkout(){redirect('/garage')}
