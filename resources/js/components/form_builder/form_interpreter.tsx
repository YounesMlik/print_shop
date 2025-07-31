import { type Schema } from "@coltorapps/builder";
import {
    InterpreterEntities,
    useInterpreterStore,
} from "@coltorapps/builder-react";

import { TextFieldEntity } from "./entity_componenets";
import { formBuilder } from "./builder";
import { Button } from "@/components/ui/button";

type FormBuilderSchema = Schema<typeof formBuilder>;

export function FormInterpreter({ schema }: { schema: FormBuilderSchema }) {
    /*
    | We utilize the `useInterpreterStore` hook, which creates
    | an interpreter store for us. This store is used for filling
    | entities values based on a schema and builder definition.
    */
    const interpreterStore = useInterpreterStore(formBuilder, schema, {
        events: {
            /*
            | We use the `onEntityValueUpdated` event callback
            | to trigger an arbitrary entity validation every time
            | its value is updated.
            */
            onEntityValueUpdated(payload) {
                void interpreterStore.validateEntityValue(payload.entityId);
            },
        },
    });

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        // We will cover server integration in the next section.
        const schema_entries = Object.entries(schema.entities);
        const form = e.currentTarget;
        const submit_button = form.querySelector('button[type="submit"]') as HTMLElement;
        const form_data = Object.fromEntries(new FormData(form, submit_button))
        const data = schema_entries
            .map(([id, value]) => [id, { ...value, value: form_data[id] }]);
        console.log(data);
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                void submitForm(e);
            }}
        >
            {/*
      | We use the `InterpreterEntities` component to render the entities tree
      | of the schema of our interpreter store. We pass the entity
      | components for each defined entity type in our form builder
      | (currently, it's only the text field).
      */}
            <InterpreterEntities
                interpreterStore={interpreterStore}
                components={{ textField: TextFieldEntity }}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}