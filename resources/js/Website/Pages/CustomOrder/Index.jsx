import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import FormBuilderPage from '@/components/form_builder/builder_renderer'
import { FormInterpreter } from '@/components/form_builder/form_interpreter'

export default function CustomOrderIndex() {

  return (
    <>
      <Head title="Custom Order" />
      <p className='text-2xl font-extrabold pb-2'>Custom Order</p>
      <FormInterpreter schema={usePage().props.schema} />
    </>
  )
}
