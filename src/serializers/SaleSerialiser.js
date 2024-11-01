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

// "created_at": "2024-10-31T12:31:12.440Z",
//             "sale_at": "2024-10-30T22:47:11.534Z",
//             "name": "Assa",
//             "email": "assa@gmail.com",
//             "phone": "43 34 56 45",
//             "id_user": 2,
//             "SaleDetail": [
//                 {
//                     "id": 1,
//                     "amount": "0",
//                     "sale_quantity": 2,
//                     "price": "0",
//                     "product": {
//                         "name": "Prpduct2"
//                     }
//                 }
//             ]
export const SaleSerializer = {
    serializerForTable(entities) {
        return entities.map(entity => {
            return {
                id: entity.id,
                created_at: entity.created_at,
                sale_at: entity.sale_at,
                name: entity.name,
                email: entity.email,
                phone: entity.phone,
                user_name: entity.user?.name,
                // Traitez chaque détail de réception si plusieurs
                sale_details: entity.SaleDetail.map(detail => ({
                    amount: detail.amount,
                    sale_quantity: detail.sale_quantity,
                    price: detail.price,
                    product_name: detail.product?.name // Accède au nom du produit
                }))
            }
        });
    }
}