import {
    DndContext,
    MouseSensor,
    useSensor,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
    BuilderEntities,
    useBuilderStore,
    useBuilderStoreData,
} from "@coltorapps/builder-react";

export function DndWrapper({ children, builderStore }) {

    /*
    | We retrieve the `root` from the store's schema, which is
    | an array that holds the top-level entities IDs in the
    | hierarchy, determining their order.
    |
    | Note that we want for the output to refresh and
    | trigger a re-render only when the store emits the
    | `RootUpdated` event, signifying that the `root`
    | has been updated.
    */
    const {
        schema: { root },
    } = useBuilderStoreData(builderStore, (events) =>
        events.some((event) => event.name === "RootUpdated"),
    );

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    function handleDragEnd(e: DragEndEvent) {
        const overId = e.over?.id;

        if (!overId || typeof e.active.id !== "string") {
            return;
        }

        const index = root.findIndex((id) => id === overId);

        /*
        | When an entity is dropped, we can move it
        | to a new index on its hierarchical level.
        */
        builderStore.setEntityIndex(e.active.id, index);
    }

    return (
        <DndContext id="dnd" sensors={[mouseSensor]} onDragEnd={handleDragEnd}>
            <SortableContext
                id="sortable"
                items={Array.from(root)}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );
}