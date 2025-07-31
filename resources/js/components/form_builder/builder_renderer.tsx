import { BuilderEntities, BuilderEntityAttributes, useBuilderStore } from "@coltorapps/builder-react";
import { LabelAttribute } from "./attribute_componenets";
import { TextFieldEntity } from "./entity_componenets";
import { formBuilder } from "./builder";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DndItem } from "@/components/dnd/dnd_item";
import { DndWrapper } from "@/components/dnd/dnd_wrapper";

/*
| We define a `TextFieldAttributes` component, 
| which is responsible for rendering the attributes 
| of a text field (currently, it only includes the
| label attribute).
*/
function TextFieldAttributes() {
    return (
        <div className="grid gap-4">
            <LabelAttribute />
        </div>
    );
}

export default function FormBuilderPage() {
    /*
    | We declare an `activeEntityId` state variable, 
    | which holds an optional reference to the currently
    | active entity ID.
    */
    const [activeEntityId, setActiveEntityId] = useState<string>();

    /*
    | We utilize the `useBuilderStore` hook, which creates
    | a builder store for us. This store is responsible for 
    | building a schema based on a builder definition.
    */
    const builderStore = useBuilderStore(formBuilder, {
        events: {
            /*
            | We use the `onEntityAttributeUpdated` event callback
            | to trigger an arbitrary attribute validation every time
            | its value is updated.
            */
            onEntityAttributeUpdated(payload) {
                void builderStore.validateEntityAttribute(
                    payload.entity.id,
                    payload.attributeName,
                );
            },
            /*
            | We use the `onEntityDeleted` event callback to unset the
            | `activeEntityId` state variable when the currently active
            | entity is deleted.
            */
            onEntityDeleted(payload) {
                if (payload.entity.id === activeEntityId) {
                    setActiveEntityId(null);
                }
            },
        },
    });

    async function submitFormSchema() {
        // We will cover server integration in the next section.
        console.log(builderStore.getSchema());

    }

    return (
        <DndWrapper builderStore={builderStore}>
            {/*
      | We use the `BuilderEntities` component to render the entities
      | tree of the schema of our builder store.
      | We pass the entity components for each defined entity type
      | in our form builder (currently, it's only the text field).
      */}
            <BuilderEntities
                builderStore={builderStore}
                components={{ textField: TextFieldEntity }}
            >
                {/*
        | We leverage the render prop of the `BuilderEntities` component
        | to wrap each rendered arbitrary entity with additional
        | rendering.
        */}
                {(props) => (
                    <DndItem id={props.entity.id}>
                        {/* This represents each rendered arbitrary entity. */}
                        {props.children}
                        {/*
            | A button that marks the arbitrary entity as active,
            | allowing the user to edit its attributes.
            */}
                        <Button
                            type="button"
                            onClick={() => {
                                setActiveEntityId(props.entity.id);
                            }}
                        >
                            Select
                        </Button>
                        {/*
            | A delete button is rendered next to each entity,
            | that removes the entity from the store's schema.
            */}
                        <Button
                            type="button"
                            onClick={() => {
                                builderStore.deleteEntity(props.entity.id);
                            }}
                        >
                            Delete
                        </Button>
                    </DndItem>
                )}
            </BuilderEntities>
            {/*
      | A button that adds a new text field type entity
      | to the store's schema.
      */}
            <Button
                type="button"
                onClick={() =>
                    builderStore.addEntity({
                        type: "textField",
                        attributes: { label: "Text Field" },
                    })
                }
            >
                Add Text Field
            </Button>
            {/*
      | We render the `BuilderEntityAttributes` component only when
      | an entity is active. We also provide the components
      | that render attribute components for each defined
      | entity type in the builder (currently, it's only the
      | text field).
      */}
            {activeEntityId ? (
                <BuilderEntityAttributes
                    builderStore={builderStore}
                    components={{ textField: TextFieldAttributes }}
                    entityId={activeEntityId}
                />
            ) : null}
            {/* We will cover server integration in the next section. */}
            <Button type="button" onClick={() => {
                setActiveEntityId(null);
                submitFormSchema();
            }}>
                Save Form
            </Button>
        </DndWrapper>
    );
}