import {renderWithTemplateIvan} from "utils.mjs";
export default class ProductListIvan {
    constructor(category, dataSource, listElement){
        this.category =category;
        this.dataSource=dataSource;
        this.listElement=listElement;
    }


    async init(){
        const itemList = await this.dataSource.getData();
    }

    renderList(itemList){
        renderWithTemplateIvan(productCardTemplate, this.listElement, itemList);

    }
}

productCardTemplate(product)
{
        return `
        <li class="product-card">
        <a href="product_pages/?product=${product.Id}">
        <img src="" alt="Image of ${product.Name}">
        <h2 class="card__brand">${product.Brand}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.Price.toFixed(2)}</p>
        </a>
        </li>`;  
}