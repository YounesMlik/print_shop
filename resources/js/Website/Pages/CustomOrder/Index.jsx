import { Head, usePage } from '@inertiajs/react'
import { FormInterpreter } from '@/components/form_builder/form_interpreter'
import { useTranslation } from 'react-i18next';

export default function CustomOrderIndex() {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t("custom_order")} />
      <p className='text-5xl font-extrabold pb-6'>{t("custom_order")}</p>
      <FormInterpreter schema={usePage().props.schema} />
    </>
  )
}
