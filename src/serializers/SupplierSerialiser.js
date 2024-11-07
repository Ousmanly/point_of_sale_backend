import { status } from 'init';

export const SupplierSerializer = {
  serializerForTable(entities) {
    return entities.map((entity) => {
      return {
        id: entity.id,
        name: entity.name,
        phone: entity.phone,
        status: entity.status,
        user_id: entity.user.id,
        user_name: entity.user.name,
      };
    });
  },
};
