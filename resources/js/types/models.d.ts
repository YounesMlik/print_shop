declare global {
    type Category = {
        id: number,
        name: string,
        description: string | null,
        super_category?: SuperCategory,
        products?: Product[],
        created_at: string,
        updated_at: string,
    }

    type OptionAttribute = {
        id: number,
        name: string,
        description: string | null,
        effective_description: string | null,
        value: string,
        // pivot?: OptionOptionAttribute,
    }

    type OptionOptionAttribute = {
        id: number,
        description: string | null,
        value: string,
    }

    type Option = {
        id: number,
        name: string,
        description: string | null,
        price: string | number,
        product?: Product,
        option_attributes?: OptionAttribute[],
        created_at: string,
        updated_at: string,
    }

    type Product = {
        id: number,
        name: string,
        description: string | null,
        category?: Category,
        options?: Option[],
        tags?: Tag[],
        Images?: ProductImage[],
        created_at: string,
        updated_at: string,
    }

    type SuperCategory = {
        id: number,
        name: string,
        description: string | null,
        categories?: Category[],
        created_at: string,
        updated_at: string,
    }

    type Tag = {
        id: number,
        name: string,
        description: string | null,
        products?: Product[],
        created_at: string,
        updated_at: string,
    }

    type ProductImage = {
        id: number,
        url: string,
        thumb: string,
    }
}

export { };