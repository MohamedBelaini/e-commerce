// ProductModel.js
class ProductModel {
    constructor({
      id,
      colors,
      sizes,
      title,
      image,
      price,
      description,
      category,
      stock,
      isFavorite
    }) {
      this.id = id;
      this.colors = colors;
      this.sizes = sizes;
      this.title = title;
      this.image = image;
      this.price = price;
      this.description = description;
      this.category = category;
      this.stock = stock;
      this.isFavorite = isFavorite;
    }
  
    static fromJson(json) {
      return new ProductModel({
        id: json.id,
        colors: json.colors,
        sizes: json.sizes,
        title: json.title,
        image: json.image,
        price: json.price,
        description: json.description,
        category: json.category,
        stock: json.stock,
        isFavorite: json.isFavorite
      });
    }
  
    toJson() {
      return {
        id: this.id,
        colors: this.colors,
        sizes: this.sizes,
        title: this.title,
        image: this.image,
        price: this.price,
        description: this.description,
        category: this.category,
        stock: this.stock,
        isFavorite: this.isFavorite
      };
    }
  }
  
  export default ProductModel;
  