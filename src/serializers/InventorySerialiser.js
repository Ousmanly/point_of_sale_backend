export const InventorySerializer = {
  serializerForTable(entities) {
    return entities.map((entity) => {
      return {
        id: entity.id,
        remarque: entity.remarque,
        quantity: entity.quantity,
        user_id: entity.user.id,
        user_name: entity.user.name,
        product_id: entity.product.id,
        product_name: entity.product.name,
        created_at: entity.created_at,
      };
    });
  },
};
