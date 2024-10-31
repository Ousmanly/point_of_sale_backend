// export const ReceptionSerializer = {
//     serializerForTable(entities) {
//         return entities.map(entity => {
//             return {
//                 id: entity.id,
//                 created_at: entity.created_at,
//                 recepted_at: entity.recepted_at,
//                 id_supplier: entity.supplier.id,
//                 supplier_name: entity.supplier.name,
//                 id_user: entity.user.id,
//                 user_name: entity.user.name,
//                 quantity: entity.ReceptionDetail.quantity,
//                 product_name: entity.ReceptionDetail.id_product
//             }
//         });
//     }
// }

export const ReceptionSerializer = {
    serializerForTable(entities) {
        return entities.map(entity => {
            return {
                id: entity.id,
                created_at: entity.created_at,
                recepted_at: entity.recepted_at,
                id_supplier: entity.supplier?.id,
                id_user: entity.user?.id,
                supplier_name: entity.supplier?.name,
                supplier_phone: entity.supplier?.phone,
                user_name: entity.user?.name,
                // Traitez chaque détail de réception si plusieurs
                reception_details: entity.ReceptionDetail.map(detail => ({
                    quantity: detail.quantity,
                    price: detail.price,
                    product_name: detail.product?.name // Accède au nom du produit
                }))
            }
        });
    }
}