import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";


export function FilterSection({ selectedTags, tagOptions, loadTagOptions, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      <Label htmlFor="product-tags">{t("tags_search.label")}</Label>
      <AsyncSelect
        inputId="product-tags"
        isMulti
        defaultOptions={tagOptions}
        cacheOptions
        value={selectedTags}
        loadOptions={loadTagOptions}
        onChange={onChange}
        placeholder={t("tags_search.placeholder")}
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '0.375rem',
            borderColor: '#e2e8f0',
            padding: '2px',
            boxShadow: 'none',
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#f1f5f9',
            borderRadius: '0.375rem',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#334155',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#334155',
            ':hover': {
              backgroundColor: '#e2e8f0',
              color: '#1e293b',
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#e2e8f0' : 'white',
            color: '#0f172a',
          }),
          menu: (base) => ({
            ...base,
            zIndex: 20,
          }),
        }}
      />
    </div>
  )
}
