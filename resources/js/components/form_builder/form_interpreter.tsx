import { type Schema } from "@coltorapps/builder";
import {
    InterpreterEntities,
    useInterpreterStore,
} from "@coltorapps/builder-react";

import entity_components from "./entity_componenets";
import { formBuilder } from "./builder";
import { Button } from "@/components/ui/button";
import { sendWhatsappMessage } from "@/components/helpers";
import { useTranslation } from "react-i18next";

type FormBuilderSchema = Schema<typeof formBuilder>;

export function FormInterpreter({ schema }: { schema: FormBuilderSchema }) {
    const { t } = useTranslation();
    const interpreterStore = useInterpreterStore(formBuilder, schema, {
        events: {
            onEntityValueUpdated(payload) {
                void interpreterStore.validateEntityValue(payload.entityId);
            },
        },
    });

    async function submitForm() {
        // We will cover server integration in the next section.
        const schema_entries = Object.entries(schema.entities);
        const form_data = interpreterStore.getEntitiesValues()
        const data = schema_entries.map(
            ([id, value]) => [id, { ...value, value: form_data[id] }]
        );
        sendWhatsappMessage("Custom Order:\n\n" + generateReadableOrder(data, { includeEmpty: true }));
    }

    return (
        <form className="m-2"
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}>
            <InterpreterEntities
                interpreterStore={interpreterStore}
                components={entity_components}
            >
                {({ children }) => (
                    <div className="mb-4">
                        {children}
                    </div>
                )}
            </InterpreterEntities>
            <Button type="submit">{t("order_via_whatsapp")}</Button>
        </form>
    );
}


/**
 * Generate a human-readable summary from a dynamic form output.
 * @param {Array<[string, {type:string, attributes?:{label?:string}, value:any}]>} formOutput
 * @param {Object} [opts]
 * @param {'text'|'markdown'|'html'|'object'} [opts.format='text']
 * @param {boolean} [opts.includeEmpty=false]  // include empty values
 * @returns {string|Object}
 */
function generateReadableOrder(
    formOutput,
    opts: { format?: 'text' | 'markdown' | 'html' | 'object', includeEmpty?: boolean } = { format: 'text', includeEmpty: false }
) {
    const { format, includeEmpty } = opts;

    const rows = [];
    for (const [, field] of formOutput) {
        const label = field?.attributes?.label ?? field?.type ?? 'Field';
        const val = field?.value;

        const isEmpty =
            val == null ||
            (typeof val === 'string' && val.trim() === '') ||
            (Array.isArray(val) && val.length === 0);

        if (!includeEmpty && isEmpty) continue;

        let display;
        switch (field?.type) {
            case 'checkboxesField':
            case 'tagsField':
                display = Array.isArray(val) ? val.join(', ') : String(val ?? '');
                break;
            case 'selectField':
            case 'radioField':
            case 'textField':
            case 'textareaField':
            case 'numberField':
            case 'dateField':
            case 'timeField':
            default:
                display = String(val ?? '');
                break;
        }

        rows.push({ label, value: display });
    }

    if (format === 'object') {
        return Object.fromEntries(rows.map(r => [r.label, r.value]));
    }

    if (format === 'html') {
        const escape = s =>
            String(s)
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#39;');

        return (
            '<ul>' +
            rows
                .map(r => `<li><strong>${escape(r.label)}:</strong> ${escape(r.value)}</li>`)
                .join('') +
            '</ul>'
        );
    }

    if (format === 'markdown') {
        return rows.map(r => `- **${r.label}:** ${r.value}`).join('\n');
    }

    // default 'text'
    return rows.map(r => `${r.label}: ${r.value}`).join('\n');
}