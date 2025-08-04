import {
    LabelAttribute,
    OptionsAttribute,
} from "@/components/form_builder/attribute_componenets";


export function TextFieldAttributes() {
    return (
        <div className="grid gap-4">
            <LabelAttribute />
        </div>
    );
}

export function SelectFieldAttributes() {
    return (
        <div className="grid gap-4">
            <LabelAttribute />
            <OptionsAttribute />
        </div>
    );
}

export function CheckboxesFieldAttributes() {
    return (
        <div className="grid gap-4">
            <LabelAttribute />
            <OptionsAttribute />
        </div>
    );
}

export function RadioFieldAttributes() {
    return (
        <div className="grid gap-4">
            <LabelAttribute />
            <OptionsAttribute />
        </div>
    );
}

const entity_attribute_components = {
    textField: TextFieldAttributes,
    selectField: SelectFieldAttributes,
    checkboxesField: CheckboxesFieldAttributes,
    radioField: RadioFieldAttributes,
};
export default entity_attribute_components;