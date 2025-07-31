import React from 'react'
import { Head } from '@inertiajs/react'
import FormBuilderPage from '@/components/form_builder/builder_renderer'
import { FormInterpreter } from '@/components/form_builder/form_interpreter'

export default function CustomOrderIndex() {

  return (
    <>
      <Head title="Custom Order" />
      <FormBuilderPage />
      <FormInterpreter schema={{
        "root": [
          "f7e625e2-7ed4-403f-b18a-aa6cb37396dd",
          "cd81d38e-6b88-4bce-869b-486772ab0e81",
          "609705e8-9590-4af8-ba97-9d1b07aa29bd"
        ],
        "entities": {
          "f7e625e2-7ed4-403f-b18a-aa6cb37396dd": {
            "attributes": {
              "label": "Text Fieldrth"
            },
            "type": "textField"
          },
          "cd81d38e-6b88-4bce-869b-486772ab0e81": {
            "attributes": {
              "label": "iejhầ"
            },
            "type": "textField"
          },
          "609705e8-9590-4af8-ba97-9d1b07aa29bd": {
            "attributes": {
              "label": " izgjojhroĥ"
            },
            "type": "textField"
          }
        }
      }} />
    </>
  )
}
