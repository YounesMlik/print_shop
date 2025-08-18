import { Head, usePage } from '@inertiajs/react'
import { FormInterpreter } from '@/components/form_builder/form_interpreter'

export default function CustomOrderIndex() {

  return (
    <>
      <Head title="Custom Order" />
      <p className='text-5xl font-extrabold pb-6'>Custom Order</p>
      <FormInterpreter schema={usePage().props.schema} />
    </>
  )
}
