import { LabelAttribute } from "@/components/form_builder/attribute_componenets";

export function TextFieldAttributes() {
    return (
        <div className="grid gap-4">
            <LabelAttribute />
        </div>
    );
}

const entity_attribute_components = { textField: TextFieldAttributes };
export default entity_attribute_components;