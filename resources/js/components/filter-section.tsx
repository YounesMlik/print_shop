import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";


type FilterSectionProps = {
    selectedTags: Tag[],
    tagOptions: Tag[],
    onChange: (tagIds: Tag[]) => void,
}
export function FilterSection({ selectedTags, tagOptions, onChange }: FilterSectionProps) {
    const { t } = useTranslation();

    function loadTagOptions(inputValue: string) {
        return Promise.resolve(mapTagsToWeirds(filterTagsByInput(tagOptions, inputValue)))
    }

    function mapWeirdsToTags(weird_tags: readonly WeirdTag[]): Tag[] {
        return tagOptions.filter(tag => weird_tags.find(w => w.value === tag.id))
    }

    function onChange_local(weird_tags: readonly WeirdTag[]) {
        onChange(mapWeirdsToTags(weird_tags))
    }

    return (
        <div className="space-y-2">
            <Label htmlFor="product-tags">{t("tags_search.label")}</Label>
            <AsyncSelect
                inputId="product-tags"
                isMulti
                defaultOptions={mapTagsToWeirds(tagOptions)}
                cacheOptions
                value={mapTagsToWeirds(selectedTags)}
                loadOptions={loadTagOptions}
                onChange={onChange_local}
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

function filterTagsByInput(tagOptions: Tag[], inputValue: string) {
    const lowerInput = inputValue.toLowerCase()
    return tagOptions.filter(tag => tag.name.toLowerCase().includes(lowerInput))
}

function mapTagsToWeirds(tags: Tag[]): WeirdTag[] {
    return tags.map(tag => ({
        value: tag.id,
        label: tag.name,
    }))
}



type WeirdTag = {
    value: number;
    label: string;
}