export const MouvementSerializer = {
    serializerForTable(entities) {
        return entities.map(entity => {
            return {
                id: entity.id,
                quantity: entity.quantity,
                user_id: entity.user.id,
                user_name: entity.user.name,
                product_id: entity.product.id,
                product_name: entity.product.name,
                mouvement_at: entity.movement_at,
            }
        });
    }
}