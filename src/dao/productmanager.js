import { modeloProducts } from "./models/products.models.js"


export class ProductManager {


    async getProducts(page, limit) {
        //return await modeloProducts.find().lean()

        const options = {
            page: page || 1,
            limit: limit || 2,
            lean: true
        };

        try {
            const result = await modeloProducts.paginate({}, options);
            return result;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    }

    async getProductsPaginados(page, limit) {

        const options = {
            page: page || 1,
            limit: limit || 2,
            lean: true
        };

        try {
            const result = await modeloProducts.paginate({}, options);
            return result;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    }

    async addProducts(product) {
        return await modeloProducts.create(product);
    }

    async getProductsById(id) {
        return await modeloProducts.findById(id).lean()
    }

    async getProductsBy(filtro) {
        return await modeloProducts.findOne(filtro).lean()
    }

    async updateProducts(id, modificacion = {}) {
        return await modeloProducts.findOneAndUpdate({ _id: id }, modificacion).lean()
    }

    async deleteProducts(id) {
        return await modeloProducts.deleteOne({ _id: id }).lean()
    }

}
