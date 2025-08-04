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
import axios from "axios";
import { usePage } from "@inertiajs/react";
import { Schema } from "@coltorapps/builder";
import z from "zod";
import { objectMap } from "@/components/helpers";


export default function FormBuilderPage() {
    const builderStore = useBuilderStore(formBuilder, {
        initialData: {
            schema: usePage().props.schema as any
        },
        events: {
            async onEntityAttributeUpdated(payload) {
                setSchemaValidation(await builderStore.validateSchema());
            },
            onEntityDeleted(payload) { },
        },
    });

    const [schemaValidation, setSchemaValidation] = useState({ success: true, data: builderStore.getSchema() } as { success: boolean, data?: any, reason?: any });
    const errors = schemaValidation.success ?
        [] :
        objectMap(schemaValidation.reason.payload.entitiesAttributesErrors,
            ([id, data]) => [id, objectMap(data, (
                [attribute_name, err]) => [attribute_name, z.treeifyError(err as any).errors]
            )]
        )

    // console.log(errors);

    async function submitFormSchema() {
        const validationResult = await builderStore.validateSchema();

        if (validationResult.success === true) {
            saveSchema(validationResult.data);
        } else {
            alert("Error: " + validationResult.reason.code)
        }
    }

    return (
        <div className="grid gap-2">
            <AddEntityButtons />
            <DndWrapper builderStore={builderStore}>
                <BuilderEntities
                    builderStore={builderStore}
                    components={entity_components}
                    children={getFormBuilderItem}
                />
            </DndWrapper>

            <div className="flex flex-row justify-end gap-2">
                <Button type="button" onClick={() => {
                    submitFormSchema();
                }}
                    disabled={!schemaValidation.success}
                >
                    Save Form
                </Button>
            </div>
        </div>
    );

    function AddEntityButtons() {
        return (
            <div className="flex gap-2">
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
                <Button
                    type="button"
                    onClick={() =>
                        builderStore.addEntity({
                            type: "selectField",
                            attributes: {
                                label: "Select Field",
                                options: ["option"],
                            },
                        })
                    }
                >
                    Add Select Field
                </Button>
                <Button
                    type="button"
                    onClick={() =>
                        builderStore.addEntity({
                            type: "checkboxesField",
                            attributes: {
                                label: "Checkboxes Field",
                                options: ["option"],
                            },
                        })
                    }
                >
                    Add Checkboxes Field
                </Button>
                <Button
                    type="button"
                    onClick={() =>
                        builderStore.addEntity({
                            type: "radioField",
                            attributes: {
                                label: "Radio Field",
                                options: ["option"],
                            },
                        })
                    }
                >
                    Add Radio Field
                </Button>
            </div>
        )
    }

    function getFormBuilderItem({ children, entity }) {
        const item_errors = Object.entries(errors[entity.id] ?? {}) as [[string, []]];
        return (
            <DndItem id={entity.id} key={entity.id}>
                <div className={"grid gap-2 mb-2"}>
                    {children}
                    <div className="grid grid-flow-col gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Edit</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Entity</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your fields here.
                                    </DialogDescription>
                                </DialogHeader>

                                <BuilderEntityAttributes
                                    builderStore={builderStore}
                                    components={entity_attribute_components}
                                    entityId={entity.id}
                                />

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button disabled={item_errors.length > 0}>Close</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                builderStore.deleteEntity(entity.id);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                    {item_errors.length === 1 ?
                        item_errors.map(([attribute, errors]) =>
                            errors.map((err, key) =>
                                <p key={key} className="text-destructive text-sm">{err}</p>
                            )
                        )
                        : item_errors.map(([attribute, errors]) =>
                            errors.map((err, key) =>
                                <p key={key} className="text-destructive text-sm">{attribute}: {err}</p>
                            )
                        )
                    }
                </div>
            </DndItem>
        )
    }
}


function saveSchema(schema: Schema) {
    axios.post('/api/form-schema', { schema });
}