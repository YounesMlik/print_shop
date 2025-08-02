import { BuilderEntities, BuilderEntityAttributes, useBuilderStore } from "@coltorapps/builder-react";
import entity_components from "./entity_componenets";
import entity_attribute_components from "./entity_attribute_components";
import { formBuilder } from "./builder";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DndItem } from "@/components/dnd/dnd_item";
import { DndWrapper } from "@/components/dnd/dnd_wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { usePage } from "@inertiajs/react";


export default function FormBuilderPage() {
    /*
    | We declare an `activeEntityId` state variable, 
    | which holds an optional reference to the currently
    | active entity ID.
    */
    const [activeEntityId, setActiveEntityId] = useState<string>();

    function saveSchema(schema) {
        axios.post('/api/form-schema', { schema });
    }
    /*
    | We utilize the `useBuilderStore` hook, which creates
    | a builder store for us. This store is responsible for 
    | building a schema based on a builder definition.
    */
    const builderStore = useBuilderStore(formBuilder, {
        initialData: {
            schema: usePage().props.schema as any
        },
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
        saveSchema(builderStore.getSchema());

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
                components={entity_components}
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Edit</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Entity</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you&apos;re
                                        done.
                                    </DialogDescription>
                                </DialogHeader>

                                <BuilderEntityAttributes
                                    builderStore={builderStore}
                                    components={entity_attribute_components}
                                    entityId={props.entity.id}
                                />

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button>Close</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {/*
            | A delete button is rendered next to each entity,
            | that removes the entity from the store's schema.
            */}
                        <Button
                            variant="outline"
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