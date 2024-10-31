export const ProductSerializer = {
    serializerForTable(entities) {
        return entities.map(entity => {
            return {
                id: entity.id,
                name: entity.name,
                stock: entity.stock,
                sale_price: entity.sale_price,
                purchase_price: entity.purchase_price,
                seuil: entity.seuil,
                created_at: entity.created_at,
                updated_at: entity.updated_at,
                code_bare: entity.code_bare,
                user_id: entity.user.id,
                user_name: entity.user.name,
            }
        });
    }
}