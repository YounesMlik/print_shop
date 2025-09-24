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
import { omitBy } from "lodash-es";


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
            saveSchema(validationResult.data).then((v) => {
                if (v.success) {
                    alert("Form schema saved successfully")
                } else {
                    alert("Error: request denied by the server")
                }
            });
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
        const supported_languages = usePage().props.i18n.available;
        const entities = [
            { type: "textField", label: "Text Field", options: false },
            { type: "textAreaField", label: "Text Area Field", options: false },
            { type: "selectField", label: "Select Field", options: true },
            { type: "checkboxesField", label: "Checkboxes Field", options: true },
            { type: "radioField", label: "Radio Field", options: true },
        ] as { type: any, label: string, options: boolean }[]

        return (
            <div className="flex gap-2">
                {entities.map(({ type, label, options }, i) => (
                    <Button
                        key={i}
                        type="button"
                        onClick={() =>
                            builderStore.addEntity({
                                type: type,
                                attributes: omitBy({
                                    label: Object.fromEntries(supported_languages.map(lang => [lang, label])),
                                    options: options ? ["option"] : undefined,
                                }, v => v === undefined) as any,

                            })
                        }
                    >
                        Add {label}
                    </Button>
                ))}
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


async function saveSchema(schema: Schema) {
    return (await axios.post('/api/form-schema', { schema })).data;
}