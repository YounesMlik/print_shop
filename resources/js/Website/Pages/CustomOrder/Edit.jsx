import React from 'react'
import { Head } from '@inertiajs/react'
import FormBuilderPage from '@/components/form_builder/builder_renderer'
import AdminLayout from '@/Layouts/AdminLayout'

export default function FormBuilder() {

  return (
    <>
      <Head title="Form Builder" />
      <FormBuilderPage />
    </>
  )
}

export const Layout = AdminLayout;