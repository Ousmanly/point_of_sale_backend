
import prisma from "../src/config/prisma.js";
import InventoryService from "../src/services/InventoryService.js";
import ProductService from "../src/services/ProductService.js";
import ReceptionService from "../src/services/ReceptionService.js";
import SaleService from "../src/services/SaleService.js";
import SupplierService from "../src/services/SupplierService.js";

// let token
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFtYWRvdSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyOTkxNTgwMSwiZXhwIjoxNzI5OTMzODAxfQ.KG_d4PsvOKg_UAMjwBepMT-ruzSb93G35HhAJaRH-CY";

describe('Supplier tests', () => {
  let supplierId = null;




  it('can create a supplier', async () => {
    const supplier = { name: 'Test Supplier' };
    const result = await SupplierService.createSupplier(token, supplier.name);
    supplierId = result.id;
    const supplierCreated = await SupplierService.checkSupplierById(supplierId);
    expect(supplierId).not.toBeNull();
    expect(supplierCreated).not.toBeNull();
    await SupplierService.deleteSupplier(supplierId)
  });

  it('fails to create supplier', async () => {
    try {
      const supplier = { name: null };
      await SupplierService.createSupplier(token, supplier.name);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('can update a supplier', async () => {
    const supplier = { name: 'Initial Supplier' };
    const createResult = await SupplierService.createSupplier(token, supplier.name);
    supplierId = createResult.id; 
    
    const updatedName = 'Updated Supplier';
    const updatedSupplier = await SupplierService.updateSupplier(token, supplierId, updatedName);

    expect(updatedSupplier.name).toBe(updatedName); 
    await SupplierService.deleteSupplier(supplierId)
  });

  it('fails to update a supplier', async () => {
    try {
        await SupplierService.updateSupplier(token, 9999, 'Supplier');
        fail('Expected error was not thrown');
    } catch (error) {
        expect(error.code).toBe('P2025'); 
    }
  });

  it('can delete a supplier', async () => {
    const supplier = { name: 'Test Supplier' };
    const result = await SupplierService.createSupplier(token, supplier.name);
    supplierId = result.id; 
    
    await SupplierService.deleteSupplier(supplierId);
    const deletedSupplier = await SupplierService.getSupplierById(supplierId);
    
    expect(deletedSupplier).toBeNull(); 
  });
});

describe('Product tests', () => {
    let productId = null;

    it('can create a product', async () => {
        const product = { name: 'Test Product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16676797MM" };
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;
        
        const productCreated = await ProductService.checkProductById(productId);
        expect(productCreated).toBe(true);

        await ProductService.deleteProduct(productId);
        productId = null;
    });

    it('fails to create a product', async () => {
        try {
            const product = { name: null, stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16676797TM" };
            await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('can update a product', async () => {
        const product = { name: 'Test Product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16676797MMML" };
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;
        
        const updateProduct = { name: 'Updated product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16676797MM0I" };
        const updatedProduct = await ProductService.updateProduct(token, productId, updateProduct.name, updateProduct.price, updateProduct.seuil, updateProduct.category, updateProduct.code_bare);

        expect(updatedProduct.name).toBe(updateProduct.name); 
        
        await ProductService.deleteProduct(productId);
        productId = null; 
    });

    it('fails to update a product', async () => {
        const nonExistentProductId = 9999; 
        const updateProduct = { name: 'Updated product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16676797MM0I" };
    
        try {
            await ProductService.updateProduct(token, nonExistentProductId, updateProduct.name, updateProduct.price, updateProduct.seuil, updateProduct.category, updateProduct.code_bare);
            fail('Expected error was not thrown');
        } catch (error) {
            expect(error.code).toBe('P2025'); 
        }
    });
    
    it('can delete a product', async () => {
        const product = { name: 'Test Product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16676797MMML" };
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;
    
        const productCreated = await ProductService.checkProductById(productId);
        expect(productCreated).toBe(true);
    
        await ProductService.deleteProduct(productId);
          
    });

    it('cannot delete a product', async () => {
        const invalidProductId = 9999; 

        try {
            await ProductService.deleteProduct(invalidProductId);
            fail('Expected error was not thrown');
        } catch (error) {
            expect(error.code).toBe('P2025');
        }
    });
    
});


describe('Reception tests', () => {
    let receptionId = null;
    let supplierId = null;
    let productId = null;
    it('can add a reception', async () => {

        const supplier = { name: 'Test Supplier' };
        const resultS = await SupplierService.createSupplier(token, supplier.name);
        supplierId = resultS.id;

        const product = { name: 'Test Product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "1667679PA" };
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;

        const receptionDetails = [{ quantity: 5, id_product: productId }];
        const reception = await ReceptionService.addReception(token, supplierId, new Date(), receptionDetails);
        receptionId = reception.id;

        expect(reception).toBeDefined();
        expect(reception.ReceptionDetail.length).toBe(receptionDetails.length);
        await ReceptionService.deleteReception(receptionId);
        receptionId = null;
        await SupplierService.deleteSupplier(supplierId);
        supplierId = null;
        await ProductService.deleteProduct(productId);
        productId = null;

    });

    it('cannot add a reception', async () => {
        supplierId = 9090;
    
        const invalidProductId = 9999;
        const receptionDetails = [{ quantity: 5, id_product: invalidProductId }];
    
        try {
            await ReceptionService.addReception(token, supplierId, new Date(), receptionDetails);
            fail('Expected error was not thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });


    it('can delete a reception', async () => {
        const supplier = { name: 'Test Supplier' };
        const resultS = await SupplierService.createSupplier(token, supplier.name);
        supplierId = resultS.id;

        const product = { name: 'Test Product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16b676794GM" };
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;

        const receptionDetails = [{ quantity: 5, id_product: productId }];
        const reception = await ReceptionService.addReception(token, supplierId, new Date(), receptionDetails);
        receptionId = reception.id;

        const deletedReception = await ReceptionService.deleteReception(receptionId);
        expect(deletedReception.id).toBe(receptionId); 
        await ProductService.deleteProduct(productId);
        productId = null;
        await SupplierService.deleteSupplier(supplierId);
        supplierId = null;
    });

    it('cannot delete a reception', async () => {
        const invalidReceptionId = 9999;

        try {
            await ReceptionService.deleteReception(invalidReceptionId);
            fail('Expected error was not thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});


describe('Inventaire tests', () => {
    let inventoryId = null;
    let productId = null;

    it('can retrieve the inventory', async () => {
        const product = { name: 'Test Product', stock: 4, price: 100, seuil: 10, category: "category A", code_bare: "16b6609M" };
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;
        const inventories = await InventoryService.addInventory(token, productId, 5, "Test");
        inventoryId = inventories.id
        expect(inventories).toBeDefined();
        expect(inventories).not.toBeNull();
        await prisma.inventory.delete({
            where: {
                id: inventoryId
            }
        });
        await ProductService.deleteProduct(productId);
        productId = null;
    });

    it('cannot retrieve the inventory', async () => {
        productId = 9999999;

        try {
            await InventoryService.addInventory(token, productId, 5, "Test");
            fail('Expected error was not thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
    
});


describe('Sale tests', () => {
    let saleId = null;
    let productId = null;


    it('can get all sales', async () => {
        const sales = await SaleService.getSales();
        expect(Array.isArray(sales)).toBe(true);
    });

    it('can add a sale', async () => {

        const product = { 
            name: 'Test Product', 
            stock: 400, 
            price: 100, 
            seuil: 10, 
            category: "category A", 
            code_bare: "16n52nM3kk32Z" 
        };
    
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;

        const saleDetails = [{ id_product: productId, sale_quantity: 5, price: 100 }];
        const sale = await SaleService.createSale(token, saleDetails, new Date());
        saleId = sale.id;
        
        const saleCreated = await SaleService.getSaleById(saleId)
        expect(sale).toBeDefined();
        expect(saleCreated).not.toBeNull();
        await SaleService.deleteSale(saleId);
        saleId = null;
        await ProductService.deleteProduct(productId);
        productId = null;
    
    });
    
    it('cannot add a sale', async () => {
        productId = 99999;

        const saleDetails = [{ id_product: productId, sale_quantity: 5, price: 100 }];
        try {
            await SaleService.createSale(token, saleDetails, new Date());
            fail('Expected error was not thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });


    it('can delete a sale', async () => {
        const product = { 
            name: 'Test Product', 
            stock: 400, 
            price: 100, 
            seuil: 10, 
            category: "category A", 
            code_bare: "16n52nM3kk32Z" 
        };
    
        const result = await ProductService.createProduct(token, product.name, product.stock, product.price, product.seuil, product.category, product.code_bare);
        productId = result.id;

        const saleDetails = [{ id_product: productId, sale_quantity: 5, price: 100 }];
        const sale = await SaleService.createSale(token, saleDetails, new Date());
        saleId = sale.id;
        const deletedSale= await SaleService.deleteSale(saleId);
        expect(deletedSale.id).toBe(saleId); 
        await ProductService.deleteProduct(productId);
        productId = null;
    });

    it('cannot delete a sale', async () => {
        const invalidProductId = 9999;

        try {
            await SaleService.deleteSale(invalidProductId);
            fail('Expected error was not thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
