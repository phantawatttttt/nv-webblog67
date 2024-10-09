module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        treeName: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        pictures: DataTypes.TEXT,
        soilType: DataTypes.TEXT,
        category: DataTypes.TEXT,
        fertilizerType: DataTypes.TEXT,
        
      
    })
    return Blog
}