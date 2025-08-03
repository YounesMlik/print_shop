import { type Schema } from "@coltorapps/builder";
import {
    InterpreterEntities,
    useInterpreterStore,
} from "@coltorapps/builder-react";

import entity_components from "./entity_componenets";
import { formBuilder } from "./builder";
import { Button } from "@/components/ui/button";

type FormBuilderSchema = Schema<typeof formBuilder>;

export function FormInterpreter({ schema }: { schema: FormBuilderSchema }) {
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
        console.log(data);
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
            <Button type="submit">Submit</Button>
        </form>
    );
}